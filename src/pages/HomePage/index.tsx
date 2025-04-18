import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';

const HomePage = () => {
	const [threeContainer, setThreeContainer] = useState<HTMLDivElement | null>(null);

	const mountRef = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			setThreeContainer(node);
		}
	}, []);

	useEffect(() => {
		if (!threeContainer) return;

		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);
		const camera = new THREE.PerspectiveCamera(
			75,
			threeContainer.clientWidth / threeContainer.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 2, 5);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
		threeContainer.appendChild(renderer.domElement);

		// Wave plane
		const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
		const material = new THREE.ShaderMaterial({
			vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 1.0 + time) * cos(pos.y * 1.0 + time) * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
			fragmentShader: `
        varying vec2 vUv;
        
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White waves
        }
      `,
			uniforms: {
				time: { value: 0 },
			},
			side: THREE.DoubleSide,
		});

		const plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = -Math.PI / 2;
		scene.add(plane);

		// Animation
		let time = 0;
		const animate = () => {
			requestAnimationFrame(animate);
			time += 0.02;
			material.uniforms.time.value = time;
			renderer.render(scene, camera);
		};
		animate();

		// Handle resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			threeContainer?.removeChild(renderer.domElement);
		};
	}, [threeContainer]);

	return (
		<div
			ref={mountRef}
			className='w-full h-full'
		/>
	);
};

export default HomePage;
