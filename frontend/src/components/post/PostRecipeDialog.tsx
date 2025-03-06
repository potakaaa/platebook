"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import NavButtonLeft from "../home/nav/NavButtonsLeft";
import {
  IconSquareRoundedArrowDown,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
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
import { Label } from "../ui/label";
import { InputAnimated } from "../ui/input-animated";
import { LabelInputContainer } from "../ui/label-input-container";
import { SubmitRecipe } from "@/lib/types/recipeTypes";
import { postRecipe } from "@/lib/services/api/recipeServices";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Trash } from "lucide-react";
import CountryCombobox from "./CountryCombobox";
import ToolTipButton from "../home/buttons/ToolTipButton";
import { FileUpload } from "../ui/file-upload";

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
    .nullable()
    .refine((files) => (files ? files.length > 0 : true), {
      message: "At least one image is required",
    }),
});

const PostRecipeDialog = () => {
  const form = useForm({
    resolver: zodResolver(postRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      origin_country: "",
      steps: [{ step_num: 1, description: "" }],
      ingredients: [{ name: "", quantity: "" }],
      images: null,
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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: SubmitRecipe) => {
    try {
      setLoading(true);
      const response = await postRecipe(data);

      if (response?.ok) {
        window.location.reload();
        setLoading(false);
        setOpen(false);
        alert("Posted successfully");
        console.log("hello");
        return form.reset();
      } else {
        let errorMessage = response?.error;

        try {
          const errorData = JSON.parse(response?.error);
          Object.keys(errorData).forEach((key) => {
            if (key in data) {
              form.setError(key as keyof SubmitRecipe, {
                type: "server",
                message: errorData[key][0],
              });
            }
          });

          if (errorData?.non_field_errors) {
            errorMessage = errorData.non_field_errors[0];
          }
        } catch {
          errorMessage = response?.error;
        }

        form.setError("root", { type: "server", message: errorMessage });
        setLoading(false);
      }
    } catch (err) {
      console.error("Error posting recipe:", err);
      form.setError("root", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButtonLeft name="Post Recipe" icon={IconSquareRoundedPlus} />
      </DialogTrigger>
      <DialogContent
        className="overflow-y-auto w-3/6 max-h-[80vh] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar]:w-2 gap-2"
      >
        <DialogTitle className="text-center font-bold">Create Post</DialogTitle>
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
                  setFormValue={form.setValue}
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

                  <ToolTipButton
                    btnChildren={<Trash className="size-8 text-destructive" />}
                    btnVariant="ghost"
                    btnSize="icon"
                    tipChildren={<p>Remove Ingredient</p>}
                    onClick={() => removeIngredient(index)}
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
                            value={index + 1}
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
                  <ToolTipButton
                    btnChildren={<Trash className="size-8 text-destructive" />}
                    btnVariant="ghost"
                    btnSize="icon"
                    tipChildren={<p>Remove Step</p>}
                    onClick={() => removeStep(index)}
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
                        onFileChange={(files: File[]) => field.onChange(files)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        multiple
                        id="images"
                        type="file"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <InputAnimated
              id="images"
              type="file"
              placeholder="A catchy images for your followers"
              multiple
              onChange={(e) =>
                field.onChange(e.target.files ? Array.from(e.target.files) : [])
              }
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            /> */}

            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostRecipeDialog;
