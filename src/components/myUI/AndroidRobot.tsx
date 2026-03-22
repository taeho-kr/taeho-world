"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   Custom materials for the robot model
   ═══════════════════════════════════════════════ */
function createMaterials() {
  const white = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#e8eaed"),
    metalness: 0.05,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.6,
  });

  const accent = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#4fc3f7"),
    metalness: 0.3,
    roughness: 0.15,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
    emissive: new THREE.Color("#4fc3f7"),
    emissiveIntensity: 0.15,
    envMapIntensity: 2,
  });

  const visor = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0a0c14"),
    metalness: 0.98,
    roughness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.01,
    envMapIntensity: 5,
    emissive: new THREE.Color("#4fc3f7"),
    emissiveIntensity: 0.08,
  });

  return { white, accent, visor };
}

const GLOW = (intensity: number, opacity = 0.9) => ({
  color: "#4fc3f7",
  emissive: "#4fc3f7",
  emissiveIntensity: intensity,
  metalness: 0.3,
  roughness: 0.2,
  transparent: true as const,
  opacity,
});

/* ═══════════════════════════════════════════════
   ROBOT MODEL — loaded from GLB with custom materials
   ═══════════════════════════════════════════════ */
function RobotModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/robot-expressive.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, groupRef);

  // Custom materials
  const materials = useMemo(() => createMaterials(), []);

  // Apply custom materials to the model
  useEffect(() => {
    const matMap: Record<string, THREE.Material> = {
      Grey: materials.white,
      Main: materials.accent,
      Black: materials.visor,
    };

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map(
            (m: THREE.Material) => matMap[m.name] ?? m
          );
        } else {
          const replacement = matMap[child.material.name];
          if (replacement) child.material = replacement;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clone, materials]);

  // Play idle animation
  useEffect(() => {
    const idle = actions["Idle"];
    if (idle) {
      idle.reset().fadeIn(0.5).play();
    }
    return () => {
      idle?.fadeOut(0.3);
    };
  }, [actions]);

  // Switch animations based on scroll position
  const currentAction = useRef<string>("Idle");
  const scrollZone = scrollProgress > 0.85 ? "wave" : scrollProgress > 0.6 ? "thumbs" : "idle";
  useEffect(() => {
    const targetAnim = scrollZone === "wave" ? "Wave" : scrollZone === "thumbs" ? "ThumbsUp" : "Idle";

    if (targetAnim !== currentAction.current) {
      const prev = actions[currentAction.current];
      const next = actions[targetAnim];
      if (prev && next) {
        prev.fadeOut(0.4);
        next.reset().fadeIn(0.4).play();
      }
      currentAction.current = targetAnim;
    }
  }, [scrollZone, actions]);

  // Visor glow pulse
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    materials.visor.emissiveIntensity = 0.06 + Math.sin(t * 1.5) * 0.04;
    materials.accent.emissiveIntensity = 0.1 + Math.sin(t * 2) * 0.08;
  });

  return (
    <group ref={groupRef} scale={0.25} position={[0, -0.35, 0]}>
      <primitive object={clone} />
    </group>
  );
}

/* ═══════════════════════════════════════════════
   GLASS PLATFORM — refined holographic base
   ═══════════════════════════════════════════════ */
function GlassPlatform() {
  const gridRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gridRef.current) gridRef.current.rotation.z = t * 0.04;
    if (pulseRef.current) {
      const mat = pulseRef.current.material as THREE.MeshPhysicalMaterial;
      mat.opacity = 0.15 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group position={[0, -0.36, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.95}
          roughness={0.03}
          thickness={0.25}
          ior={1.5}
          chromaticAberration={0.04}
          anisotropy={0.08}
          color="#2a3a4a"
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.015, 16, 64]} />
        <meshPhysicalMaterial {...GLOW(0.6)} />
      </mesh>
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.008, 16, 64]} />
        <meshPhysicalMaterial {...GLOW(0.3, 0.2)} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.003, 16, 64]} />
        <meshPhysicalMaterial {...GLOW(0.2, 0.25)} />
      </mesh>
      <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <ringGeometry args={[0.3, 1.05, 6]} />
        <meshPhysicalMaterial
          color="#4fc3f7"
          emissive="#4fc3f7"
          emissiveIntensity={0.02}
          transparent
          opacity={0.03}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
      {[0.35, 0.55, 0.8].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.001, 8, 48]} />
          <meshPhysicalMaterial {...GLOW(0.1, 0.12)} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   ORBITAL RINGS
   ═══════════════════════════════════════════════ */
function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (r1.current) r1.current.rotation.z = t * 0.2;
    if (r2.current) r2.current.rotation.z = -t * 0.12;
    if (r3.current) r3.current.rotation.z = t * 0.08;
  });

  return (
    <>
      <mesh ref={r1} position={[0, 0.8, 0]} rotation={[Math.PI / 5, 0, 0]}>
        <torusGeometry args={[1.3, 0.005, 16, 100]} />
        <meshPhysicalMaterial {...GLOW(0.35, 0.3)} />
      </mesh>
      <mesh ref={r2} position={[0, 0.8, 0]} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[1.5, 0.003, 16, 100]} />
        <meshPhysicalMaterial {...GLOW(0.2, 0.15)} />
      </mesh>
      <mesh ref={r3} position={[0, 0.8, 0]} rotation={[Math.PI / 3, -Math.PI / 6, 0]}>
        <torusGeometry args={[1.7, 0.002, 16, 100]} />
        <meshPhysicalMaterial color="#7c4dff" emissive="#7c4dff" emissiveIntensity={0.15} transparent opacity={0.1} metalness={0.3} roughness={0.2} />
      </mesh>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HOLO FRAGMENTS
   ═══════════════════════════════════════════════ */
function HoloFragments() {
  const groupRef = useRef<THREE.Group>(null);
  const fragments = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 1.4 + Math.random() * 0.5;
      return {
        pos: [Math.cos(angle) * r, 0.1 + Math.random() * 1.8, Math.sin(angle) * r] as [number, number, number],
        scale: 0.015 + Math.random() * 0.025,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        shape: (i % 3) as 0 | 1 | 2,
      };
    }), []);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {fragments.map((f, i) => (
        <HoloShard key={i} {...f} />
      ))}
    </group>
  );
}

function HoloShard({ pos, scale, speed, phase, shape }: {
  pos: [number, number, number]; scale: number; speed: number; phase: number; shape: 0 | 1 | 2;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = pos[1] + Math.sin(t * speed + phase) * 0.15;
    ref.current.rotation.x = t * speed * 0.8;
    ref.current.rotation.z = t * speed * 0.5;
    const mat = ref.current.material as THREE.MeshPhysicalMaterial;
    mat.opacity = 0.15 + Math.sin(t * speed * 2 + phase) * 0.12;
  });

  return (
    <mesh ref={ref} position={pos} scale={scale}>
      {shape === 0 && <octahedronGeometry args={[1, 0]} />}
      {shape === 1 && <tetrahedronGeometry args={[1, 0]} />}
      {shape === 2 && <icosahedronGeometry args={[0.8, 0]} />}
      <meshPhysicalMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.5} transparent opacity={0.2} wireframe />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════ */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 120;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 2.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.2) * 4.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.012} color="#4fc3f7" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT — scroll-responsive robot
   ═══════════════════════════════════════════════ */
type AndroidRobotProps = { scrollProgress: number };

export default function AndroidRobot({ scrollProgress }: AndroidRobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotY = useRef(0);
  const targetPosX = useRef(0);
  const targetScale = useRef(1);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (scrollProgress < 0.2) {
      targetPosX.current = 0;
      targetRotY.current = Math.sin(t * 0.3) * 0.12;
      targetScale.current = 1;
    } else if (scrollProgress < 0.5) {
      targetPosX.current = -1.2;
      targetRotY.current = 0.35;
      targetScale.current = 0.95;
    } else if (scrollProgress < 0.75) {
      targetPosX.current = 1.2;
      targetRotY.current = -0.35;
      targetScale.current = 0.95;
    } else {
      targetPosX.current = 0;
      targetRotY.current = Math.sin(t * 0.5) * 0.25;
      targetScale.current = 1.02;
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX.current, 0.02);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY.current, 0.02);
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale.current, 0.02);
    groupRef.current.scale.setScalar(s);
  });

  return (
    <Float speed={1} rotationIntensity={0.02} floatIntensity={0.08}>
      <group ref={groupRef}>
        <RobotModel scrollProgress={scrollProgress} />
        <GlassPlatform />
        <OrbitalRings />
        <HoloFragments />
        <Particles />
      </group>
    </Float>
  );
}

useGLTF.preload("/models/robot-expressive.glb");
