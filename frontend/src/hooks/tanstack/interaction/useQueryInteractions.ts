import { getFollowersByID, getFollowingByID, getRecipeComments } from "@/lib/services/api/interactionServices";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useQueryInteraction = () => {
    const useQueryGetComments = (id: string, enabled = false) => {
          const query = useQuery({
            queryKey: ["comments", id],
            queryFn: () => getRecipeComments(id),
            enabled: enabled,
          });

          return {
            ...query,
            refetch: query.refetch, 
          };
        };

    const useQueryGetFollowers = (id: string) => {
      const query = useQuery({
        queryKey: ["followers", id],
        queryFn: ()=> getFollowersByID(id)
      })

      return query;
    }

    const useQueryGetFollowing = (id: string) => {
      const query = useQuery({
        queryKey: ["following", id],
        queryFn: ()=> getFollowingByID(id)
      })

      return query
    }
    return {
        useQueryGetComments,
        useQueryGetFollowers,
        useQueryGetFollowing,
    }
};

export default useQueryInteraction;
