import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";

const SolarSystem = () => {
  const containerRef = useRef();

  useEffect(() => {
    let scene,
      camera,
      renderer,
      sun,
      mercury,
      venus,
      earth,
      moon,
      mars,
      jupiter,
      saturn,
      uranus,
      neptune,
      pluto,
      sphere;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);

      camera.position.z = 10; // 카메라 위치를 뒤로 이동
      camera.position.x = 0; // 수평 위치를 중앙으로 조정 (선택 사항)
      camera.position.y = 0; // 수직 위치를 중앙으로 조정 (선택 사항)

      // 원하는 시야각을 설정 (75는 적절한 기본값)
      camera.fov = 75;

      // 가까운 및 먼 클리핑 평면을 설정하여 전체 객체가 화면에 나타날 수 있도록 함
      camera.near = 0.1;
      camera.far = 1000;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      containerRef.current.appendChild(renderer.domElement);
      window.addEventListener("keydown", (e) => {
        switch (e.code) {
          case "ArrowRight":
            moveX(camera, -0.1);
            break;
          case "ArrowLeft":
            moveX(camera, 0.1);
            break;
          case "ArrowUp":
            moveY(camera, -0.1);
            break;
          case "ArrowDown":
            moveY(camera, 0.1);
            break;
        }
      });
      window.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) moveZ(camera, 0.1);
        else moveZ(camera, -0.1);
      });
    };

    const moveX = (cameraObject, x) => {
      // cameraObject.rotateX(x)
      cameraObject.position.x += x * 0.5;
    };

    const moveY = (cameraObject, y) => {
      // cameraObject.rotateY(y)
      cameraObject.position.y += y * 0.5;
    };

    const moveZ = (cameraObject, z) => {
      // cameraObject.rotateZ(z)
      cameraObject.position.z += z * 0.5;
    };

    const createSphere = () => {
      const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      });

      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
    };

    const createSun = () => {
      const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xff8800,
      });

      sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.x = 0;
      sphere.add(sun);
    };

    const createMercury = () => {
      const mercuryGeometry = new THREE.SphereGeometry(0.05, 32, 32);
      const mercuryMaterial = new THREE.MeshBasicMaterial({
        color: 0x73e1ff,
      });

      mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
      mercury.position.x = 0.108;
      sphere.add(mercury);
    };

    const createVenus = () => {
      const venusGeometry = new THREE.SphereGeometry(0.138, 32, 32);
      const venusMaterial = new THREE.MeshBasicMaterial({
        color: 0xa86932,
      });

      venus = new THREE.Mesh(venusGeometry, venusMaterial);
      venus.position.x = 0.38;
      sphere.add(venus);
    };

    const createEarth = () => {
      const earthGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const earthMaterial = new THREE.MeshBasicMaterial({
        color: 0x0077be,
      });

      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.position.x = 1;
      sphere.add(earth);
    };

    const createMoon = () => {
      const moonGeometry = new THREE.SphereGeometry(0.05, 32, 32);
      const moonMaterial = new THREE.MeshBasicMaterial({
        color: 0xdddddd,
      });

      moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.x = 0.3;
      earth.add(moon);
    };

    const createMars = () => {
      const marsGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const marsMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
      });

      mars = new THREE.Mesh(marsGeometry, marsMaterial);
      mars.position.x = 1.7;
      sphere.add(mars);
    };

    const createJupiter = () => {
      const jupiterGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const jupiterMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
      });
      jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
      jupiter.position.x = 2.5;
      sphere.add(jupiter);
    };

    const createSaturn = () => {
      const saturnGeometry = new THREE.SphereGeometry(0.25, 32, 32);
      const saturnMaterial = new THREE.MeshBasicMaterial({
        color: 0xdda0dd,
      });

      saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
      saturn.position.x = 3.2;
      sphere.add(saturn);
    };

    const createUranus = () => {
      const uranusGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const uranusMaterial = new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
      });

      uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
      uranus.position.x = 4;
      sphere.add(uranus);
    };

    const createNeptune = () => {
      const neptuneGeometry = new THREE.SphereGeometry(0.19, 32, 32);
      const neptuneMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      });

      neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
      neptune.position.x = 4.7;
      sphere.add(neptune);
    };

    const createPluto = () => {
      const plutoGeometry = new THREE.SphereGeometry(0.05, 32, 32);
      const plutoMaterial = new THREE.MeshBasicMaterial({
        color: 0x9f9f9f,
      });

      pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);
      pluto.position.x = 5.2;
      sphere.add(pluto);
    };

    const update = () => {
      const time = Date.now() * 0.01;

      // Calculate the ratio of the period of each planet to that of Earth
      const mercuryRatio = 0.24;
      const venusRatio = 0.62;
      const earthRatio = 1;
      const marsRatio = 1.88;
      const jupiterRatio = 11.86;
      const saturnRatio = 29.46;
      const uranusRatio = 84.01;
      const neptuneRatio = 164.8;
      const plutoRatio = 247.68;

      // Update the positions of the planets based on their period ratio
      mercury.position.x = Math.cos((time / mercuryRatio) * 0.7) * 0.38;
      mercury.position.z = Math.sin((time / mercuryRatio) * 0.7) * 0.38;
      venus.position.x = Math.cos((time / venusRatio) * 0.6) * 0.72;
      venus.position.z = Math.sin((time / venusRatio) * 0.6) * 0.72;
      earth.position.x = Math.cos((time / earthRatio) * 0.5) * 1;
      earth.position.z = Math.sin((time / earthRatio) * 0.5) * 1;
      moon.position.x = Math.cos((time / earthRatio) * 0.5) * 0.3;
      mars.position.x = Math.cos((time / marsRatio) * 0.4) * 1.5;
      mars.position.z = Math.sin((time / marsRatio) * 0.4) * 1.5;
      jupiter.position.x = Math.cos((time / jupiterRatio) * 0.3) * 2.5;
      jupiter.position.z = Math.sin((time / jupiterRatio) * 0.3) * 2.5;
      saturn.position.x = Math.cos((time / saturnRatio) * 0.2) * 3.2;
      saturn.position.z = Math.sin((time / saturnRatio) * 0.2) * 3.2;
      uranus.position.x = Math.cos((time / uranusRatio) * 0.1) * 4;
      uranus.position.z = Math.sin((time / uranusRatio) * 0.1) * 4;
      neptune.position.x = Math.cos((time / neptuneRatio) * 0.09) * 4.7;
      neptune.position.z = Math.sin((time / neptuneRatio) * 0.09) * 4.7;
      pluto.position.x = Math.cos((time / plutoRatio) * 0.08) * 5.2;
      pluto.position.z = Math.sin((time / plutoRatio) * 0.08) * 5.2;

      renderer.render(scene, camera);

      requestAnimationFrame(update);
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
    update();
  }, []);

  return <ComponentWrapper ref={containerRef} />;
};

const ComponentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

export default SolarSystem;
