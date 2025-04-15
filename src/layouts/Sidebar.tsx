import { Button } from "@/components/ui/button";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/components/ui/theme-provider";
import routes from "@/routes";
import { Moon, Sun } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import icon from "@/assets/icons/gamepad-svgrepo-com.svg";

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <ShadcnSidebar>
        <SidebarHeader className="flex flex-row items-center gap-2 pl-4 pt-4">
          <img src={icon} className="w-8 h-8" />
          <strong>Taeho world</strong>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <Button
                    onClick={() => navigate(route.path)}
                    variant={
                      location.pathname === route.path ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                  >
                    {route.icon}
                    {route.name}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </SidebarFooter>
      </ShadcnSidebar>
    </>
  );
};

export default Sidebar;
