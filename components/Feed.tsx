import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import { Post as PostType } from "../types";
import Input from "./Input";
import Post from "./Post";

type Props = {
  posts: PostType[];
};
const Feed = ({ posts }: Props) => {
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [sSRPostsState, setSSRPostsState] = useRecoilState(useSSRPostsState);
  const [clintSidePost, setClintSidePost] = useState<PostType[] | []>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/post");
      const data: PostType[] = await res.json();
      setClintSidePost(data);
      setSSRPostsState(false);
      setHandlePost(false);
    })();
  }, [handlePost, setHandlePost, setSSRPostsState]);
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {!sSRPostsState
        ? clintSidePost.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
