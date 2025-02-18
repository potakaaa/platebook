import Navbar from "@/components/navbar/Navbar";
import { User2Icon } from "lucide-react";
import React from "react";

const LandingPage = () => {
  return (
    <div className="w-full">
      <section className="absolute top-0 left-0 w-full">
        <Navbar />
      </section>
    </div>
  );
};

export default LandingPage;
