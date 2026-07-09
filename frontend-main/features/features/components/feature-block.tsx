"use client";

import Image from "next/image";
import { Activity, DraftingCompass, Mail, Zap, ZapIcon } from "lucide-react";
import { Feature } from "../types/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardDecorator } from "@/components/ui/card-pattern";

export const FeatureBlock = () => {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-384 px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <h2 className="text-4xl font-semibold lg:text-5xl">
                Built for Scaling teams
              </h2>
              <p className="mt-6">
                Orrupti aut temporibus assumenda atque ab, accusamus sit,
                molestiae veniam laboriosam pariatur.
              </p>
            </div>
            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
              <li>
                <Mail className="size-5" />
                Email and web support
              </li>
              <li>
                <Zap className="size-5" />
                Fast response time
              </li>
              <li>
                <Activity className="size-5" />
                Menitoring and analytics
              </li>
              <li>
                <DraftingCompass className="size-5" />
                Architectural review
              </li>
            </ul>
          </div>
          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="aspect-76/59 relative rounded-2xl  to-transparent p-px">
              <Image
                src="/payments.png"
                className="hidden rounded-[15px] dark:block"
                alt="payments illustration dark"
                width={1207}
                height={929}
              />
              <Image
                src="/payments-light.png"
                className="rounded-[15px] shadow dark:hidden"
                alt="payments illustration light"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type FeatureBlockKeysProps = {
  keys: Feature[];
};

export const FeatureBlockKeys = ({ keys }: FeatureBlockKeysProps) => {
  return (
    <section className="py-16 md:py-32 ">
      <div className="mx-auto max-w-384 px-6">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold lg:text-5xl">
            Your Future in Computing
          </h2>
          <p>
            Master the essential disciplines of CS through a rigorous program
            covering everything from web architecture to artificial
            intelligence.
          </p>
        </div>
        <div className="lg:max-w-4xl lg:grid-cols-2 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {keys.map((key) => (
            <Card className="group shadow-zinc-950/5" key={key.id}>
              <CardHeader className="pb-3">
                <CardDecorator>
                  <ZapIcon />
                </CardDecorator>
                <h3 className="mt-6 font-medium">{key.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{key.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

type FeatureBlockStatsProps = {
  stats: Feature[];
};

export const FeatureBlockStats = ({ stats }: FeatureBlockStatsProps) => {
  if (!stats) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-384 space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">Our Passions</h2>
          <p>
            Our Computer Science program blends deep academic knowledge with
            hands-on experience empowering thousands of students to succeed in
            the digital world.
          </p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-4 md:gap-2 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div className="space-y-4" key={stat.id}>
              <div className="text-5xl font-bold">{stat.value}</div>
              <p className="text-balance">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
