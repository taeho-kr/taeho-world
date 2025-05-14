import { Home, Info, Notebook, Workflow } from "lucide-react";
import CareerPage from "./pages/CareerPage";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import MemoPage from "./pages/MemoPage";

export interface RoutableItem {
  name: string;
  path: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
}

const routes: RoutableItem[] = [
  {
    name: "Home",
    path: "/",
    element: <HomePage />,
    icon: <Home />,
  },
  {
    name: "Projects",
    path: "/projects",
    element: <CareerPage />,
    icon: <Workflow />,
  },
  {
    name: "Info",
    path: "/info",
    element: <InfoPage />,
    icon: <Info />,
  },
];

export default routes;
