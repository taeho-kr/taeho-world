"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import AndroidRobot from "./AndroidRobot";

function Lighting({ scrollProgress }: { scrollProgress: number }) {
  const accentRef = useRef<THREE.PointLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (accentRef.current) {
      // Shift accent color from cool cyan to warm purple as user scrolls
      const r = THREE.MathUtils.lerp(0.42, 0.49, scrollProgress);
      const g = THREE.MathUtils.lerp(0.83, 0.30, scrollProgress);
      const b = THREE.MathUtils.lerp(0.94, 1.0, scrollProgress);
      accentRef.current.color.setRGB(r, g, b);
      accentRef.current.intensity = 0.5 + scrollProgress * 0.3;
    }
    if (rimRef.current) {
      rimRef.current.intensity = 0.3 + scrollProgress * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <pointLight ref={accentRef} position={[-3, 3, -3]} intensity={0.6} color="#a8d4f0" />
      <pointLight position={[3, -2, 4]} intensity={0.4} color="#88aaff" />
      <spotLight position={[0, 6, 2]} angle={0.35} penumbra={1} intensity={1} color="#ffffff" />
      <pointLight ref={rimRef} position={[0, 2, -4]} intensity={0.4} color="#e0e8ff" />
    </>
  );
}

/* ═══════════════════════════════════════════════
   STAR FIELD — distant twinkling stars
   ═══════════════════════════════════════════════ */
function StarField({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute on a large sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6 + 2; // bias upward
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.008 + Math.random() * 0.018;
    }
    return [pos, sz];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
      // Stars become more visible as user scrolls
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = 0.4 + scrollProgress * 0.4;
      mat.size = 0.012 + scrollProgress * 0.008;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color="#c8daf0"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   GROUND GRID — infinite-feel perspective grid
   ═══════════════════════════════════════════════ */
function GroundGrid({ scrollProgress }: { scrollProgress: number }) {
  const gridRef = useRef<THREE.GridHelper>(null);

  const grid = useMemo(() => {
    const helper = new THREE.GridHelper(14, 28, "#4fc3f7", "#4fc3f7");
    const mat = helper.material as THREE.Material;
    if (!Array.isArray(mat)) {
      mat.transparent = true;
      mat.opacity = 0.06;
      mat.depthWrite = false;
    }
    return helper;
  }, []);

  useFrame(() => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.Material;
      if (!Array.isArray(mat)) {
        mat.opacity = 0.03 + scrollProgress * 0.06;
      }
    }
  });

  return (
    <primitive ref={gridRef} object={grid} position={[0, -0.39, 0]} />
  );
}

/* ═══════════════════════════════════════════════
   LIGHT BEAMS — vertical volumetric pillars
   ═══════════════════════════════════════════════ */
function LightBeams({ scrollProgress }: { scrollProgress: number }) {
  const beams = useMemo(() => [
    { pos: [-4, 3, -5] as [number, number, number], scale: [0.03, 8, 0.03] as [number, number, number], opacity: 0.04, color: "#4fc3f7" },
    { pos: [5, 3, -6] as [number, number, number], scale: [0.02, 7, 0.02] as [number, number, number], opacity: 0.03, color: "#4fc3f7" },
    { pos: [-6, 3, -4] as [number, number, number], scale: [0.025, 9, 0.025] as [number, number, number], opacity: 0.03, color: "#7c4dff" },
    { pos: [3, 3, -7] as [number, number, number], scale: [0.015, 6, 0.015] as [number, number, number], opacity: 0.035, color: "#4fc3f7" },
    { pos: [7, 3, -3] as [number, number, number], scale: [0.02, 10, 0.02] as [number, number, number], opacity: 0.025, color: "#7c4dff" },
  ], []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = beams[i].opacity * (0.5 + scrollProgress * 1.5);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {beams.map((beam, i) => (
        <mesh key={i} position={beam.pos} scale={beam.scale}>
          <cylinderGeometry args={[1, 1, 1, 8]} />
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={beam.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   NEBULA GLOW — soft ambient color patches
   ═══════════════════════════════════════════════ */
function NebulaGlow() {
  const ref = useRef<THREE.Group>(null);

  const clouds = useMemo(() => [
    { pos: [-5, 4, -8] as [number, number, number], scale: 3, color: "#4fc3f7", opacity: 0.015 },
    { pos: [6, 3, -7] as [number, number, number], scale: 4, color: "#7c4dff", opacity: 0.012 },
    { pos: [0, 6, -10] as [number, number, number], scale: 5, color: "#4fc3f7", opacity: 0.01 },
    { pos: [-4, 1, -9] as [number, number, number], scale: 3.5, color: "#88aaff", opacity: 0.01 },
    { pos: [4, 5, -6] as [number, number, number], scale: 2.5, color: "#4fc3f7", opacity: 0.018 },
  ], []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.pos} scale={cloud.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING DUST — slow ambient particles
   ═══════════════════════════════════════════════ */
function FloatingDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 8 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.008;
    ref.current.position.y = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.006}
        color="#a8d4f0"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   HORIZON GLOW — gradient at the bottom
   ═══════════════════════════════════════════════ */
function HorizonGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, -0.38, -3]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 10]} />
      <meshBasicMaterial
        color="#4fc3f7"
        transparent
        opacity={0.06}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   SCROLL FOG — fog color shifts with scroll
   ═══════════════════════════════════════════════ */
function ScrollFog({ scrollProgress }: { scrollProgress: number }) {
  useFrame(({ scene }) => {
    const fog = scene.fog as THREE.Fog | null;
    if (!fog) return;
    // Shift from cool dark (#050a08) toward subtle purple (#08060d)
    const r = THREE.MathUtils.lerp(5 / 255, 8 / 255, scrollProgress);
    const g = THREE.MathUtils.lerp(10 / 255, 6 / 255, scrollProgress);
    const b = THREE.MathUtils.lerp(8 / 255, 13 / 255, scrollProgress);
    fog.color.setRGB(r, g, b);
    // Also update background color to match
    if (scene.background instanceof THREE.Color) {
      scene.background.setRGB(r, g, b);
    }
  });
  return null;
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const targetPos = useRef(new THREE.Vector3(0, 1, 4.5));
  const targetLook = useRef(new THREE.Vector3(0, 0.6, 0));

  useFrame((state) => {
    // Camera responds to scroll — tuned for GLB robot model
    if (scrollProgress < 0.15) {
      // Hero: full body view
      targetPos.current.set(0, 1, 5);
      targetLook.current.set(0, 0.5, 0);
    } else if (scrollProgress < 0.4) {
      // Expertise: right angle
      targetPos.current.set(2.5, 1.2, 4.5);
      targetLook.current.set(-0.2, 0.6, 0);
    } else if (scrollProgress < 0.65) {
      // Career: left angle
      targetPos.current.set(-2.5, 1, 4.5);
      targetLook.current.set(0.2, 0.5, 0);
    } else if (scrollProgress < 0.85) {
      // Projects: elevated angle
      targetPos.current.set(0, 2.5, 3.5);
      targetLook.current.set(0, 0.4, 0);
    } else {
      // Contact: face close-up
      targetPos.current.set(0, 1.5, 3);
      targetLook.current.set(0, 0.8, 0);
    }

    state.camera.position.lerp(targetPos.current, 0.018);
    const lookTarget = new THREE.Vector3().copy(state.camera.getWorldDirection(new THREE.Vector3()));
    state.camera.lookAt(
      THREE.MathUtils.lerp(state.camera.position.x + lookTarget.x, targetLook.current.x, 0.025),
      THREE.MathUtils.lerp(state.camera.position.y + lookTarget.y, targetLook.current.y, 0.025),
      THREE.MathUtils.lerp(state.camera.position.z + lookTarget.z, targetLook.current.z, 0.025)
    );
  });

  return null;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#4fc3f7" wireframe />
    </mesh>
  );
}

type Scene3DProps = {
  scrollProgress: number;
};

export default function Scene3D({ scrollProgress }: Scene3DProps) {
  return (
    <div className="fixed inset-0 h-screen w-full">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#050a08"]} />
        <fog attach="fog" args={["#050a08", 8, 18]} />

        <Suspense fallback={<LoadingFallback />}>
          <Lighting scrollProgress={scrollProgress} />
          <CameraRig scrollProgress={scrollProgress} />
          <ScrollFog scrollProgress={scrollProgress} />

          {/* Background elements — rendered behind the robot */}
          <StarField scrollProgress={scrollProgress} />
          <GroundGrid scrollProgress={scrollProgress} />
          <LightBeams scrollProgress={scrollProgress} />
          <NebulaGlow />
          <FloatingDust />
          <HorizonGlow />

          <AndroidRobot scrollProgress={scrollProgress} />

          <ContactShadows
            position={[0, -0.38, 0]}
            opacity={0.35}
            scale={5}
            blur={2.5}
            far={4}
            color="#4fc3f7"
          />

          <Environment preset="city" environmentIntensity={0.6} />

          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.8} intensity={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
