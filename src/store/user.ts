import { atom } from "recoil";
import { Story } from "./story";

export interface User {
  userID: string;
  image: string;
  stories: Array<Story>;
}

export const UsersAtom = atom<Array<User>>({
  key: "UsersAtom",
  default: [],
});
