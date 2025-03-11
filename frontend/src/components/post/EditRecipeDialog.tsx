"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import NavButtonLeft from "../home/nav/NavButtonsLeft";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { DialogContent } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditRecipe,
  RecipeImage,
  SubmitEditRecipe,
  SubmitRecipe,
} from "@/lib/types/recipeTypes";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Trash } from "lucide-react";
import CountryCombobox from "./CountryCombobox";
import ToolTipButton from "../home/buttons/ToolTipButton";
import { FileUpload } from "../ui/file-upload";
import useMutationRecipe from "@/hooks/tanstack/recipe/useMutationRecipe";
import { useQueryClient } from "@tanstack/react-query";
import EditButton from "../userPage/EditButton";
import { urlToFile } from "@/lib/utils/urlToFile";
import { toast } from "sonner";

/*

FIND WAY TO PERSIST INGREDIENT IDS AND STEP IDS

*/

const IngredientSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Ingredient name is required")
    .max(100, "Ingredient name cannot be longer than 100 characters"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .max(50, "Quantity cannot be longer than 50 characters"),
});

const ImageSchema = z.object({
  id: z.string().optional(),
  image: z.instanceof(File),
});

const StepSchema = z.object({
  id: z.string().optional(),
  step_num: z
    .number()
    .min(1, "Step number must be at least 1")
    .max(100, "Step number must not exceed 100"),
  description: z
    .string()
    .min(1, "Step description is required")
    .max(500, "Step description cannot be longer than 500 characters"),
});

const editRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(250, "Title can't be longer than 250 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description can't be longer than 500 characters"),

  origin_country: z
    .string()
    .min(1, "Origin country is required")
    .max(100, "Origin country cannot be longer than 100 characters"),

  steps: z
    .array(StepSchema)
    .min(1, "At least one step is required")
    .refine(
      (steps) => {
        const stepNumbers = steps.map((step) => step.step_num);
        const uniqueStepNumbers = new Set(stepNumbers);
        return stepNumbers.length === uniqueStepNumbers.size;
      },
      {
        message: "Step numbers must be unique.",
      }
    ),

  ingredients: z
    .array(IngredientSchema)
    .min(1, "At least one ingredient is required"),

  images: z
    .array(ImageSchema)
    .refine((files) => (files ? files.length > 0 : true), {
      message: "At least one image is required",
    }),
});

interface EditRecipeDialogProps {
  recipe: EditRecipe;
  id: string;
}

const EditRecipeDialog: React.FC<EditRecipeDialogProps> = ({ recipe, id }) => {
  const { useMutationEditRecipe } = useMutationRecipe();
  const { mutate: editRecipe, isPending } = useMutationEditRecipe();

  useEffect(() => {
    const processImages = async () => {
      if (recipe.images && recipe.images.length > 0) {
        const filesWithIds = await Promise.all(
          recipe.images.map(async (img, index) => {
            const file = await urlToFile(
              img.image_url || "",
              `recipe_image_${index}.jpg`
            );
            return { id: String(img.id), file };
          })
        );
        form.setValue(
          "images",
          filesWithIds.map((file) => ({ id: file.id, image: file.file }))
        );
      }
    };

    processImages();
  }, [recipe]);

  const form = useForm({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      origin_country: recipe.origin_country,
      ingredients: recipe.ingredients.map((ingredient) => ({
        id: String(ingredient.id),
        name: ingredient.name,
        quantity: ingredient.quantity,
      })),
      steps: recipe.steps.map((step, index) => ({
        id: String(step.id),
        step_num: step.step_num,
        description: step.description,
      })),
      images: [],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const [open, setOpen] = useState(false);

  const onSubmit = form.handleSubmit((data) => {
    const editPromise = new Promise<void>((resolve) => {
      editRecipe(
        { id: id, data: data as SubmitEditRecipe },
        {
          onSuccess: () => {
            setOpen(false);
            resolve();
          },
        }
      );
    });

    toast.promise(editPromise, {
      loading: "Editing recipe...",
      success: "Recipe edited successfully!",
      error: "Error editing recipe",
    });

    return editPromise;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton onClick={() => {}} />
      </DialogTrigger>
      <DialogContent
        className="overflow-y-auto w-3/6 max-h-[80vh] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar]:w-2 gap-2"
      >
        <DialogTitle className="text-center font-bold">Edit Post</DialogTitle>
        <span className="border-b border-muted mb-2" />
        <Form {...form}>
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Enter title here..."
                    className="py-5"
                    id="title"
                    type="text"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    placeholder="Enter your recipe description here..."
                    id="description"
                    className="min-h-44"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin_country"
              render={({ field }) => (
                <CountryCombobox
                  value={field.value}
                  setFormValue={(value: string) =>
                    form.setValue("origin_country", value)
                  }
                />
              )}
            />
            <div className="flex flex-col gap-2">
              {ingredientFields.map((ingredient, index) => (
                <div key={ingredient.id} className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-[3]">
                        <FormControl>
                          <Input
                            id={`ingredients.${index}.name`}
                            type="text"
                            placeholder="Ingredient Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="flex-[1]">
                        <FormControl>
                          <Input
                            id={`ingredients.${index}.quantity`}
                            type="text"
                            placeholder="Quantity"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hidden input to store ingredient id */}
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="flex-[1]">
                        <FormControl>
                          <Input
                            id={`ingredients.${index}.id`}
                            type="hidden"
                            placeholder="Id"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ToolTipButton
                    btnChildren={<Trash className="size-8 text-destructive" />}
                    btnVariant="ghost"
                    btnSize="icon"
                    tipChildren={<p>Remove Ingredient</p>}
                    onClick={() => {
                      if (stepFields.length > 1) removeIngredient(index);
                    }}
                  />

                  <ToolTipButton
                    btnChildren={<IconSquareRoundedPlus className="size-8" />}
                    btnVariant="ghost"
                    btnSize="icon"
                    tipChildren={<p>Add Ingredient</p>}
                    onClick={() => appendIngredient({ name: "", quantity: "" })}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {stepFields.map((step: any, index: number) => (
                <div key={step.id} className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name={`steps.${index}.step_num`}
                    render={({ field }) => (
                      <FormItem className="flex-[1]">
                        <FormControl>
                          <Input
                            id={`steps.${index}.step_num`}
                            type="number"
                            readOnly
                            value={Number(index + 1)}
                            className="text-center"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="flex-[7]">
                        <FormControl>
                          <Input
                            id={`steps.${index}.description`}
                            type="text"
                            placeholder="Step Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hidden input to store step id */}
                  <FormField
                    control={form.control}
                    name={`steps.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="flex-[1]">
                        <FormControl>
                          <Input
                            id={`steps.${index}.id`}
                            type="hidden"
                            readOnly
                            value={Number(field.value)}
                            className="text-center"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ToolTipButton
                    btnChildren={<Trash className="size-8 text-destructive" />}
                    btnVariant="ghost"
                    btnSize="icon"
                    tipChildren={<p>Remove Step</p>}
                    onClick={() => {
                      if (stepFields.length > 1) removeStep(index);
                    }}
                  />

                  <ToolTipButton
                    btnChildren={<IconSquareRoundedPlus className="size-8" />}
                    btnVariant="ghost"
                    btnSize="icon"
                    tipChildren={<p>Add Step</p>}
                    onClick={() => {
                      appendStep({
                        step_num: stepFields.length + 1,
                        description: "",
                      });
                    }}
                  />
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full max-w-xl mx-auto min-h-32 border border-dashed bg-transparent border-secondary rounded-lg">
                      <FileUpload
                        initialFiles={field.value}
                        onFileChange={(files: (File | RecipeImage)[]) => {
                          if (files.every((file) => file instanceof File)) {
                            field.onChange(files as File[]);
                          } else {
                            field.onChange(files as RecipeImage[]);
                          }
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        multiple
                        id="images"
                        type="file"
                        fileType="image"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipeDialog;
