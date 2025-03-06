"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
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
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandList,
  CommandInput,
} from "../ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { useCountries } from "@/hooks/tanstack/countries/useCountries";
import { cn } from "@/lib/utils";

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

  const { countries: data, loading, error } = useCountries();
  const countries = data?.name?.common ? Object.values(data.name.common) : [];
  const onSubmit = async (data: SubmitRecipe) => {
    try {
      const response = await postRecipe(data);

      if (response?.ok) {
        window.location.reload();
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
    <Dialog>
      <DialogTrigger asChild>
        <NavButtonLeft name="Post Recipe" icon={IconSquareRoundedPlus} />
      </DialogTrigger>
      <DialogContent
        className="overflow-y-auto max-h-[80vh] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300
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
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? countries.find(
                                (country: string) => field.value === country
                              )?.country
                            : "Select country of origin..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Country not found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country: string, index: number) => (
                              <CommandItem
                                key={index}
                                value={country}
                                onSelect={(currentValue) => {
                                  form.setValue("origin_country", country);
                                }}
                              >
                                {country}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            {/*  Icomponent guro ni  */}
            <div>
              <h3>Ingredients</h3>
              {ingredientFields.map((ingredient, index) => (
                <div key={ingredient.id}>
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <LabelInputContainer>
                          <Label htmlFor={`ingredients.${index}.name`}>
                            Ingredient Name
                          </Label>
                          <FormControl>
                            <InputAnimated
                              id={`ingredients.${index}.name`}
                              type="text"
                              placeholder="Ingredient Name"
                              {...field}
                            />
                          </FormControl>
                        </LabelInputContainer>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <LabelInputContainer>
                          <Label htmlFor={`ingredients.${index}.quantity`}>
                            Quantity
                          </Label>
                          <FormControl>
                            <InputAnimated
                              id={`ingredients.${index}.quantity`}
                              type="text"
                              placeholder="Quantity"
                              {...field}
                            />
                          </FormControl>
                        </LabelInputContainer>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={() => removeIngredient(index)}>
                    Remove Ingredient
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendIngredient({ name: "", quantity: "" })}
              >
                Add Ingredient
              </Button>
            </div>

            <div>
              <h3>Steps</h3>
              {stepFields.map((step, index) => (
                <div key={step.id}>
                  <FormField
                    control={form.control}
                    name={`steps.${index}.step_num`}
                    render={({ field }) => (
                      <FormItem>
                        <LabelInputContainer>
                          <Label htmlFor={`steps.${index}.step_num`}>
                            Step Number
                          </Label>
                          <FormControl>
                            <InputAnimated
                              id={`steps.${index}.step_num`}
                              type="number"
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : 0
                                );
                              }}
                            />
                          </FormControl>
                        </LabelInputContainer>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`steps.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <LabelInputContainer>
                          <Label htmlFor={`steps.${index}.description`}>
                            Step Description
                          </Label>
                          <FormControl>
                            <InputAnimated
                              id={`steps.${index}.description`}
                              type="text"
                              placeholder="Step Description"
                              {...field}
                            />
                          </FormControl>
                        </LabelInputContainer>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={() => removeStep(index)}>
                    Remove Step
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  appendStep({
                    step_num: stepFields.length + 1,
                    description: "",
                  })
                }
              >
                Add Step
              </Button>
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <LabelInputContainer>
                    <Label htmlFor="images">images</Label>
                    <FormControl>
                      <InputAnimated
                        id="images"
                        type="file"
                        placeholder="A catchy images for your followers"
                        multiple
                        onChange={(e) =>
                          field.onChange(
                            e.target.files ? Array.from(e.target.files) : []
                          )
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                  </LabelInputContainer>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"> Submit </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostRecipeDialog;
