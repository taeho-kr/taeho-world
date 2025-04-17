import appStore from "@/store/appStore";
import { useEffect, useState } from "react";

const EXPIRATION_TIME = 1000 * 60 * 30; // 30 minutes

const useLayout = () => {
  const { headerRendered, navRendered, footerRendered } = appStore();
  const [doNotAnimate, setDoNotAnimate] = useState<boolean>(false);

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

    setDoNotAnimate(true);
  };

  return {
    doNotAnimate,
    checkRenderHistory,
  };
};

export default useLayout;
