import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import appStore from "@/store/appStore";
import i18next from "i18next";
import { Globe, MoonStar, Sun } from "lucide-react";
import { useEffect } from "react";

const Footer = () => {
  const { setFooterRendered } = appStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setFooterRendered(true);
  }, []);

  const changeLanguage = () => {
    i18next.changeLanguage(i18next.language === "en" ? "kr" : "en");
  };

  return (
    <footer className="py-2 px-4">
      <Button variant="ghost" onClick={changeLanguage}>
        <Globe />
      </Button>
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <MoonStar color="#7474dc" />
        ) : (
          <Sun color="#d3d322" />
        )}
      </Button>
    </footer>
  );
};

export default Footer;
