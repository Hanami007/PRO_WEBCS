import {
  CalendarDays,
  Contact,
  Globe,
  GraduationCap,
  Home,
  LayoutDashboard,
  Library,
  Link,
  MessageSquare,
  Newspaper,
  Palette,
  Settings,
  Target,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";
import { paths } from "./paths";

export const navData = {
  navShortcut: [
    {
      title: "แดชบอร์ด",
      url: paths.dashboard.root.getHref(),
      icon: LayoutDashboard,
    },
    {
      title: "ไปยังเว็บไซต์",
      url: paths.home.getHref(),
      icon: Globe,
    },
  ],
  navMain: [
    {
      title: "หน้าหลัก",
      url: paths.dashboard.root.getHref(),
      icon: Home,
      items: [
        {
          title: "สไลด์โชว",
          url: paths.dashboard.carousels.getHref(),
        },
        {
          title: "คำนิยม",
          url: paths.dashboard.testimonials.getHref(),
        },
        {
          title: "ประกาศ",
          url: paths.dashboard.announcements.getHref(),
        },
      ],
    },
    {
      title: "บทความ",
      url: paths.dashboard.articles.getHref(),
      icon: Newspaper,
    },
    {
      title: "กิจกรรม",
      url: paths.dashboard.events.getHref(),
      icon: CalendarDays,
    },
    {
      title: "เกี่ยวกับเรา",
      url: paths.dashboard.abouts.getHref(),
      icon: Target,
    },
    {
      title: "ติดต่อ",
      url: paths.dashboard.contacts.getHref(),
      icon: Contact,
    },
    {
      title: "คำร้องเรียน",
      url: paths.dashboard.complains.getHref(),
      icon: MessageSquare,
    },
    {
      title: "ทรัพยากร",
      url: paths.dashboard.resources.getHref(),
      icon: Link,
    },
  ],
  navDepartment: [
    {
      title: "บุคคล",
      url: "#",
      icon: Users,
      items: [
        {
          title: "บุคลากร",
          url: paths.dashboard.personnel.getHref(),
        },
        {
          title: "ศิษย์เก่า",
          url: paths.dashboard.alumnis.getHref(),
        },
      ],
    },
    {
      title: "หลักสูตร",
      url: "/dashboard/programs",
      icon: GraduationCap,
      items: [
        {
          title: "โปรแกรม",
          url: paths.dashboard.programs.getHref(),
        },
        {
          title: "รายวิชา",
          url: paths.dashboard.courses.getHref(),
        },
      ],
    },
    {
      title: "อาคาร",
      url: paths.dashboard.buildings.getHref(),
      icon: Library,
    },
    {
      title: "ห้อง",
      url: paths.dashboard.rooms.getHref(),
      icon: Library,
    },
    {
      title: "โปรเจกต์",
      url: paths.dashboard.research.getHref(),
      icon: Library,
    },
  ],
  navOther: [
    {
      title: "ตั้งค่า",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "โปรไฟล์",
          url: paths.dashboard.settings.getHref(),
          icon: UserCog,
        },
        {
          title: "บัญชี",
          url: paths.dashboard.settings.account.getHref(),
          icon: Wrench,
        },
        {
          title: "ธีมการแสดงผล",
          url: paths.dashboard.settings.appearance.getHref(),
          icon: Palette,
        },
      ],
    },
  ],
};
