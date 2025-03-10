"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCoffee } from "@/store/coffee/useCoffee";
import { Button } from "../ui/button";
import { CreditCard, RussianRuble, RussianRubleIcon } from "lucide-react";
import Link from "next/link";

const BuyCoffeeDialog = () => {
  const { isCoffeeOpen, setIsCoffeeOpen } = useCoffee();

  const email = "platebook123@gmail.com";
  const subject = encodeURIComponent("Support Request - Buy You a Coffee");
  const body = encodeURIComponent(
    "Hey! I'd love to support your work. Let's chat!"
  );

  return (
    <Dialog open={isCoffeeOpen} onOpenChange={setIsCoffeeOpen}>
      <DialogContent className="w-[320px] sm:w-full rounded-xl p-5 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-base">
            Wanna Buy us Coffee?
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            A coffee a day keeps a developer awake...
          </DialogDescription>
        </DialogHeader>
        <span className="border-b border border-muted" />
        <div className="flex flex-col px-0 sm:px-3 gap-2 w-full">
          <h1 className="font-semibold text-sm sm:text-base">
            💡 Support{" "}
            <strong className="text-primary drop-shadow">Platebook</strong> with
            a Coffee!
          </h1>
          <h3 className="text-xs sm:text-sm">
            Hey there! If you enjoy Platebook and want to show some love,
            consider buying us a coffee. Your support helps keep this site
            running and fuels my creativity! ☕
          </h3>
          <span className="flex flex-col mt-3 gap-2">
            <h1 className="text-sm font-semibold">💸 Where to send?</h1>
            <ul className="flex flex-col gap-2">
              <li className="flex flex-row items-center gap-2">
                <RussianRubleIcon className="size-5 sm:size-8 p-1 bg-background text-primary shadow-md rounded-full" />
                <p className="text-xs sm:text-sm">Gcash: 09365625994</p>
              </li>
              <li className="flex flex-row items-center gap-2">
                <CreditCard className="size-5 sm:size-8 p-1 bg-background text-primary shadow-md rounded-full" />
                <p className="text-xs sm:text-sm">Gotyme: 4601860028528034</p>
              </li>
              <li className="flex flex-row items-center gap-2">
                <CreditCard className="size-5 sm:size-8 p-1 bg-background text-primary shadow-md rounded-full" />
                <p className="text-xs sm:text-sm">Seabank: 5294162910242504</p>
              </li>
            </ul>
          </span>
          <span className="my-3 flex items-center justify-center">
            <Link href={`mailto:${email}?subject=${subject}&body=${body}`}>
              <Button variant="ghost" className="text-xs sm:text-sm">
                📩 Don't forget to drop by and say hello!
              </Button>
            </Link>
          </span>
        </div>
        <DialogClose asChild className="w-full">
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default BuyCoffeeDialog;
