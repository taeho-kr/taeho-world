"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/myUI/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-[#050a08]">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing ring loader */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border border-[#4fc3f7]/20 border-t-[#4fc3f7]/80" />
          <div className="absolute inset-2 animate-spin rounded-full border border-[#7c4dff]/10 border-b-[#7c4dff]/50" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          <div className="h-1.5 w-1.5 rounded-full bg-[#4fc3f7]/60" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-xs font-light tracking-[0.4em] text-white/50 uppercase">
            Loading 3D Scene
          </p>
          <div className="h-px w-16 bg-linear-to-r from-transparent via-[#4fc3f7]/30 to-transparent" />
        </div>
      </div>
    </div>
  ),
});

export default function Scene3DLoader({ scrollProgress }: { scrollProgress: number }) {
  return <Scene3D scrollProgress={scrollProgress} />;
}
