import { atom } from "recoil";
import { Post } from "../types";

export const handlePostState = atom({
  key: "handlePostState",
  default: false,
});

export const getPostState = atom({
  key: "getPostState",
  default: {} as Post,
});

export const useSSRPostsState = atom({
  key: "useSSRPostsState",
  default: true,
});
