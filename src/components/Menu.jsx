import { useRecoilValue } from "recoil";
import { menuStateAtom } from "../store";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useMenu from "../hooks/useMenu";

const Menu = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const menuState = useRecoilValue(menuStateAtom);
  const menu = useMenu();
  const $menu = useRef();

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (
        ($menu.current && !$menu.current.contains(e.target)) ||
        e.target === menuState.anchorElement
      ) {
        menu.closeMenu();
      }
    };
    if (menuState.anchorElement === null) {
      setX(0);
      setY(0);
      document.removeEventListener("mousedown", checkClickOutside);
    } else {
      document.addEventListener("mousedown", checkClickOutside);
      const positionOfAnchorElement =
        menuState.anchorElement.getBoundingClientRect();
      const newX =
        positionOfAnchorElement.left - positionOfAnchorElement.width / 2;
      const newY = positionOfAnchorElement.top + positionOfAnchorElement.height;
      setX(newX);
      setY(newY);
    }
  }, [menuState.anchorElement]);

  return (
    <ComponentWrapper
      ref={$menu}
      x={x}
      y={y}
      open={menuState.open}
      onClose={menu.closeMenu}
    >
      {menuState.children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

export default Menu;
