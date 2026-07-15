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
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
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
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI * 0.75;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.target.set(0, 0.8, 0);
    camera.updateProjectionMatrix();

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(2, 4, 3); scene.add(key);
    const fill = new THREE.DirectionalLight(0xcccccc, 1.0);
    fill.position.set(-3, 2, -2); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.5);
    rim.position.set(0, 0, -4); scene.add(rim);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clock = new THREE.Clock();
    let animationId: number;
    let autoWaveTimer: ReturnType<typeof setTimeout> | undefined;
    let scrollRaf = 0;
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
      if (isWaving || prefersReducedMotion) return;
      isWaving = true;
      waveTimer = 0;
      if (waveAction) {
        waveAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.3).play();
        idleAction?.fadeOut(0.3);
      } else if (useProceduralWave) {
        // Snapshot the arm's current (idle) pose so the raise and the return are
        // coherent with wherever the idle sway happens to be at this instant.
        if (bones.rightShoulder) restRot.rightShoulder.copy(bones.rightShoulder.rotation);
        if (bones.rightArm)      restRot.rightArm.copy(bones.rightArm.rotation);
        if (bones.rightForeArm)  restRot.rightForeArm.copy(bones.rightForeArm.rotation);
        if (bones.rightHand)     restRot.rightHand.copy(bones.rightHand.rotation);
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

      // Greet once on arrival (after rest pose has settled), unless reduced motion.
      if (prefersReducedMotion) {
        // Settle a single neutral idle frame, then stay static (animate() skips updates).
        mixer.update(0);
      } else {
        autoWaveTimer = setTimeout(onCanvasClick, 900);
      }
    });

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      // Freeze skeletal animation under reduced motion (posed once at frame 0 on load).
      if (mixer && !prefersReducedMotion) mixer.update(delta);
      controls.update();

      // Procedural greeting wave (the model ships no wave clip). We drive the
      // right arm chain directly while the idle animation keeps moving the rest
      // of the body underneath. Every frame we write ALL of x/y/z for each arm
      // bone so the idle track can't leak into the arm and fight the pose.
      if (isWaving && useProceduralWave) {
        waveTimer += delta;
        const t = waveTimer;
        const R = restRot;

        // Raised target pose, as offsets from the snapshotted rest pose.
        const SH_Z  = -0.18;  // shoulder lifts a touch
        const ARM_X =  0.12;  // small forward tilt so the elbow doesn't wing out
        const ARM_Z = -1.45;  // upper arm swings up to ~shoulder height
        const FA_X  = -0.15;  // forearm cants in toward the head
        const FA_Z  = -1.55;  // elbow bends so the forearm points up

        // raise: 0 at rest → 1 fully up → 0 again while lowering.
        let raise: number;
        if (t < RAISE_DUR) raise = easeOut(clamp01(t / RAISE_DUR));
        else if (t < RAISE_DUR + WAVE_DUR) raise = 1;
        else raise = 1 - easeInOut(clamp01((t - RAISE_DUR - WAVE_DUR) / LOWER_DUR));

        // Side-to-side hand swing — fades in once the arm is up, out as it drops.
        const env   = clamp01((t - RAISE_DUR * 0.5) / 0.3) * raise;
        const swing = Math.sin((t - RAISE_DUR) * 9.0) * 0.42 * env;

        if (bones.rightShoulder)
          bones.rightShoulder.rotation.set(R.rightShoulder.x, R.rightShoulder.y, R.rightShoulder.z + SH_Z * raise);
        if (bones.rightArm)
          bones.rightArm.rotation.set(R.rightArm.x + ARM_X * raise, R.rightArm.y, R.rightArm.z + ARM_Z * raise);
        if (bones.rightForeArm)
          bones.rightForeArm.rotation.set(R.rightForeArm.x + FA_X * raise + swing, R.rightForeArm.y, R.rightForeArm.z + FA_Z * raise);
        if (bones.rightHand)
          bones.rightHand.rotation.set(R.rightHand.x, R.rightHand.y, R.rightHand.z + swing * 0.5);

        if (t >= TOTAL_DUR) isWaving = false;   // idle takes the arm back next frame
      }


      renderer.render(scene, camera);
    };
    animate();

    // Gentle scroll parallax — the figure drifts as the hero scrolls away.
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const p = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
        robotWrapper.position.y = -p * 0.5;
      });
    };
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (autoWaveTimer) clearTimeout(autoWaveTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);
}
