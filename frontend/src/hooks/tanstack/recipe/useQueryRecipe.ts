import {
  fetchFeed,
  fetchFollowingFeed,
  fetchRecipe,
  fetchUserRecipes,
  searchRecipe,
} from "@/lib/services/api/recipeServices";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Pagination {
  current_page: number;
  total_pages: number;
  has_next: boolean;
}

interface SearchResponse {
  results: any[];
  pagination: Pagination;
}

const useQueryRecipe = () => {
  const useQueryFeed = () => {
    return useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
        const response = await fetchFeed(pageParam);
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.next ? allPages.length + 1 : undefined,
    });
  };

  const useQueryFetchUserRecipes = (id: string) => {
    return useInfiniteQuery({
      queryKey: ["user-recipes", id],
      queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
        const response = await fetchUserRecipes(id, pageParam);
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.next ? allPages.length + 1 : undefined,
      enabled: !!id,
    });
  };

  const useQueryFollowingFeed = () => {
    return useInfiniteQuery({
      queryKey: ["following-feed"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetchFollowingFeed(pageParam);
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.next ? allPages.length + 1 : undefined,
    });
  };

  const useQuerySearchRecipe = (search: string) => {
    return useInfiniteQuery({
      queryKey: ["search", search],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await searchRecipe(search, pageParam);

        console.log("Search Response", response);
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.next ? allPages.length + 1 : undefined,
    });
  };

  const useQueryFetchRecipe = (id: number) => {
    return useQuery({
      queryKey: ["recipe", id],
      queryFn: async () => {
        const response = await fetchRecipe(id);
        return response;
      },
      enabled: !!id,
    });
  };

  return {
    useQueryFeed,
    useQueryFollowingFeed,
    useQuerySearchRecipe,
    useQueryFetchRecipe,
    useQueryFetchUserRecipes,
  };
};

export default useQueryRecipe;
