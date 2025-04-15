import { Home, Workflow } from "lucide-react";
import CareerPage from "./pages/CareerPage";
import LandingPage from "./pages/LandingPage";

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
    element: <LandingPage />,
    icon: <Home />,
  },
  {
    name: "Career",
    path: "/career",
    element: <CareerPage />,
    icon: <Workflow />,
  },
];

export default routes;
