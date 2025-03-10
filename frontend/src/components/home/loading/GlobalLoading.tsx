import { Loader } from "lucide-react";
import React from "react";

const GlobalLoading = () => {
  return (
    <div className="absolute flex w-full min-h-screen items-center justify-center bg-foreground/50 pointer-events-none z-50 overflow-hidden">
      <Loader className="animate-spin size-10 text-primary drop-shadow-md" />
    </div>
  );
};

export default GlobalLoading;
