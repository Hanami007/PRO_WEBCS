"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { paths } from "@/config/paths";
import IntroductionVideo from "./introduction-video";

const Hero = () => {
  return (
    <div className="relative flex-center flex-col space-y-8 text-center bg-background text-foreground">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex-start justify-start flex-col">
            <h2>สาขาวิทยาการคอมพิวเตอร์</h2>
            <h2>คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้</h2>
          </div>
          <div className="flex-center flex-col max-w-4xl">
            <p className="text-xl text-muted-foreground">
              At CSMJU, Our undergraduate program equips students with the
              skills needed to thrive in a digital world.
            </p>
          </div>

          {/* Button Group */}
          <div className="flex-center space-x-2">
            <Button size={"lg"} asChild>
              <Link href={paths.admission.getHref()}>Apply Now</Link>
            </Button>
            <Button size={"lg"} variant="outline">
              View Program
            </Button>
          </div>
        </div>
        <div className="h-64 w-64 hidden lg:block bg-red-800">
          <IntroductionVideo />
        </div>
      </div>
    </div>
  );
};

export default Hero;
