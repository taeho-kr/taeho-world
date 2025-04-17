import appStore from "@/store/appStore";
import { useEffect } from "react";

const EXPIRATION_TIME = 1000 * 60 * 30; // 30 minutes

const useLayout = () => {
  const {
    headerRendered,
    navRendered,
    footerRendered,
    allRendered,
    setAllRendered,
  } = appStore();

  useEffect(() => {
    if (headerRendered && navRendered && footerRendered) {
      localStorage.setItem(
        "layoutRendered",
        (new Date().getTime() + EXPIRATION_TIME).toString()
      );
    }
  }, [headerRendered, navRendered, footerRendered]);

  const checkRenderHistory = () => {
    const cacheTime = localStorage.getItem("layoutRendered");
    if (!cacheTime) return;
    const currentTime = new Date().getTime();
    const expirationTime = Number(cacheTime);

    if (currentTime > expirationTime) {
      localStorage.removeItem("layoutRendered");
      return;
    }

    setAllRendered(true);
  };

  return {
    allRendered,
    checkRenderHistory,
  };
};

export default useLayout;
