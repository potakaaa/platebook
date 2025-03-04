import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import React from 'react'

interface ShareButtonProps {
    isShared?: boolean;
    forHero?: boolean;
    }

const ShareButton:React.FC<ShareButtonProps> = ({isShared, forHero}) => {
  return (
    <div>
      <Button variant={"ghost"} className="">
        <Share
          className={`size-8 ${isShared ? "stroke-primary" : "fill-none"}`}
        />
        <span
          className={`hidden xl:block ${
            !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
          } ${isShared ? "text-primary" : ""}`}
        >
          Share{isShared ? "d" : ""}
        </span>
      </Button>
    </div>
  );
}

export default ShareButton