"use client";

import { fetchFeed } from "@/lib/services/api/recipeServices";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard, { PostCardProps } from "../../cards/PostCard";
import Spinner from "../../loader/Spinner";
import useQueryRecipe from "@/hooks/tanstack/recipe/useQueryRecipe";

const InfiniteScrollComp = ({ userId }: { userId?: string }) => {
  const { useQueryFeed, useQueryFetchUserRecipes } = useQueryRecipe();

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } = userId
    ? useQueryFetchUserRecipes(userId)
    : useQueryFeed();

  const posts: PostCardProps[] =
    data?.pages.flatMap((page) =>
      page.results.map((result: any) => ({
        id: result.id,
        userId: result.chef.id,
        userImage: result.chef.pfp_url,
        userName: result.chef.username,
        title: result.title,
        description: result.description,
        images: result.images.map((image: any) => image.image_url),
        likeCount: result.likes,
        shareCount: result.shares,
        commentCount: result.comments,
        atPlateList: result.isPlateListed,
        isLiked: result.isLiked,
        isShared: result.isShared,
      }))
    ) || [];

  if (isFetching && posts.length === 0) {
    return (
      <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
        <Spinner />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
          <Spinner />
        </div>
      }
      endMessage={
        <p className="text-center mt-20 text-foreground/60">
          Come back for more recipes!
        </p>
      }
      refreshFunction={refetch}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 className="text-center">&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 className="text-center">&#8593; Release to refresh</h3>
      }
    >
      <div className="flex flex-col w-full space-y-5">
        {posts.map((post, index) => (
          <PostCard key={index} postItems={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComp;
