import appStore from "@/store/appStore";
import React from "react";

interface ContentsProps {
  children: React.ReactNode;
}

const Contents = ({ children }: ContentsProps) => {
  const { navRendered } = appStore();

  if (!navRendered) {
    return null;
  }

  return <main>{children}</main>;
};

export default Contents;
