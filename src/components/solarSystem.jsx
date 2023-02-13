import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";

const SolarSystem = () => {
    const containerRef = useRef();

    useEffect(() => {
        let scene, camera, renderer, sun, mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune, pluto, sphere;

        const init = () => {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 5;

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            containerRef.current.appendChild(renderer.domElement);
        };

        const createSphere = () => {
            const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                wireframe: true
            });

            sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            scene.add(sphere);
        };

        const createSun = () => {
            const sunGeometry = new THREE.SphereGeometry(0.7, 32, 32);
            const sunMaterial = new THREE.MeshBasicMaterial({
                color: 0xffff00
            });

            sun = new THREE.Mesh(sunGeometry, sunMaterial);
            sun.position.x = 0;
            sphere.add(sun);
        };

        const createMercury = () => {
            const mercuryGeometry = new THREE.SphereGeometry(0.05, 32, 32);
            const mercuryMaterial = new THREE.MeshBasicMaterial({
                color: 0x0077be
            });

            mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
            mercury.position.x = 0.38;
            sphere.add(mercury);
        };

        const createVenus = () => {
            const venusGeometry = new THREE.SphereGeometry(0.138, 32, 32);
            const venusMaterial = new THREE.MeshBasicMaterial({
                color: 0x0077be
            });

            venus = new THREE.Mesh(venusGeometry, venusMaterial);
            venus.position.x = 0.108;
            sphere.add(venus);
        };

        const createEarth = () => {
            const earthGeometry = new THREE.SphereGeometry(0.15, 32, 32);
            const earthMaterial = new THREE.MeshBasicMaterial({
                color: 0x0077be
            });

            earth = new THREE.Mesh(earthGeometry, earthMaterial);
            earth.position.x = 1;
            sphere.add(earth);
        };

        const createMoon = () => {
            const moonGeometry = new THREE.SphereGeometry(0.05, 32, 32);
            const moonMaterial = new THREE.MeshBasicMaterial({
                color: 0xdddddd
            });

            moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.x = 0.3;
            earth.add(moon);
        };

        const createMars = () => {
            const marsGeometry = new THREE.SphereGeometry(0.1, 32, 32);
            const marsMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000
            });

            mars = new THREE.Mesh(marsGeometry, marsMaterial);
            mars.position.x = 1.7;
            sphere.add(mars);
        };

        const createJupiter = () => {
            const jupiterGeometry = new THREE.SphereGeometry(0.3, 32, 32);
            const jupiterMaterial = new THREE.MeshBasicMaterial({
                color: 0xffa500
            });
            jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
            jupiter.position.x = 2.5;
            sphere.add(jupiter);
        };

        const createSaturn = () => {
            const saturnGeometry = new THREE.SphereGeometry(0.25, 32, 32);
            const saturnMaterial = new THREE.MeshBasicMaterial({
                color: 0xdda0dd
            });

            saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
            saturn.position.x = 3.2;
            sphere.add(saturn);
        };

        const createUranus = () => {
            const uranusGeometry = new THREE.SphereGeometry(0.2, 32, 32);
            const uranusMaterial = new THREE.MeshBasicMaterial({
                color: 0x87ceeb
            });

            uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
            uranus.position.x = 4;
            sphere.add(uranus);
        };

        const createNeptune = () => {
            const neptuneGeometry = new THREE.SphereGeometry(0.19, 32, 32);
            const neptuneMaterial = new THREE.MeshBasicMaterial({
                color: 0x0000ff
            });

            neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
            neptune.position.x = 4.7;
            sphere.add(neptune);
        };

        const createPluto = () => {
            const plutoGeometry = new THREE.SphereGeometry(0.05, 32, 32);
            const plutoMaterial = new THREE.MeshBasicMaterial({
                color: 0x9f9f9f
            });

            pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);
            pluto.position.x = 5.2;
            sphere.add(pluto);
        };

        const animate = () => {
            requestAnimationFrame(animate);
            const speed = 1
            sphere.rotation.y += 0.01 * speed;

            earth.rotation.y += 0.01 * speed;
            moon.rotation.y += 0.01 * speed;
            mars.rotation.y += 0.01 * speed;
            jupiter.rotation.y += 0.01 * speed;
            saturn.rotation.y += 0.01 * speed;
            uranus.rotation.y += 0.01 * speed;
            neptune.rotation.y += 0.01 * speed;
            pluto.rotation.y += 0.01 * speed;

            renderer.render(scene, camera);
        };

        init();
        createSphere();
        createSun();
        createMercury();
        createVenus();
        createEarth();
        createMoon();
        createMars();
        createJupiter();
        createSaturn();
        createUranus();
        createNeptune();
        createPluto();
        animate();
    }, []);

    return <ComponentWrapper ref={containerRef} />;
};

const ComponentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width:100vw;
    height: 100vh;
    z-index: -1;
`

export default SolarSystem;

