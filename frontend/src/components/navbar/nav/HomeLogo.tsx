"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomeLogo = () => {
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      className="px-0 mx-0 hover:bg-opacity-0"
      onClick={() => router.push("/")}
    >
      <section className="flex font-black text-2xl">
        <h1 className="text-primary drop-shadow-sm">Plate</h1>
        <h1 className="drop-shadow-sm">Book</h1>
      </section>
    </Button>
  );
};

export default HomeLogo;
