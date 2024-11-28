// import React from "react";
import Post from "../post/Post";
import CreatePost from "./createPost";
import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "../../services/postApi";

const Posts = () => {
  const { data, refetch, isFetched, isLoading, isError } = useQuery({
    queryFn: getPostApi,
    queryKey: ["posts"],
  });

  console.log(data);

  // Error handling for better user feedback
  if (isError) {
    return <h1>Error loading posts. Please try again later.</h1>;
  }

  return (
    <>
      <CreatePost onPostCreated={refetch} />
      <div>
        {isLoading ? <h1>Loading...</h1> : <h1>Posts</h1>}
        {isFetched && data?.length > 0 ? (
          data.map((data) => <Post key={data.id} post={data} />)
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Posts;
