import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";

const SolarSystem = () => {
  const containerRef = useRef();
  const planetsData = [
    {
      name: "Sun",
      size: 0.5,
      color: 0xff8800,
      position: { x: 0, y: 0, z: 0 },
      period: 1,
    },
    {
      name: "Mercury",
      size: 0.05,
      color: 0x9a9a9a,
      position: { x: 0.108, y: 0, z: 0 },
      period: 88,
    },
    {
      name: "Venus",
      size: 0.138,
      color: 0xcfae74,
      position: { x: 0.38, y: 0, z: 0 },
      period: 225,
    },
    {
      name: "Earth",
      size: 0.15,
      color: 0x4b98e2,
      position: { x: 1, y: 0, z: 0 },
      period: 365,
      child: "moon",
    },
    {
      name: "Mars",
      size: 0.1,
      color: 0xe98044,
      position: { x: 1.7, y: 0, z: 0 },
      period: 687,
    },
    {
      name: "Jupiter",
      size: 0.3,
      color: 0xf3c678,
      position: { x: 2.5, y: 0, z: 0 },
      period: 4333,
    },
    {
      name: "Saturn",
      size: 0.25,
      color: 0xe9d69c,
      position: { x: 3.2, y: 0, z: 0 },
      period: 10759,
    },
    {
      name: "Uranus",
      size: 0.2,
      color: 0x87ceeb,
      position: { x: 4, y: 0, z: 0 },
      period: 30689,
    },
    {
      name: "Neptune",
      size: 0.19,
      color: 0x4778b6,
      position: { x: 4.7, y: 0, z: 0 },
      period: 60182,
    },
  ];
  const moonsData = [
    {
      name: "Moon",
      parent: "Earth",
      size: 0.05,
      color: 0xeaed85,
      position: { x: 0.01, y: 0, z: 0 },
      period: 30,
    },
  ];

  useEffect(() => {
    let scene, camera, renderer, sphere;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight
      );

      camera.position.z = 100;
      camera.position.y = 20;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      containerRef.current.appendChild(renderer.domElement);
    };

    const createSphere = () => {
      const sphereGeometry = new THREE.SphereGeometry(0, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      });

      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
    };

    const createPlanet = (planetData) => {
      const planetGeometry = new THREE.SphereGeometry(
        planetData.size * 2,
        32,
        32
      );
      const planetMaterial = new THREE.MeshBasicMaterial({
        color: planetData.color,
      });

      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(
        planetData.position.x,
        planetData.position.y,
        planetData.position.z
      );

      planetData.mesh = planet;
      sphere.add(planet);
    };

    const createMoon = (moonData) => {
      const moonDataGeometry = new THREE.SphereGeometry(
        moonData.size * 2,
        32,
        32
      );
      const moonDataMaterial = new THREE.MeshBasicMaterial({
        color: moonData.color,
      });

      const moon = new THREE.Mesh(moonDataGeometry, moonDataMaterial);
      moon.position.set(
        moonData.position.x,
        moonData.position.y,
        moonData.position.z
      );

      moonData.mesh = moon;
      const parent = planetsData.filter(
        (planetData) => planetData.name === moonData.parent
      );
      parent[0] && parent[0].mesh.add(moon);
    };

    const updatePositions = (time) => {
      const accelerate = 30;
      planetsData.forEach((planetData) => {
        const planet = planetData.mesh;
        const period = planetData.period / accelerate;

        planet.position.x =
          Math.cos(time / period) * planetData.position.x * 10;
        planet.position.z = Math.sin(time / period) * planetData.position.x;
      });

      moonsData.forEach((moonData) => {
        const moon = moonData.mesh;
        const period = moonData.period / accelerate;

        const parentPlanet = planetsData.find(
          (planetData) => planetData.name === moonData.parent
        );
        const parentPosition = parentPlanet.position.x * 10;
        moon.position.x =
          Math.cos(time / period) * parentPosition * moonData.position.x * 10;
        moon.position.z =
          Math.sin(time / period) * parentPosition * moonData.position.y * 10;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(update);
    };

    const update = () => {
      const time = Date.now() * 0.01;
      updatePositions(time);
    };

    init();
    createSphere();

    planetsData.forEach((planetData) => {
      createPlanet(planetData);
    });
    moonsData.forEach((moonData) => {
      createMoon(moonData);
    });

    update();
  }, []);

  return <ComponentWrapper ref={containerRef} />;
};

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default SolarSystem;
