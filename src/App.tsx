import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Post, { Posts } from "./components/Post";

function App() {
  const { ref, inView } = useInView();
  const _limit = 20;
  const fetchPosts = async ({ pageParam: _page = 1 }) => {
    const res = await axios.get<Posts[]>(
      "https://jsonplaceholder.typicode.com/posts",
      { params: { _page, _limit } }
    );
    return res.data;
  };

  const { data, hasNextPage, fetchNextPage, fetchStatus } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage.length < pages[0].length ? null : lastPageParam + 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && fetchStatus === "idle") fetchNextPage();
  }, [inView, hasNextPage, fetchStatus, fetchNextPage]);

  return (
    <div>
      <ol>
        {data?.pages
          .flatMap((page) => page)
          .map((post, i, posts) => (
            <Post
              key={post.id}
              post={post}
              innerRef={posts.length - _limit / 2 === i ? ref : undefined}
            />
          ))}
      </ol>
    </div>
  );
}

export default App;
