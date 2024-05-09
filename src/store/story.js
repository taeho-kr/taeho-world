import { atom } from "recoil";

export const StoriesAtom = atom({
  key: "StoriesAtom",
  default: {
    show: false,
    users: [],
  },
});
