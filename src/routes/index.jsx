import CareerPage from "@/pages/CareerPage";
import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";
import iconHome from "@/assets/icons/home.svg";

export const routes = [
  { label: "Home", route: "/home", icon: iconHome, element: <HomePage /> },
  { label: "Career", route: "/career", icon: null, element: <CareerPage /> },
  { label: "Project", route: "/project", icon: null, element: <ProjectPage /> },
];
