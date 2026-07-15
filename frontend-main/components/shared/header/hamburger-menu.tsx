"use client";

import * as React from "react";
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { paths } from "@/config/paths";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

type MenuItem = {
  title: string;
  href?: string;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: "หน้าหลัก",
    submenu: [
      { title: "หน้าแรก", href: paths.home.getHref() },
      { title: "ข่าวสาร", href: paths.news.getHref() },
    ],
  },
  {
    title: "ภาควิชา",
    submenu: [
      { title: "เกี่ยวกับเรา", href: paths.department.about.getHref() },
      {
        title: "ห้องเรียนและอาคาร",
        href: paths.department.facility.getHref(),
      },
      { title: "บุคลากร", href: paths.department.personnels.getHref() },
      { title: "ศิษย์เก่า", href: paths.department.alumni.getHref() },
    ],
  },
  { title: "หลักสูตร", href: paths.programs.getHref() },
  { title: "โปรเจกต์", href: paths.projects.getHref() },
  { title: "ติดต่อเรา", href: paths.contact.getHref() },
  { title: "การรับสมัคร", href: paths.admission.getHref() },
  {
    title: "MIS",
    submenu: [
      { title: "ระบบแจ้งตกค้างรายวิชา", href: paths.mis.coursePending.getHref() },
      { title: "ระบบยืม-คืนครุภัณฑ์", href: paths.mis.equipmentBorrow.getHref() },
      { title: "ระบบแจ้งของพัง", href: paths.mis.repairRequest.getHref() },
    ],
  },
];

const MenuItemComponent: React.FC<{
  item: MenuItem;
  depth?: number;
  setOpen?: (open: boolean) => void;
}> = ({ item, depth = 0, setOpen }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const paddingLeft = depth > 0 ? `${(depth + 1) * 1.5}rem` : "1.5rem";

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between font-semibold py-7 h-auto hover:bg-muted/50 transition-colors rounded-none border-b border-muted/20",
              isOpen && "bg-muted/30",
            )}
            style={{ paddingLeft }}
          >
            <span className="text-lg">{item.title}</span>
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {item.submenu.map((subItem) => (
            <MenuItemComponent
              key={subItem.title}
              item={subItem}
              depth={depth + 1}
              setOpen={setOpen}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      onClick={() => setOpen?.(false)}
      className="block w-full"
    >
      <Button
        variant="ghost"
        className="w-full justify-start font-semibold py-7 h-auto hover:bg-muted/50 transition-colors rounded-none border-b border-muted/20"
        style={{ paddingLeft }}
      >
        <span className="text-lg">{item.title}</span>
      </Button>
    </Link>
  );
};

export default function HamburgerMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted rounded-full w-12 h-12"
        >
          <Menu className="h-8 w-8" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:w-[400px] p-0 flex flex-col bg-background lg:hidden"
      >
        <SheetHeader className="px-6 h-16 flex flex-row items-center justify-between border-b text-left">
          <SheetTitle className="text-xl font-bold tracking-tight">
            CSMJU
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted rounded-full w-12 h-12 -mr-2"
            >
              <X className="h-8 w-8" />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <MenuItemComponent
                key={item.title}
                item={item}
                setOpen={setOpen}
              />
            ))}
          </nav>
        </div>

        <div className="p-8 border-t bg-muted/10 mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <p className="font-bold text-lg">CSMJU</p>
            <p className="text-xs text-muted-foreground">
              วิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้
            </p>
          </div>
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
