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

export function PlateListSidebarToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild className="">
        <NavButtonLeft
          name="Plate List"
          icon={IconDisc}
          parentCN="flex lg:hidden"
        />
      </SheetTrigger>
      <SheetContent className="bg-card flex flex-col gap-5">
        <SheetHeader className="gap-0 space-y-1">
          <SheetTitle className="text-lg text-primary font-bold">
            Plate List
          </SheetTitle>
          <SheetDescription>
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
