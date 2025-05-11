import { useTheme } from "@/components/theme-provider";
import { hexToRgba } from "@/utils/color";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const useThree = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState<string>(
    theme === "dark" ? "#ffffff" : "#000000"
  );

  useEffect(() => {
    const newColor = theme === "dark" ? "#ffffff" : "#000000";
    setColor(newColor);

    if (sceneRef.current && materialRef.current) {
      materialRef.current.uniforms.color.value = new THREE.Vector4(
        ...hexToRgba(newColor)
          .match(/[\d.]+/g)!
          .map(Number)
      );
    }
  }, [theme]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const threeWave = (threeContainer: HTMLDivElement | null) => {
    if (!threeContainer) return () => {};

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      threeContainer.clientWidth / threeContainer.clientHeight,
      0.1,
      1000
    );
    camera.lookAt(0, 0, 3);
    camera.position.set(0, 5.2, 2.7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
    renderer.setClearColor(0x000000, 0);
    threeContainer.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Wave plane
    const geometry = new THREE.PlaneGeometry(32, 32, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader: `
				varying vec2 vUv;
				uniform float time;
				
				void main() {
				vUv = uv;
				vec3 pos = position;
				pos.z += sin(pos.x * 1.2 + time) * cos(pos.y * 1.2 + time) * 0.5;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.5);
				}
			`,
      fragmentShader: `
				uniform vec4 color;
				void main() {
				gl_FragColor = color;
				}
			`,
      uniforms: {
        time: { value: 0 },
        color: {
          value: new THREE.Vector4(
            ...hexToRgba(color)
              .match(/[\d.]+/g)!
              .map(Number)
          ),
        },
      },
      side: THREE.DoubleSide,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Animation
    let time = 0;
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;
      material.uniforms.time.value = time;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = threeContainer.clientWidth / threeContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (threeContainer.contains(renderer.domElement)) {
        threeContainer.removeChild(renderer.domElement);
      }
    };
  };

  const threeCube = (threeContainer: HTMLDivElement | null) => {
    if (!threeContainer) return () => {};

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      threeContainer.clientWidth / threeContainer.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
    renderer.setClearColor(0x000000, 0);
    threeContainer.appendChild(renderer.domElement);
    sceneRef.current = scene;
    rendererRef.current = renderer;

    const snowflakes: THREE.Mesh[] = [];
    const geometry = new THREE.SphereGeometry(0.01);
    const material = new THREE.MeshStandardMaterial({
      color: color,
    });

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    for (let i = 0; i < 5000; i++) {
      const snowflake = new THREE.Mesh(geometry, material);

      snowflake.position.x = (Math.random() - 0.5) * 20;
      snowflake.position.y = (Math.random() - 0.5) * 50;
      snowflake.position.z = (Math.random() - 0.5) * 20;

      snowflake.userData = {
        speed: 0.005 + Math.random() * 0.005,
        oscillationAmplitude: 0.1 + Math.random() * 0.3,
        offset: Math.random(),
        rotationSpeed: Math.random() * 0.01,
      };

      scene.add(snowflake);
      snowflakes.push(snowflake);
    }

    function animate() {
      requestAnimationFrame(animate);

      // Animate each snowflake
      snowflakes.forEach((snowflake) => {
        snowflake.rotation.x += snowflake.userData.rotationSpeed;
        snowflake.rotation.y += snowflake.userData.rotationSpeed;

        // Fall downward
        snowflake.position.y -= snowflake.userData.speed;

        // Horizontal drift
        snowflake.position.x +=
          snowflake.userData.offset *
          snowflake.userData.oscillationAmplitude *
          0.04;

        // Reset position when below the scene
        if (snowflake.position.y < -25) {
          snowflake.position.y = 25;
        }

        if (snowflake.position.x < -10 || snowflake.position.x > 10) {
          snowflake.position.x = (Math.random() - 0.5) * 20;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = threeContainer.clientWidth / threeContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      snowflakes.forEach((snowflake) => {
        scene.remove(snowflake);
      });
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (threeContainer.contains(renderer.domElement)) {
        threeContainer.removeChild(renderer.domElement);
      }
    };
  };

  const threeTest = (container: HTMLDivElement): (() => void) => {
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Orbit controls
    const orbit: OrbitControls = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    // Helpers
    const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(25);
    scene.add(axesHelper);
    const gridHelper: THREE.GridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Plane
    const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial: THREE.MeshStandardMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
    const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI * 0.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Mesh
    let meshGeometry: THREE.BufferGeometry = new THREE.BoxGeometry(2, 2, 2);
    let meshMaterial:
      | THREE.MeshStandardMaterial
      | THREE.MeshPhysicalMaterial
      | THREE.MeshLambertMaterial
      | THREE.MeshBasicMaterial
      | THREE.MeshPhongMaterial
      | THREE.MeshToonMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
    });
    let mesh: THREE.Mesh = new THREE.Mesh(meshGeometry, meshMaterial);
    mesh.position.set(0, 1, 0);
    mesh.castShadow = true;
    scene.add(mesh);

    // Light
    let light: THREE.Light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    scene.add(light);

    // Light Helpers
    let lightHelper:
      | THREE.DirectionalLightHelper
      | THREE.PointLightHelper
      | THREE.SpotLightHelper
      | null = new THREE.DirectionalLightHelper(
      light as THREE.DirectionalLight,
      2
    );
    scene.add(lightHelper);
    let shadowHelper: THREE.CameraHelper | null = new THREE.CameraHelper(
      (light as THREE.DirectionalLight).shadow.camera
    );
    scene.add(shadowHelper);

    // GUI Setup
    const gui: dat.GUI = new dat.GUI({ autoPlace: false });
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "10px";
    gui.domElement.style.right = "10px";
    gui.domElement.style.zIndex = "100";
    document.styleSheets[2].insertRule(
      `option { color: black;}`,
      document.styleSheets[2].cssRules.length
    );

    container.appendChild(gui.domElement);
    const options = {
      meshGeometry: "Box",
      meshType: "Standard",
      meshColor: "#ff0000",
      meshOpacity: 1.0,
      meshMetalness: 0.5,
      meshRoughness: 0.5,
      meshEmissive: "#000000",
      meshEmissiveIntensity: 0,
      lightType: "Directional",
      lightColor: "#ffffff",
      lightIntensity: 0.8,
      lightDistance: 10,
      lightAngle: 0.5,
      lightPenumbra: 0,
      lightDecay: 1,
      wireframe: false,
    };

    // GUI Controllers
    let meshControllers: { [key: string]: dat.GUIController } = {};
    let lightControllers: { [key: string]: dat.GUIController } = {};

    // Mesh controls
    const meshFolder: dat.GUI = gui.addFolder("Mesh Controls");

    const updateMeshGUI = (meshType: string, _: string) => {
      // Remove existing controllers
      Object.values(meshControllers).forEach((controller) =>
        meshFolder.remove(controller)
      );
      meshControllers = {};

      // Geometry selection
      meshControllers["meshGeometry"] = meshFolder
        .add(options, "meshGeometry", [
          "Box",
          "Sphere",
          "Cylinder",
          "Cone",
          "Torus",
        ])
        .onChange((value: string) => {
          scene.remove(mesh);
          meshGeometry.dispose();

          switch (value) {
            case "Sphere":
              meshGeometry = new THREE.SphereGeometry(1, 32, 32);
              break;
            case "Cylinder":
              meshGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
              break;
            case "Cone":
              meshGeometry = new THREE.ConeGeometry(1, 2, 32);
              break;
            case "Torus":
              meshGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
              break;
            default:
              meshGeometry = new THREE.BoxGeometry(2, 2, 2);
          }

          mesh = new THREE.Mesh(meshGeometry, meshMaterial);
          mesh.position.set(0, 1, 0);
          mesh.castShadow = true;
          scene.add(mesh);
          updateMeshGUI(options.meshType, value);
        });

      // Material selection
      meshControllers["meshType"] = meshFolder
        .add(options, "meshType", [
          "Standard",
          "Basic",
          "Phong",
          "Lambert",
          "Toon",
          "Physical",
        ])
        .onChange((value: string) => {
          scene.remove(mesh);
          meshMaterial.dispose();

          switch (value) {
            case "Basic":
              meshMaterial = new THREE.MeshBasicMaterial({
                color: options.meshColor,
                opacity: options.meshOpacity,
                transparent: options.meshOpacity < 1,
              });
              break;
            case "Phong":
              meshMaterial = new THREE.MeshPhongMaterial({
                color: options.meshColor,
                opacity: options.meshOpacity,
                transparent: options.meshOpacity < 1,
              });
              break;
            case "Lambert":
              meshMaterial = new THREE.MeshLambertMaterial({
                color: options.meshColor,
                opacity: options.meshOpacity,
                transparent: options.meshOpacity < 1,
              });
              break;
            case "Toon":
              meshMaterial = new THREE.MeshToonMaterial({
                color: options.meshColor,
                opacity: options.meshOpacity,
                transparent: options.meshOpacity < 1,
              });
              break;
            case "Physical":
              meshMaterial = new THREE.MeshPhysicalMaterial({
                color: options.meshColor,
                opacity: options.meshOpacity,
                transparent: options.meshOpacity < 1,
                metalness: options.meshMetalness,
                roughness: options.meshRoughness,
                emissive: options.meshEmissive,
                emissiveIntensity: options.meshEmissiveIntensity,
              });
              break;
            default:
              meshMaterial = new THREE.MeshStandardMaterial({
                color: options.meshColor,
                opacity: options.meshOpacity,
                transparent: options.meshOpacity < 1,
                metalness: options.meshMetalness,
                roughness: options.meshRoughness,
                emissive: options.meshEmissive,
                emissiveIntensity: options.meshEmissiveIntensity,
              });
          }
          meshMaterial.wireframe = options.wireframe;
          mesh = new THREE.Mesh(meshGeometry, meshMaterial);
          mesh.position.set(0, 1, 0);
          mesh.castShadow = true;
          scene.add(mesh);
          updateMeshGUI(value, options.meshGeometry);
        });

      meshControllers["meshColor"] = meshFolder
        .addColor(options, "meshColor")
        .onChange((value: string) => {
          meshMaterial.color.set(value);
        });

      meshControllers["meshOpacity"] = meshFolder
        .add(options, "meshOpacity", 0, 1)
        .onChange((value: number) => {
          meshMaterial.opacity = value;
          meshMaterial.transparent = value < 1;
          meshMaterial.needsUpdate = true;
        });

      meshControllers["wireframe"] = meshFolder
        .add(options, "wireframe")
        .onChange((value: boolean) => {
          meshMaterial.wireframe = value;
          meshMaterial.needsUpdate = true;
        });

      // Material-specific controls
      if (meshType === "Standard" || meshType === "Physical") {
        meshControllers["meshMetalness"] = meshFolder
          .add(options, "meshMetalness", 0, 1)
          .onChange((value: number) => {
            if (
              meshMaterial instanceof THREE.MeshStandardMaterial ||
              meshMaterial instanceof THREE.MeshPhysicalMaterial
            ) {
              meshMaterial.metalness = value;
              meshMaterial.needsUpdate = true;
            }
          });

        meshControllers["meshRoughness"] = meshFolder
          .add(options, "meshRoughness", 0, 1)
          .onChange((value: number) => {
            if (
              meshMaterial instanceof THREE.MeshStandardMaterial ||
              meshMaterial instanceof THREE.MeshPhysicalMaterial
            ) {
              meshMaterial.roughness = value;
              meshMaterial.needsUpdate = true;
            }
          });
      }

      if (
        meshType === "Standard" ||
        meshType === "Phong" ||
        meshType === "Physical"
      ) {
        meshControllers["meshEmissive"] = meshFolder
          .addColor(options, "meshEmissive")
          .onChange((value: string) => {
            if (
              meshMaterial instanceof THREE.MeshStandardMaterial ||
              meshMaterial instanceof THREE.MeshPhongMaterial ||
              meshMaterial instanceof THREE.MeshPhysicalMaterial
            ) {
              meshMaterial.emissive.set(value);
              meshMaterial.needsUpdate = true;
            }
          });

        meshControllers["meshEmissiveIntensity"] = meshFolder
          .add(options, "meshEmissiveIntensity", 0, 1)
          .onChange((value: number) => {
            if (
              meshMaterial instanceof THREE.MeshStandardMaterial ||
              meshMaterial instanceof THREE.MeshPhongMaterial ||
              meshMaterial instanceof THREE.MeshPhysicalMaterial
            ) {
              meshMaterial.emissiveIntensity = value;
              meshMaterial.needsUpdate = true;
            }
          });
      }
    };

    // Light controls
    const lightFolder: dat.GUI = gui.addFolder("Light Controls");

    const updateLightGUI = (lightType: string) => {
      // Remove existing controllers
      Object.values(lightControllers).forEach((controller) =>
        lightFolder.remove(controller)
      );
      lightControllers = {};

      lightControllers["lightType"] = lightFolder
        .add(options, "lightType", [
          "Directional",
          "Ambient",
          "Point",
          "Spot",
          "Hemisphere",
        ])
        .onChange((value: string) => {
          scene.remove(light);
          if (lightHelper) scene.remove(lightHelper);
          if (shadowHelper) scene.remove(shadowHelper);
          light.dispose();

          switch (value) {
            case "Ambient":
              light = new THREE.AmbientLight(
                options.lightColor,
                options.lightIntensity
              );
              lightHelper = null;
              shadowHelper = null;
              break;
            case "Point":
              light = new THREE.PointLight(
                options.lightColor,
                options.lightIntensity,
                options.lightDistance,
                options.lightDecay
              );
              light.position.set(5, 10, 5);
              light.castShadow = true;
              lightHelper = new THREE.PointLightHelper(
                light as THREE.PointLight,
                2
              );
              shadowHelper = null;
              break;
            case "Spot":
              light = new THREE.SpotLight(
                options.lightColor,
                options.lightIntensity,
                options.lightDistance,
                options.lightAngle,
                options.lightPenumbra,
                options.lightDecay
              );
              light.position.set(5, 10, 5);
              light.castShadow = true;
              lightHelper = new THREE.SpotLightHelper(light as THREE.SpotLight);
              shadowHelper = new THREE.CameraHelper(
                (light as THREE.SpotLight).shadow.camera
              );
              break;
            case "Hemisphere":
              light = new THREE.HemisphereLight(
                options.lightColor,
                0x000000,
                options.lightIntensity
              );
              light.position.set(5, 10, 5);
              lightHelper = null;
              shadowHelper = null;
              break;
            default:
              light = new THREE.DirectionalLight(
                options.lightColor,
                options.lightIntensity
              );
              light.position.set(5, 10, 5);
              light.castShadow = true;
              lightHelper = new THREE.DirectionalLightHelper(
                light as THREE.DirectionalLight,
                2
              );
              shadowHelper = new THREE.CameraHelper(
                (light as THREE.DirectionalLight).shadow.camera
              );
          }
          scene.add(light);
          if (lightHelper) scene.add(lightHelper);
          if (shadowHelper) scene.add(shadowHelper);
          updateLightGUI(value);
        });

      lightControllers["lightColor"] = lightFolder
        .addColor(options, "lightColor")
        .onChange((value: string) => {
          light.color.set(value);
          if (lightHelper) lightHelper.update();
        });

      lightControllers["lightIntensity"] = lightFolder
        .add(options, "lightIntensity", 0, 2)
        .onChange((value: number) => {
          light.intensity = value;
          if (lightHelper) lightHelper.update();
        });

      if (lightType === "Point" || lightType === "Spot") {
        lightControllers["lightDistance"] = lightFolder
          .add(options, "lightDistance", 0, 50)
          .onChange((value: number) => {
            if (
              light instanceof THREE.PointLight ||
              light instanceof THREE.SpotLight
            ) {
              light.distance = value;
              if (lightHelper) lightHelper.update();
            }
          });

        lightControllers["lightDecay"] = lightFolder
          .add(options, "lightDecay", 0, 2)
          .onChange((value: number) => {
            if (
              light instanceof THREE.PointLight ||
              light instanceof THREE.SpotLight
            ) {
              light.decay = value;
              if (lightHelper) lightHelper.update();
            }
          });
      }

      if (lightType === "Spot") {
        lightControllers["lightAngle"] = lightFolder
          .add(options, "lightAngle", 0, Math.PI / 2)
          .onChange((value: number) => {
            if (light instanceof THREE.SpotLight) {
              light.angle = value;
              if (lightHelper) lightHelper.update();
            }
          });

        lightControllers["lightPenumbra"] = lightFolder
          .add(options, "lightPenumbra", 0, 1)
          .onChange((value: number) => {
            if (light instanceof THREE.SpotLight) {
              light.penumbra = value;
              if (lightHelper) lightHelper.update();
            }
          });
      }
    };

    // Initialize GUI
    updateMeshGUI("Standard", "Box");
    updateLightGUI("Directional");

    // Animation
    function animate(): void {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.01;
      if (lightHelper) lightHelper.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const handleResize = (): void => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return (): void => {
      window.removeEventListener("resize", handleResize);
      scene.remove(mesh, plane, light, axesHelper, gridHelper);
      if (lightHelper) scene.remove(lightHelper);
      if (shadowHelper) scene.remove(shadowHelper);
      meshGeometry.dispose();
      meshMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      light.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      gui.destroy();
    };
  };

  return { threeWave, threeCube, threeTest };
};

export default useThree;
