import { atom } from "recoil";

export const rootStateAtom = atom({
  key: "rootStateAtom",
  default: {},
});

export const headerStateAtom = atom({
  key: "headerStateAtom",
  default: {
    menus: [],
  },
});

export const menuStateAtom = atom({
  key: "menuStateAtom",
  default: {
    anchorElement: null,
    children: null,
    open: false,
  },
});

export const modalStateAtom = atom({
  key: "modalStateAtom",
  default: {
    open: false,
    children: undefined,
    useBackdrop: false,
  },
});
