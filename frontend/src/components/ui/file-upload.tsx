import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Trash } from "lucide-react";
import { Button } from "./button";
import { RecipeImage } from "@/lib/types/recipeTypes";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onFileChange?: (files: (RecipeImage | File)[]) => void; // Custom onFileChange prop
  onFileRemove?: (file: RecipeImage | File) => void;
  initialFiles?: (RecipeImage | File)[];
  fileType?: "image" | "file";
  multiple?: boolean;
  forProfile?: boolean;
  forProfileMess?: string[];
}

export const FileUpload = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      onFileChange,
      onFileRemove,
      initialFiles = [],
      fileType,
      multiple = true,
      forProfile = false,
      forProfileMess = [],
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = useState<(RecipeImage | File)[]>(initialFiles);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (newFiles: (RecipeImage | File)[]) => {
      const filesArray = Array.isArray(newFiles) ? newFiles : [newFiles];

      if (!multiple) {
        setFiles(filesArray);
        onFileChange && onFileChange(filesArray);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      onFileChange && onFileChange([...files, ...filesArray]);

      console.log("Files:", files);
    };

    const handleRemoveFile = (fileToRemove: RecipeImage | File) => {
      const updatedFiles = files.filter((file) => file !== fileToRemove);
      setFiles(updatedFiles);
      onFileChange && onFileChange(updatedFiles);
      onFileRemove && onFileRemove(fileToRemove);
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
      multiple: multiple,
      noClick: true,
      onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
          id: undefined,
          image: file,
        }));
        handleFileChange(newFiles);
      },
      onDropRejected: (error) => {
        console.log(error);
      },
    });

    return (
      <div
        className="w-full max-w-xl flex items-center justify-center"
        {...getRootProps()}
      >
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-3 sm:p-5 lg:p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files || []).map((file) =>
                fileType === "image" ? { image: file } : file
              );
              handleFileChange(newFiles);
            }}
            className="hidden"
            accept="image/*"
            {...props}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-semibold text-neutral-700 dark:text-neutral-300 text-sm sm:text-base text-center">
              Upload file
            </p>
            <p className="relative z-20 text-xs sm:text-sm font-normal text-neutral-400 dark:text-neutral-400 mt-2 text-center">
              {forProfile
                ? forProfileMess[0]
                : "Drag or drop your files here or click to upload"}
            </p>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {files.length > 0 &&
                files.map((file, idx) => {
                  const fileURL =
                    fileType === "image" &&
                    "image" in file &&
                    (file as RecipeImage).image
                      ? URL.createObjectURL((file as RecipeImage).image as Blob)
                      : URL.createObjectURL(file as File);
                  const fileName =
                    fileType === "image" && "image" in file
                      ? (file as RecipeImage).image?.name
                      : (file as File).name;
                  const fileSize =
                    fileType === "image" && "image" in file
                      ? (
                          ((file as RecipeImage).image?.size ?? 0) /
                          (1024 * 1024)
                        ).toFixed(2)
                      : ((file as File).size / (1024 * 1024)).toFixed(2);
                  const fileTypeLabel =
                    fileType === "image" && "image" in file ? "Image" : "File";

                  return (
                    <motion.div
                      key={"file" + idx}
                      layoutId={
                        idx === 0 ? "file-upload" : "file-upload-" + idx
                      }
                      className={cn(
                        "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex items-center justify-between p-4 mt-4 w-full max-w-[200px] sm:max-w-xl mx-auto rounded-md",
                        "shadow-sm gap-3"
                      )}
                    >
                      <div className="flex flex-col gap-2 sm:gap-3 items-center mx-auto rounded-md relative overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="size-24 rounded-md shadow-md w-40 min-w-5 max-w-40 flex-[2] overflow-hidden"
                        >
                          <Image
                            src={fileURL}
                            alt={
                              fileType === "file"
                                ? (file as File).name
                                : (file as RecipeImage).image?.name || "image"
                            }
                            width={500}
                            height={500}
                            className="object-cover size-full aspect-[16/9]"
                            onLoad={() => URL.revokeObjectURL(fileURL)}
                          />
                        </motion.div>
                        <div className="flex flex-row justify-between gap-2 w-full">
                          <span className="w-full max-w-[150px] line-clamp-3">
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              layout
                              className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 truncate w-full"
                            >
                              {fileName}
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              layout
                              className="rounded-lg py-1 w-fit flex-shrink-0 text-xs sm:text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                            >
                              {fileSize} MB
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              layout
                              className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-400"
                            >
                              {fileTypeLabel}
                            </motion.p>
                          </span>
                          <Button
                            type="button"
                            size="icon"
                            variant={"ghost"}
                            onClick={() => handleRemoveFile(file)}
                          >
                            <Trash className="size-4 text-neutral-600 hover:text-destructive transition-colors duration-200 dark:text-neutral-400" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              {!files.length && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <AnimatePresence>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: [0, 0.25, 0.5, 1], duration: 0.2 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-neutral-600 flex flex-col items-center"
                      >
                        Drop it
                        <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                      </motion.p>
                    </AnimatePresence>
                  ) : (
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>
              )}

              {!files.length && (
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}

FileUpload.displayName = "FileUpload";
GridPattern.displayName = "GridPattern";
