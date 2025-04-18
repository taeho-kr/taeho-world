import { Route, Routes } from "react-router";
import routes from "@/routes";
import Header from "./layouts/Header";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import Contents from "./layouts/Contents";
import useLayout from "./hooks/useLayout";
import { useEffect } from "react";

function App() {
  const { isMobile, doNotAnimate, checkRenderHistory } = useLayout();

  useEffect(() => {
    checkRenderHistory();
  }, []);

  return (
    <div className="w-full h-full p-8 flex flex-col relative m-[0 auto] max-w-[1300px]">
      <div className="w-full flex flex-1 flex-col md:flex-row border rounded-md">
        {isMobile ? (
          <div className="flex flex-row justify-between items-center py-3 px-5">
            <Header animate={!doNotAnimate} />
            <Nav animate={!doNotAnimate} />
          </div>
        ) : (
          <div className="mt-10 ml-8">
            <Header animate={!doNotAnimate} />
            <Nav animate={!doNotAnimate} />
          </div>
        )}
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
