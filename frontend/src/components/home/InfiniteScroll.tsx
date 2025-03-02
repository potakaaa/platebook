"use client";

import { fetchFeed } from "@/lib/services/api/recipeServices";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard, { PostCardProps } from "../cards/PostCard";
import { title } from "process";
import Spinner from "../loader/Spinner";

const InfiniteScrollComp = () => {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchFeedData();
  }, []);

  const fetchFeedData = async () => {
    try {
      const response = await fetchFeed(page);
      const data = response;
      if (data.results && Array.isArray(data.results)) {
        const parsedResults: PostCardProps[] = data.results.map(
          (result: any) => {
            return {
              userImage: result.chef.pfp_url,
              userName: result.chef.username,
              title: result.title,
              description: result.description,
              images: result.images.map((image: any) => image.image_url),
              likeCount: result.likes,
              shareCount: result.shares,
              commentCount: 0,
              atPlateList: false,
            };
          }
        );

        setPosts((prevPosts) => [...prevPosts, ...parsedResults]);

        if (!data.next) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch Feed Error:", error);
      setHasMore(false);
    }
  };

  const refresh = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchFeedData();
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchFeed}
      hasMore={hasMore}
      loader={
        <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
          <Spinner />
        </div>
      }
      endMessage={
        <p className="text-center mt-20">Come back for more recipes!</p>
      }
      refreshFunction={refresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 className="text-center">&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 className="text-center">&#8593; Release to refresh</h3>
      }
    >
      {posts.map((post, index) => (
        <PostCard key={index} postItems={post} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComp;
