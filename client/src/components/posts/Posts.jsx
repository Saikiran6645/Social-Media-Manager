import React from "react";
import Post from "../post/Post";
import CreatePost from "./createPost";
import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "../../services/postApi";

const Posts = () => {
  const { data, refetch, isFetched, isLoading } = useQuery({
    queryFn: getPostApi,
    queryKey: ["posts"],
  });
  console.log(data);

  return (
    <>
      <CreatePost />
      <div>
        {isLoading ? <h1>Loading...</h1> : <h1>Posts</h1>}
        {isFetched &&
          data.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
      </div>
    </>
  );
};

export default Posts;
