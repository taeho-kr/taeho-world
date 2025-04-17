import { create } from "zustand";

interface AppState {
  headerRendered: boolean;
  navRendered: boolean;
  footerRendered: boolean;
  allRendered: boolean;
}

interface AppAction {
  setHeaderRendered: (value: boolean) => void;
  setNavRendered: (value: boolean) => void;
  setFooterRendered: (value: boolean) => void;
  setAllRendered: (value: boolean) => void;
}

const appStore = create<AppState & AppAction>((set) => ({
  headerRendered: false,
  navRendered: false,
  footerRendered: false,
  allRendered: false,
  setHeaderRendered: (value) => set({ headerRendered: value }),
  setNavRendered: (value) => set({ navRendered: value }),
  setFooterRendered: (value) => set({ footerRendered: value }),
  setAllRendered: (value) => set({ allRendered: value }),
}));

export default appStore;
