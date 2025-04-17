import { Home, Info, Workflow } from "lucide-react";
import CareerPage from "./pages/CareerPage";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";

export interface RoutableItem {
  name: string;
  path: string;
  element: React.ReactElement;
  icon?: React.ReactElement | string;
}

const routes: RoutableItem[] = [
  {
    name: "Home",
    path: "/",
    element: <HomePage />,
    icon: <Home />,
  },
  {
    name: "Career",
    path: "/career",
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
