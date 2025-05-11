import useThree from "@/hooks/useThree";
import { useEffect, useRef } from "react";

const MemoPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { threeTest } = useThree();

  useEffect(() => {
    if (containerRef.current) {
      threeTest(containerRef.current);
    }
  }, []);

  return <div className="w-full h-full" ref={containerRef} />;
};

export default MemoPage;
