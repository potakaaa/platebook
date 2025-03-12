"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useState } from "react";
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
import { RecipeImage, SubmitRecipe } from "@/lib/types/recipeTypes";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SquareArrowOutUpRight, Trash } from "lucide-react";
import CountryCombobox from "./CountryCombobox";
import ToolTipButton from "../home/buttons/ToolTipButton";
import { FileUpload } from "../ui/file-upload";
import useMutationRecipe from "@/hooks/tanstack/recipe/useMutationRecipe";
import { useQueryClient } from "@tanstack/react-query";
import { usePostDialogStore } from "@/store/post/usePostDialogStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const IngredientSchema = z.object({
  name: z
    .string()
    .min(1, "Ingredient name is required")
    .max(100, "Ingredient name cannot be longer than 100 characters"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .max(50, "Quantity cannot be longer than 50 characters"),
});

const StepSchema = z.object({
  step_num: z
    .number()
    .min(1, "Step number must be at least 1")
    .max(100, "Step number must not exceed 100"),
  description: z
    .string()
    .min(1, "Step description is required")
    .max(500, "Step description cannot be longer than 500 characters"),
});

const postRecipeSchema = z.object({
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
    .array(z.instanceof(File))
    .refine((files) => (files ? files.length > 0 : true), {
      message: "At least one image is required",
    }),
});

const PostRecipeDialog = () => {
  const { useMutationPostRecipe } = useMutationRecipe();
  const { mutate: postRecipe, isPending } = useMutationPostRecipe();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  const form = useForm({
    resolver: zodResolver(postRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      origin_country: "",
      steps: [{ step_num: 1, description: "" }],
      ingredients: [{ name: "", quantity: "" }],
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

  const { open, setOpen } = usePostDialogStore();

  const onSubmit = async (data: SubmitRecipe) => {
    const postPromise = new Promise<void>((resolve, reject) => {
      postRecipe(data, {
        onSuccess: () => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: ["feed"] });
          setOpen(false);
          resolve(); // Resolve the promise when successful
        },
        onError: (error) => {
          reject(error); // Reject the promise if there's an error
        },
      });
    });

    toast.promise(postPromise, {
      loading: "Posting recipe...",
      success: "Recipe posted!",
      error: "Failed to post recipe.",
    });

    return postPromise;
  };

  const responsiveStyles = {
    input: "text-xs sm:text-sm px-2 sm:px-4",
    button: "px-1 mx-0 gap-0 w-full",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButtonLeft name="Post Recipe" icon={IconSquareRoundedPlus} />
      </DialogTrigger>
      <DialogContent
        className="overflow-y-auto w-5/6 max-h-[80vh] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar]:w-2 gap-2 rounded-xl overflow-x-hidden"
      >
        {status === "loading" || !session ? (
          <div className="flex flex-row gap-2 items-center justify-center py-3">
            <Image
              src={"/platebook-logo-500.png"}
              alt="Platebook Logo"
              width={100}
              height={100}
              className="size-5"
            />

            <p className="text-xs sm:text-sm lg:text-base">
              Login to Post Delicious Recipes!
            </p>
            <Button
              size="icon"
              variant="ghost"
              className="p-0 focus:bg-transparent m-0"
            >
              <SquareArrowOutUpRight className="size-4 text-primary" />
            </Button>
          </div>
        ) : (
          <>
            <DialogTitle className="text-center font-bold">
              Create Post
            </DialogTitle>
            <span className="border-b border-muted mb-2" />
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        placeholder="Enter title here..."
                        className={cn("py-5", responsiveStyles.input)}
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
                        className={cn("min-h-44", responsiveStyles.input)}
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
                {/*  Icomponent guro ni  */}
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
                                className={cn("", responsiveStyles.input)}
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
                                placeholder="Qty."
                                className={cn("", responsiveStyles.input)}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <ToolTipButton
                          btnChildren={
                            <Trash className="size-8 text-destructive" />
                          }
                          btnVariant="ghost"
                          btnSize="icon"
                          btnClassName={cn("", responsiveStyles.button)}
                          tipChildren={<p>Remove Ingredient</p>}
                          onClick={() => removeIngredient(index)}
                          disabled={ingredientFields.length === 1}
                        />
                        <ToolTipButton
                          btnChildren={
                            <IconSquareRoundedPlus className="size-8" />
                          }
                          btnVariant="ghost"
                          btnSize="icon"
                          btnClassName={cn("", responsiveStyles.button)}
                          tipChildren={<p>Add Ingredient</p>}
                          onClick={() =>
                            appendIngredient({ name: "", quantity: "" })
                          }
                        />
                      </div>
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
                                className={cn(
                                  "text-center px-0 sm:p-2",
                                  responsiveStyles.input
                                )}
                                value={index + 1}
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
                                className={cn("", responsiveStyles.input)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <ToolTipButton
                          btnChildren={
                            <Trash className="size-8 text-destructive" />
                          }
                          btnVariant="ghost"
                          btnSize="icon"
                          btnClassName={cn("", responsiveStyles.button)}
                          tipChildren={<p>Remove Step</p>}
                          onClick={() => removeStep(index)}
                          disabled={stepFields.length === 1}
                        />
                        <ToolTipButton
                          btnChildren={
                            <IconSquareRoundedPlus className="size-8" />
                          }
                          btnVariant="ghost"
                          btnSize="icon"
                          btnClassName={cn("", responsiveStyles.button)}
                          tipChildren={<p>Add Step</p>}
                          onClick={() => {
                            appendStep({
                              step_num: stepFields.length + 1,
                              description: "",
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full max-w-xl mx-auto min-h-32 border border-dashed bg-transparent border-secondary rounded-lg flex justify-center items-center">
                          <FileUpload
                            onFileChange={(files: (RecipeImage | File)[]) => {
                              console.log("Files received:", files);
                              const validFiles = files.filter(
                                (file) =>
                                  file instanceof File || file instanceof Blob
                              );
                              console.log("Valid files:", validFiles);
                              field.onChange(validFiles);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="w-full"
                            multiple
                            id="images"
                            type="file"
                            fileType="file"
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostRecipeDialog;
