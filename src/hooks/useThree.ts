import { useTheme } from '@/components/theme-provider';
import { hexToRgba } from '@/utils/color';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const useThree = () => {
	const { theme } = useTheme();
	const [bg, setBg] = useState<string>(theme === 'dark' ? '#000000' : '#ffffffff');
	const [color, setColor] = useState<string>(theme === 'dark' ? '#ffffff' : '#000000');

	useEffect(() => {
		const newBg = theme === 'dark' ? '#000000' : '#ffffff';
		const newColor = theme === 'dark' ? '#ffffff' : '#000000';
		setBg(newBg);
		setColor(newColor);

		if (sceneRef.current && materialRef.current) {
			sceneRef.current.background = new THREE.Color(newBg);
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

		// Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(bg);
		sceneRef.current = scene;

		// Camera
		const camera = new THREE.PerspectiveCamera(
			75,
			threeContainer.clientWidth / threeContainer.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 1, 10);
		camera.lookAt(0, 7, 0);

		// Renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
		renderer.domElement.style.background = `${bg}`;
		threeContainer.appendChild(renderer.domElement);
		rendererRef.current = renderer;

		// Wave plane
		const geometry = new THREE.PlaneGeometry(32, 32, 64, 64);
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
		scene.background = new THREE.Color(bg);
		const camera = new THREE.PerspectiveCamera(
			50,
			threeContainer.clientWidth / threeContainer.clientHeight,
			0.1,
			1000
		);

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
		renderer.domElement.style.background = `${bg}`;
		threeContainer.appendChild(renderer.domElement);
		sceneRef.current = scene;
		rendererRef.current = renderer;

		const snowflakes: THREE.Mesh[] = [];
		const geometry = new THREE.SphereGeometry(0.01, 8, 8);
		const material = new THREE.MeshBasicMaterial({ color: color });

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

	return { threeWave, threeCube };
};

export default useThree;
