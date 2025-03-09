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
import useMutationAuth from "@/hooks/tanstack/auth/useMutationAuth";
import { EditUserFormData } from "@/lib/types/authTypes";


const editUserSchema = z.object({
  username: z.string().nonempty(),
  pfp: z.array(z.instanceof(File))
});

interface EditUserDialogProps {
  user: any
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user }) => {
  const { useMutationUpdateUser } = useMutationAuth();
  const { mutate: updateUser, isPending } = useMutationUpdateUser();

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
        username: user.username,
        pfp: [],
    },
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {

    console.log("user: ", user);

    const processImages = async () => {
      if (user.pfp_url) {

        const pfpFile = await urlToFile(user.pfp_url, `${user.username || "profile_picture"}.jpg`);
        console.log("PFP FILE: ", pfpFile);
        form.setValue("pfp", [pfpFile]); 

        console.log("FORM: ", form.getValues());
      }
    };
  
    processImages();
  }, [user.pfp_url, form]);  
  

  const onSubmit = form.handleSubmit((data) => {
    const formData: EditUserFormData = {
      username: data.username,
      pfp: data.pfp[0], 
    };
    updateUser({ id: user.userId, data: formData }, {onSuccess: () => setOpen(false)});
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
                        initialFiles={field.value ? field.value :  []}  // Ensure initialFiles is always an array
                        onFileChange={(files: (File | RecipeImage)[]) => {
                          const file = files[0];  // Just take the first file when `multiple` is false
                          field.onChange(file);    // Pass the single file directly to field.onChange
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        id="pfp"
                        type="file"
                        fileType="file"
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
