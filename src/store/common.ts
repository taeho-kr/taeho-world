import { atom } from "recoil";

export interface Comment {
  userID: string;
  comment: string;
  like: number;
  craetedDatetime: Date;
}

export interface Content {
    type: "image" | "video";
    src: string;
  }
  
export const commentsAtom = atom<Array<Comment>>({
  key: "commentsAtom",
  default: [],
});