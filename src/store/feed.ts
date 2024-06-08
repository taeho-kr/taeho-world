import { atom } from "recoil";
import { Comment, Content } from "./common";

export interface Feed {
  userID: string;
  contents: Array<Content>;
  like: number;
  comments: Array<Comment>;
}

export const feedsAtom = atom<Array<Feed>>({
  key: "feedsAtom",
  default: [],
});
