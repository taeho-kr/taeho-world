import { cn } from "@/lib/utils";
import routes from "@/routes";
import appStore from "@/store/appStore";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

const ANIMATE_DURATION = 1000; // ms

const Nav = () => {
  const { headerRendered, setNavRendered } = appStore();
  const renderTimeout = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const currentPath = location.pathname;
  const currentRoute = routes.find((route) => route.path === currentPath);

  useEffect(() => {
    if (!headerRendered) return;
    if (renderTimeout.current) clearTimeout(renderTimeout.current);

    renderTimeout.current = setTimeout(() => {
      setNavRendered(true);
    }, ANIMATE_DURATION);

    return () => {
      if (renderTimeout.current) clearTimeout(renderTimeout.current);
    };
  }, [headerRendered]);

  if (!headerRendered) return null;

  return (
    <nav
      className="animate-fadeInTop h-fit w-fit"
      style={{ animationDuration: `${ANIMATE_DURATION}ms` }}
    >
      <ul>
        {routes.map((route) => (
          <li
            key={route.path}
            className={cn("mb-2 relative border-b w-[fit-content]", {
              "border-b-[transparent]": currentRoute?.path !== route.path,
              "hover:border-b-[var(--muted)] hover:text-[var(--muted)]":
                currentRoute?.path !== route.path,
              "border-b-[white]": currentRoute?.path === route.path,
              "slease-in-out duration-300": currentRoute?.path === route.path,
            })}
          >
            <Link to={route.path} className="relative">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
