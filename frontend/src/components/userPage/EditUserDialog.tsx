"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
import ToolTipButton from "../home/buttons/ToolTipButton";
import { FileUpload } from "../ui/file-upload";
import useMutationRecipe from "@/hooks/tanstack/recipe/useMutationRecipe";
import { useQueryClient } from "@tanstack/react-query";
import EditButton from "./EditButton";
import { urlToFile } from "@/lib/utils/urlToFile";
import { profile } from "console";


const editUserSchema = z.object({
  username: z.string().nonempty(),
  pfp: z.instanceof(File),
  password1: z.string().nonempty(),
  password2: z.string().nonempty(),
});

interface EditUserDialogProps {
  user: any
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user }) => {
  const { useMutationEditRecipe } = useMutationRecipe();
  const { mutate: editRecipe, isPending } = useMutationEditRecipe();

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
        username: user.username,

        password1: "",
      
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = form.handleSubmit((data) => {

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
        <DialogTitle className="text-center font-bold">Edit Profile</DialogTitle>
        <span className="border-b border-muted mb-2" />
        <Form {...form}>
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="pfp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full max-w-xl mx-auto min-h-32 border border-dashed bg-transparent border-secondary rounded-lg">
                      <FileUpload
                        multiple={false}
                        initialFiles={
                          Array.isArray(field.value) ? field.value : []
                        }
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
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Enter username here..."
                    className="py-5"
                    id="username"
                    type="text"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password1"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Enter password1 here..."
                    className="py-5"
                    id="password1"
                    type="password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="Enter password2 here..."
                    className="py-5"
                    id="password2"
                    type="password"
                    {...field}
                  />
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

export default EditUserDialog;
