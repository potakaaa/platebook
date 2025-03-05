import {
  fetchFeed,
  fetchFollowingFeed,
  fetchRecipe,
  fetchUserRecipes,
  searchRecipe,
} from "@/lib/services/api/recipeServices";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const useQueryRecipe = () => {
  const useQueryFeed = () => {
    return useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetchFeed(pageParam);
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.next ? allPages.length + 1 : undefined,
    });
  };

  const useQueryFetchUserRecipes = (id: string) => {
    return useInfiniteQuery({
      queryKey: ["user-recipes", id],
      queryFn: async ({ pageParam = 1 }) => {
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
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.nextPage : undefined,
    });
  };

  const useQuerySearchRecipe = (search: string) => {
    return useQuery({
      queryKey: ["search", search],
      queryFn: async () => {
        const response = await searchRecipe(search);
        return response;
      },
      enabled: !!search,
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
