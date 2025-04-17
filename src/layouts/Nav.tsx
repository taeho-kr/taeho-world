import { cn } from "@/lib/utils";
import routes from "@/routes";
import appStore from "@/store/appStore";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

const RENDER_DELAY = 250; // ms
const ANIMATE_DURATION = 1000; // ms

const Nav = ({ animate }: { animate: boolean }) => {
  const { headerRendered, setNavRendered } = appStore();
  const [render, setRender] = useState<boolean>(animate);
  const renderTimeout = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const currentPath = location.pathname;
  const currentRoute = routes.find((route) => route.path === currentPath);

  useEffect(() => {
    if (!headerRendered) return;

    setTimeout(() => {
      setRender(true);
      if (renderTimeout.current) clearTimeout(renderTimeout.current);

      renderTimeout.current = setTimeout(() => {
        setNavRendered(true);
      }, ANIMATE_DURATION);
    }, RENDER_DELAY);

    return () => {
      if (renderTimeout.current) clearTimeout(renderTimeout.current);
    };
  }, [headerRendered]);

  if (!render) return null;

  return (
    <nav
      className="animate-fadeInTop h-fit w-fit"
      style={{ animationDuration: `${animate ? ANIMATE_DURATION : 0}ms` }}
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
            <Link to={route.path} className="relative flex flex-row">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
