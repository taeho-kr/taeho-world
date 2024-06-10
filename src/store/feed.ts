import { atom } from "recoil";
import { Comment, Content } from "./common";

export interface Feed {
  userID: string;
  contents: Array<Content>;
  description?: string;
  like: number;
  comments: Array<Comment>;
  createdDatetime: Date;
}

export const feedsAtom = atom<Array<Feed>>({
  key: "feedsAtom",
  default: [],
});
