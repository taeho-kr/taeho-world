import { Route, Routes } from "react-router";
import routes from "@/routes";
import Header from "./layouts/Header";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import Contents from "./layouts/Contents";
import useLayout from "./hooks/useLayout";
import { useCallback, useEffect, useState } from "react";
import { cn } from "./lib/utils";
import useThree from "./hooks/useThree";

function App() {
  const { isMobile, doNotAnimate, checkRenderHistory } = useLayout();
  const [contentsContainer, setContentsContainer] =
    useState<HTMLDivElement | null>(null);
  const { threeWave } = useThree();

  const mountRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContentsContainer(node);
    }
  }, []);

  useEffect(() => {
    if (contentsContainer) {
      threeWave(contentsContainer);
    }
  }, [contentsContainer]);

  useEffect(() => {
    checkRenderHistory();
  }, []);

  return (
    <div className="w-full h-full p-8 flex flex-col max-w-[1300px]">
      <div
        className={cn(
          "w-full flex flex-1 border max-h-[100%] overflow-hidden rounded-md relative",
          isMobile ? "flex-col" : "flex-row"
        )}
      >
        <div ref={mountRef} className="absolute w-full h-full opacity-20" />
        <div
          className={
            isMobile
              ? "flex flex-row justify-between items-center py-3 px-5"
              : "mt-10 ml-8"
          }
        >
          <Header animate={!doNotAnimate} />
          <Nav animate={!doNotAnimate} />
        </div>
        <Contents animate={!doNotAnimate}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Contents>
      </div>
      <Footer />
    </div>
  );
}

export default App;
