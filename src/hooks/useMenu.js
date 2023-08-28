import { useResetRecoilState, useSetRecoilState } from "recoil";
import { menuStateAtom } from "../store";

const useMenu = () => {
  const setMenuState = useSetRecoilState(menuStateAtom);
  const initMenuState = useResetRecoilState(menuStateAtom);

  const openMenu = (anchorElement, children) => {
    const newMenuState = {
      open: true,
      children: children,
      anchorElement: anchorElement,
    };

    setMenuState(newMenuState);
  };

  const closeMenu = () => {
    initMenuState();
  };

  return {
    openMenu,
    closeMenu,
  };
};

export default useMenu;
