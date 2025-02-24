import React from "react";
import Image from "next/image";

const SideImage = () => {
  return (
    <div className="relative hidden bg-muted md:block">
      <Image
        src="/login-cover3.webp"
        width={500}
        height={700}
        alt="Filipino Adobo"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:contrast-[0.8] dark:grayscale-[0.9]"
      />
    </div>
  );
};

export default SideImage;
