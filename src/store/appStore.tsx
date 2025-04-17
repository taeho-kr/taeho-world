import { create } from "zustand";

interface AppState {
  headerRendered: boolean;
  navRendered: boolean;
  footerRendered: boolean;
}

interface AppAction {
  setHeaderRendered: (value: boolean) => void;
  setNavRendered: (value: boolean) => void;
  setFooterRendered: (value: boolean) => void;
}

const appStore = create<AppState & AppAction>((set) => ({
  headerRendered: false,
  navRendered: false,
  footerRendered: false,
  setHeaderRendered: (value) => set({ headerRendered: value }),
  setNavRendered: (value) => set({ navRendered: value }),
  setFooterRendered: (value) => set({ footerRendered: value }),
}));

export default appStore;
