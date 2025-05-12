import { useTheme } from '@/components/theme-provider';
import { hexToRgba } from '@/utils/color';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const useThree = () => {
	const { theme } = useTheme();
	const [color, setColor] = useState<string>(theme === 'dark' ? '#ffffff' : '#000000');

	useEffect(() => {
		const newColor = theme === 'dark' ? '#ffffff' : '#000000';
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
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
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
				snowflake.position.x += snowflake.userData.offset * snowflake.userData.oscillationAmplitude * 0.04;

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
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
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

	const threeTest = (threeContainer: HTMLDivElement) => {
		const scene: THREE.Scene = new THREE.Scene();
		const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
			75,
			threeContainer.clientWidth / threeContainer.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 50, 50);
		camera.rotateX(Math.PI / 4);
		scene.add(camera);

		const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.shadowMap.enabled = true;
		renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
		renderer.setClearColor(0x000000, 0);
		threeContainer.appendChild(renderer.domElement);

		const orbit: OrbitControls = new OrbitControls(camera, renderer.domElement);
		orbit.update();

		// add plane
		const circleGeometry = new THREE.CircleGeometry(32, 32);
		const circleMaterial = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide,
		});
		const circle = new THREE.Mesh(circleGeometry, circleMaterial);
		circle.rotation.x = -Math.PI / 2;
		circle.receiveShadow = true;
		scene.add(circle);

		// CubeCamera for reflections
		const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256); // Resolution
		const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
		cubeCamera.position.set(0, 0, 0); // Center of the scene
		scene.add(cubeCamera);

		const centerSphereMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			metalness: 1.0,
			roughness: 0,
			reflectivity: 1,
			envMap: cubeRenderTarget.texture,
			envMapIntensity: 1,
		});
		const centerSphereGeometry = new THREE.SphereGeometry(5, 32, 32);
		const centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
		scene.add(centerSphere);

		// Orbiting sphere
		const orbitingSphereMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xff0000,
			metalness: 1,
			roughness: 0,
			reflectivity: 1,
			envMap: cubeRenderTarget.texture,
			envMapIntensity: 1,
		});
		const orbitingSphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
		const orbitingSphere = new THREE.Mesh(orbitingSphereGeometry, orbitingSphereMaterial);
		orbitingSphere.position.set(15, 0, 0);
		scene.add(orbitingSphere);

		// Tori around the orbit
		const torusMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xdddddd,
			metalness: 1.0,
			roughness: 0.1,
			reflectivity: 1,
			envMap: cubeRenderTarget.texture,
			envMapIntensity: 1,
		});
		const torusGeometry = new THREE.TorusGeometry(0.8, 0.05, 16, 100); // Small torus: radius 0.2, tube 0.05
		const torusOrbitRadius = 15;

		const numTorus = 256; // Number of tori to create
		for (let i = 0; i < numTorus; i++) {
			const angle = (2 * Math.PI * i) / numTorus; // Evenly spaced angles
			const torus = new THREE.Mesh(torusGeometry, torusMaterial);
			torus.position.set(torusOrbitRadius * Math.cos(angle), 0, torusOrbitRadius * Math.sin(angle));
			torus.receiveShadow = true;
			torus.castShadow = true;
			torus.rotateY(-angle);
			scene.add(torus);
		}

		// spot light at four corners
		const lightPositions = [
			new THREE.Vector3(25, 25, 25),
			new THREE.Vector3(-25, 25, 25),
			new THREE.Vector3(25, 25, -25),
			new THREE.Vector3(-25, 25, -25),
			new THREE.Vector3(25, -25, 25),
			new THREE.Vector3(-25, -25, 25),
			new THREE.Vector3(25, -25, -25),
			new THREE.Vector3(-25, -25, -25),
		];

		lightPositions.forEach((position) => {
			const light = new THREE.SpotLight(0xffffff, 1);
			light.position.copy(position);
			light.castShadow = true;
			light.angle = Math.PI / 4;
			light.penumbra = 0.1;
			light.decay = 0;
			light.distance = 50;
			light.intensity = 2;

			scene.add(light);
		});

		const light = new THREE.HemisphereLight(0xffffff, 0.5);
		scene.add(light);

		const orbitRadius = 15;
		const orbitSpeed = Math.PI / 100;

		function animate(time: number): void {
			requestAnimationFrame(animate);
			// Update orbiting sphere position
			const angle = orbitSpeed * time; // Convert time to seconds
			orbitingSphere.position.x = orbitRadius * Math.cos(angle);
			orbitingSphere.position.z = orbitRadius * Math.sin(angle);

			centerSphere.visible = false; // Hide central sphere to avoid self-reflection
			cubeCamera.update(renderer, scene);
			centerSphere.visible = true;

			renderer.render(scene, camera);
		}
		requestAnimationFrame(animate);

		// Handle resize
		const handleResize = () => {
			camera.aspect = threeContainer.clientWidth / threeContainer.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
		};
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
			if (threeContainer.contains(renderer.domElement)) {
				threeContainer.removeChild(renderer.domElement);
			}
		};
	};

	return { threeWave, threeCube, threeTest };
};

export default useThree;
