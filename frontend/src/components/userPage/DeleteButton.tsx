"use client";

import { Button } from "@/components/ui/button";
import useMutationRecipe from "@/hooks/tanstack/recipe/useMutationRecipe";
import useQueryRecipe from "@/hooks/tanstack/recipe/useQueryRecipe";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

// interface DeleteButtonProps {
//   onClick?: () => void;
//   disabled?: boolean;
//   id: string;
// }

const DeleteButton = ({ id }: { id: string }) => {
  const { useMutationDeleteRecipe } = useMutationRecipe();
  const { mutate: deleteRecipe, isPending: isDeleting } =
    useMutationDeleteRecipe();

  const router = useRouter();

  const { useQueryFetchRecipe } = useQueryRecipe();
  const { data: recipe, isPending, error } = useQueryFetchRecipe(id);

  const handleRecipeDelete = () => {
    deleteRecipe(recipe?.id, {
      onSuccess: () => {
        router.push("/home");
      },
      onError: (error) => {
        console.error("Error deleting recipe:", error);
      },
    });
  };

  return (
    <Button
      variant={"destructive"}
      onClick={() =>
        toast.error("Delete this recipe?", {
          action: { label: "Delete", onClick: handleRecipeDelete },
        })
      }
      disabled={isPending}
    >
      Delete
      <Trash className="size-6" />
    </Button>
  );
};

export default DeleteButton;
