"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavButtonLeft from "../nav/NavButtonsLeft";
import { IconDisc } from "@tabler/icons-react";
import RightPlateList from "./RightPlateList";
import { ChevronRight } from "lucide-react";
import { usePlatelistDrawer } from "@/store/platelist/usePlatelist";

export function PlateListSidebarToggle() {
  const { open, setPlateOpen } = usePlatelistDrawer();

  return (
    <Sheet open={open} onOpenChange={setPlateOpen}>
      <SheetTrigger asChild className="hidden md:block">
        <NavButtonLeft
          name="Plate List"
          icon={IconDisc}
          parentCN="hidden md:flex lg:hidden"
        />
      </SheetTrigger>
      <SheetContent className="bg-card flex flex-col gap-5">
        <SheetHeader className="gap-0 space-y-1">
          <SheetTitle className="text-lg text-primary font-bold">
            Plate List
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm">
            Your Plate List is a collection of recipes you've saved to cook.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-hidden">
          <RightPlateList isMobile />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"default"}>
              Close <ChevronRight className="size-6" />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
