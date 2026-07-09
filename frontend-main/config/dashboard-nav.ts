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
      title: "Dashboard",
      url: paths.dashboard.root.getHref(),
      icon: LayoutDashboard,
    },
    {
      title: "Go to Website",
      url: paths.home.getHref(),
      icon: Globe,
    },
  ],
  navMain: [
    {
      title: "Home",
      url: paths.dashboard.root.getHref(),
      icon: Home,
      items: [
        {
          title: "Carousels",
          url: paths.dashboard.carousels.getHref(),
        },
        {
          title: "Testimonials",
          url: paths.dashboard.testimonials.getHref(),
        },
        {
          title: "Announcements",
          url: paths.dashboard.announcements.getHref(),
        },
      ],
    },
    {
      title: "Articles",
      url: paths.dashboard.articles.getHref(),
      icon: Newspaper,
    },
    {
      title: "Events",
      url: paths.dashboard.events.getHref(),
      icon: CalendarDays,
    },
    {
      title: "About Us",
      url: paths.dashboard.abouts.getHref(),
      icon: Target,
    },
    {
      title: "Contacts",
      url: paths.dashboard.contacts.getHref(),
      icon: Contact,
    },
    {
      title: "Complains",
      url: paths.dashboard.complains.getHref(),
      icon: MessageSquare,
    },
    {
      title: "Resources",
      url: paths.dashboard.resources.getHref(),
      icon: Link,
    },
  ],
  navDepartment: [
    {
      title: "People",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Personnel",
          url: paths.dashboard.personnel.getHref(),
        },
        {
          title: "Alumni",
          url: paths.dashboard.alumnis.getHref(),
        },
      ],
    },
    {
      title: "Curriculum",
      url: "/dashboard/programs",
      icon: GraduationCap,
      items: [
        {
          title: "Programs",
          url: paths.dashboard.programs.getHref(),
        },
        {
          title: "Courses",
          url: paths.dashboard.courses.getHref(),
        },
      ],
    },
    {
      title: "Buildings",
      url: paths.dashboard.buildings.getHref(),
      icon: Library,
    },
    {
      title: "Rooms",
      url: paths.dashboard.rooms.getHref(),
      icon: Library,
    },
    {
      title: "Projects",
      url: paths.dashboard.research.getHref(),
      icon: Library,
    },
  ],
  navOther: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: paths.dashboard.settings.getHref(),
          icon: UserCog,
        },
        {
          title: "Account",
          url: paths.dashboard.settings.account.getHref(),
          icon: Wrench,
        },
        {
          title: "Appearance",
          url: paths.dashboard.settings.appearance.getHref(),
          icon: Palette,
        },
      ],
    },
  ],
};
