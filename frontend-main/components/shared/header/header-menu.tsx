"use client";

import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { paths } from "@/config/paths";

const departments: { title: string; href: string; description: string }[] = [
  {
    title: "เกี่ยวกับเรา",
    href: paths.department.about.getHref(),
    description: "",
  },
  {
    title: "ห้องเรียนและอาคาร",
    href: paths.department.facility.getHref(),
    description: "",
  },
  {
    title: "บุคลากร",
    href: paths.department.personnels.getHref(),
    description: "",
  },
  {
    title: "ศิษย์เก่า",
    href: paths.department.alumni.getHref(),
    description: "",
  },
];

const HeaderMenu = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.news.getHref()}>ข่าวสาร</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>ภาควิชา</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              {departments.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.programs.getHref()}>หลักสูตร</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.projects.getHref()}>โปรเจกต์</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={paths.contact.getHref()}>ติดต่อเรา</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default HeaderMenu;
