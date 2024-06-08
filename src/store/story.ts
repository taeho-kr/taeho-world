import { atom } from "recoil";
import { Content } from "./common";
import { User } from "./user";

export interface Story {
  userID: string;
  content: Content;
  createdDatetime: Date;
}

interface StoriesState {
  show: boolean;
  users: Array<User>;
}

export const StoriesAtom = atom<StoriesState>({
  key: "StoriesAtom",
  default: {
    show: false,
    users: [],
  },
});
