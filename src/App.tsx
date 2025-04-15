import { Route, Routes } from "react-router";
import routes from "@/routes";
import Sidebar from "@/layouts/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function App() {
  return (
    <div className="w-full h-full">
      <SidebarProvider>
        <Sidebar />
        <main className="w-full h-full">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              ></Route>
            ))}
          </Routes>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
