import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const ToolTipButton = ({
  btnVariant = "default",
  btnChildren,
  btnText = "Hover",
  btnSize = "sm",
  btnType = "button",
  btnClassName,
  tipChildren = btnText,
  tipClassName,
  onClick,
  disabled = false,
}: {
  btnVariant?: "default" | "outline" | "destructive" | "secondary" | "ghost";
  btnChildren?: ReactNode;
  btnClassName?: string;
  btnText?: string;
  btnType?: "button" | "submit" | "reset" | undefined;
  btnSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
  tipChildren?: ReactNode;
  tipClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <TooltipProvider disableHoverableContent delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type={btnType}
            variant={btnVariant}
            className={btnClassName}
            onClick={onClick}
            size={btnSize}
            disabled={disabled}
          >
            {btnChildren}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={cn("bg-foreground text-background", tipClassName)}
        >
          {tipChildren}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipButton;
