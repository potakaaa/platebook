'use client';

import { fetchFeed } from "@/lib/services/api/recipeServices";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard, { PostCardProps } from "../cards/PostCard";
import { title } from "process";

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

        const parsedResults: PostCardProps[] = data.results.map((result: any) => {
            return {
              userImage: result.chef.pfp_url,
              userName: result.chef.username,
              title: result.title,
              description: result.description,
              images: result.images.map((image: any) => image.image_url),
              likeCount: result.likes,
              shareCount: result.shares,
              commentCount: result.comments,
              atPlateList: result.isPlateListed,
            };
            });

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
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={refresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      {posts.map((post, index) => (
        <PostCard key={index} postItems={post} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComp;
