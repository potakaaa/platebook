import { getRecipeComments } from "@/lib/services/api/interactionServices";
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
    return {
        useQueryGetComments
    }
};

export default useQueryInteraction;
