import { Route, Routes } from "react-router";
import routes from "@/routes";
import Header from "./layouts/Header";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import Contents from "./layouts/Contents";
import useLayout from "./hooks/useLayout";
import { useEffect } from "react";

function App() {
  const { allRendered, checkRenderHistory } = useLayout();

  useEffect(() => {
    checkRenderHistory();
  }, []);

  return (
    <div className="w-full h-full p-8">
      <div className="w-full h-full border rounded-lg p-8">
        <Header animate={!allRendered} />
        <div className="flex flex-row place-content-between mt-10">
          <Nav animate={!allRendered} />
          <Contents>
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
