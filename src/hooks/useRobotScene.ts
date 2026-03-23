import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect } from 'react';

// Easing helpers
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOut   = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01   = (t: number) => Math.max(0, Math.min(1, t));

export function useRobotScene(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.0, 7.0);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI * 0.75;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.target.set(0, 0.8, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(2, 4, 3); scene.add(key);
    const fill = new THREE.DirectionalLight(0xcccccc, 1.0);
    fill.position.set(-3, 2, -2); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.5);
    rim.position.set(0, 0, -4); scene.add(rim);

    const clock = new THREE.Clock();
    let animationId: number;
    let mixer: THREE.AnimationMixer | null = null;
    let idleAction: THREE.AnimationAction | null = null;
    let waveAction: THREE.AnimationAction | null = null;
    let isWaving = false;
    let waveTimer = 0;

    // Bones for procedural wave
    type BoneMap = {
      rightShoulder: THREE.Bone | null;
      rightArm:      THREE.Bone | null;
      rightForeArm:  THREE.Bone | null;
      rightHand:     THREE.Bone | null;
      spine:         THREE.Bone | null;
    };
    const bones: BoneMap = { rightShoulder: null, rightArm: null, rightForeArm: null, rightHand: null, spine: null };
    const restRot: Record<keyof BoneMap, THREE.Euler> = {
      rightShoulder: new THREE.Euler(), rightArm: new THREE.Euler(),
      rightForeArm:  new THREE.Euler(), rightHand: new THREE.Euler(),
      spine:         new THREE.Euler(),
    };
    let useProceduralWave = false;

    // Wave phases: 0=raise, 1=wave, 2=lower
    const RAISE_DUR  = 0.4;
    const WAVE_DUR   = 2.2;
    const LOWER_DUR  = 0.45;
    const TOTAL_DUR  = RAISE_DUR + WAVE_DUR + LOWER_DUR;

    const onCanvasClick = () => {
      if (isWaving) return;
      isWaving = true;
      waveTimer = 0;
      if (waveAction) {
        waveAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.3).play();
        idleAction?.fadeOut(0.3);
      }
    };

    renderer.domElement.addEventListener('click', onCanvasClick);

    const shellMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.3, roughness: 0.25 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.5, roughness: 0.35 });

    const robotWrapper = new THREE.Group();
    scene.add(robotWrapper);

    const loader = new GLTFLoader();
    loader.load('/models/xbot.glb', (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const n = mesh.name.toLowerCase();
          mesh.material = (n.includes('joint') || n.includes('connector') || n.includes('bolt')) ? jointMat : shellMat;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
        if ((child as THREE.Bone).isBone) {
          const bone = child as THREE.Bone;
          const n = bone.name.toLowerCase();
          if (n.includes('rightshoulder'))                             bones.rightShoulder = bone;
          else if (n.includes('rightarm') && !n.includes('fore') && !n.includes('hand')) bones.rightArm = bone;
          else if (n.includes('rightforearm'))                         bones.rightForeArm  = bone;
          else if (n.includes('righthand') && !n.includes('finger') && !n.includes('thumb')) bones.rightHand = bone;
          else if ((n.includes('spine1') || n.includes('spine2')) && !bones.spine)           bones.spine = bone;
        }
      });

      model.scale.set(1.6, 1.6, 1.6);
      model.position.set(0, -0.8, 0);
      robotWrapper.add(model);


      mixer = new THREE.AnimationMixer(model);
      const idleClip = THREE.AnimationClip.findByName(gltf.animations, 'Idle') ?? gltf.animations[0];
      const waveClip = gltf.animations.find(a => /wave|greet|hello/i.test(a.name)) ?? null;

      if (idleClip) { idleAction = mixer.clipAction(idleClip); idleAction.play(); }
      if (waveClip) {
        waveAction = mixer.clipAction(waveClip);
        waveAction.setLoop(THREE.LoopOnce, 1);
        waveAction.clampWhenFinished = true;
      } else if (bones.rightArm) {
        useProceduralWave = true;
        // Save rest rotations after first frame settles
        setTimeout(() => {
          if (bones.rightShoulder) restRot.rightShoulder.copy(bones.rightShoulder.rotation);
          if (bones.rightArm)      restRot.rightArm.copy(bones.rightArm.rotation);
          if (bones.rightForeArm)  restRot.rightForeArm.copy(bones.rightForeArm.rotation);
          if (bones.rightHand)     restRot.rightHand.copy(bones.rightHand.rotation);
          if (bones.spine)         restRot.spine.copy(bones.spine.rotation);
        }, 200);
      }

      mixer.addEventListener('finished', (e) => {
        if (e.action === waveAction) {
          waveAction!.fadeOut(0.4);
          idleAction?.reset().fadeIn(0.4).play();
          isWaving = false;
        }
      });
    });

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      controls.update();

      // Procedural wave
      if (isWaving && useProceduralWave) {
        waveTimer += delta;
        const t = waveTimer;

        if (t < RAISE_DUR) {
          // Phase 1: raise arm up above shoulder (wave position)
          const p = easeOut(clamp01(t / RAISE_DUR));
          if (bones.rightShoulder) {
            bones.rightShoulder.rotation.z = restRot.rightShoulder.z + p * (-0.2);
          }
          if (bones.rightArm) {
            // Raise arm to about 60° above horizontal
            bones.rightArm.rotation.z = restRot.rightArm.z + p * (-1.2);
            bones.rightArm.rotation.x = restRot.rightArm.x + p * 0.3; // slight forward tilt
          }
          if (bones.rightForeArm) {
            // Bend elbow so forearm points upward (away from body)
            bones.rightForeArm.rotation.z = restRot.rightForeArm.z + p * (-1.3);
          }
          if (bones.spine) {
            bones.spine.rotation.z = restRot.spine.z + p * (-0.05);
          }
        } else if (t < RAISE_DUR + WAVE_DUR) {
          // Phase 2: wave hand back and forth at raised position
          const wt = t - RAISE_DUR;
          const amp = 0.5 * (1 - 0.12 * clamp01(wt / WAVE_DUR));
          const freq = 5.0;
          const waveVal = Math.sin(wt * freq) * amp;
          const elbowBob = Math.cos(wt * freq * 0.5) * 0.12;

          if (bones.rightShoulder) bones.rightShoulder.rotation.z = restRot.rightShoulder.z + (-0.2);
          if (bones.rightArm) {
            bones.rightArm.rotation.z = restRot.rightArm.z + (-1.2);
            bones.rightArm.rotation.x = restRot.rightArm.x + 0.3;
          }
          if (bones.rightForeArm) {
            bones.rightForeArm.rotation.z = restRot.rightForeArm.z + (-1.3) + elbowBob;
          }
          if (bones.rightHand) {
            // Hand rotates on Z for side-to-side wave
            bones.rightHand.rotation.z = restRot.rightHand.z + waveVal;
            bones.rightHand.rotation.x = restRot.rightHand.x + Math.sin(wt * freq * 0.7) * 0.15;
          }
          if (bones.spine) bones.spine.rotation.z = restRot.spine.z + (-0.05);
        } else {
          // Phase 3: lower arm back to rest
          const p = easeInOut(clamp01((t - RAISE_DUR - WAVE_DUR) / LOWER_DUR));
          if (bones.rightShoulder) bones.rightShoulder.rotation.z = THREE.MathUtils.lerp(restRot.rightShoulder.z + (-0.2), restRot.rightShoulder.z, p);
          if (bones.rightArm) {
            bones.rightArm.rotation.z = THREE.MathUtils.lerp(restRot.rightArm.z + (-1.2), restRot.rightArm.z, p);
            bones.rightArm.rotation.x = THREE.MathUtils.lerp(restRot.rightArm.x + 0.3, restRot.rightArm.x, p);
          }
          if (bones.rightForeArm) bones.rightForeArm.rotation.z = THREE.MathUtils.lerp(restRot.rightForeArm.z + (-1.3), restRot.rightForeArm.z, p);
          if (bones.rightHand) {
            bones.rightHand.rotation.z = THREE.MathUtils.lerp(bones.rightHand.rotation.z, restRot.rightHand.z, p);
            bones.rightHand.rotation.x = THREE.MathUtils.lerp(bones.rightHand.rotation.x, restRot.rightHand.x, p);
          }
          if (bones.spine) bones.spine.rotation.z = THREE.MathUtils.lerp(restRot.spine.z + (-0.05), restRot.spine.z, p);

          if (t >= TOTAL_DUR) {
            isWaving = false;
            // Snap to rest
            if (bones.rightShoulder) bones.rightShoulder.rotation.copy(restRot.rightShoulder);
            if (bones.rightArm)      bones.rightArm.rotation.copy(restRot.rightArm);
            if (bones.rightForeArm)  bones.rightForeArm.rotation.copy(restRot.rightForeArm);
            if (bones.rightHand)     bones.rightHand.rotation.copy(restRot.rightHand);
            if (bones.spine)         bones.spine.rotation.copy(restRot.spine);
          }
        }
      }


      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);
}
