import appStore from "@/store/appStore";
import { useEffect } from "react";

const Footer = () => {
  const { setFooterRendered } = appStore();

  useEffect(() => {
    setFooterRendered(true);
  }, []);

  return <footer></footer>;
};

export default Footer;
