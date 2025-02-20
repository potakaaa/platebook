import FloatingNavbar from "@/components/navbar/FloatingNav";
import Navbar from "@/components/navbar/Navbar";
import AnimatedHover, { buttonType } from "@/components/ui/animated-hover";
import React from "react";

const buttons: buttonType[] = [
  {
    name: "Button 1",
    buttonClassName: "",
  },
  {
    name: "Button 2",
    buttonClassName: "",
  },
  {
    name: "Button 3",
    buttonClassName: "",
  },
];

const LandingPage = () => {
  return (
    <div className="w-full">
      <section className="absolute top-0 left-0 w-full">
        <Navbar />
        <div className="flex-grow" />{" "}
        {/* This ensures content can fill the space above */}
        <nav className="flex items-center justify-center h-[35rem] w-full">
          <FloatingNavbar />
          <AnimatedHover buttons={buttons} />
        </nav>
      </section>
    </div>
  );
};

export default LandingPage;
