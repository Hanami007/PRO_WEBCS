"use client";

import Link from "next/link";
import { LogoImage } from "@/components/logo";
import { paths } from "@/config/paths";
import { useResourceByKey } from "@/features/resources/api/get-resource-by-key";

const links = [
  {
    title: "ข่าวสาร",
    href: paths.news.getHref(),
  },
  {
    title: "หลักสูตร",
    href: paths.programs.getHref(),
  },
  {
    title: "โปรเจกต์",
    href: paths.projects.getHref(),
  },
  {
    title: "ศิษย์เก่า",
    href: paths.department.alumni.getHref(),
  },
  {
    title: "สิ่งอำนวยความสะดวก",
    href: paths.department.facility.getHref(),
  },
  {
    title: "ติดต่อเรา",
    href: paths.contact.getHref(),
  },
  {
    title: "เกี่ยวกับเรา",
    href: paths.department.about.getHref(),
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const youtubeQuery = useResourceByKey({ resourceKey: "youtube_link" });
  const lineQuery = useResourceByKey({ resourceKey: "line_link" });
  const fbQuery = useResourceByKey({ resourceKey: "facebook_link" });

  const youtube =
    youtubeQuery.data?.value || "https://www.youtube.com/user/comscimaejo";
  const facebook =
    lineQuery.data?.value || "https://www.facebook.com/computersciencemju";
  const line = fbQuery.data?.value || "https://line.me/R/ti/p/%40053vfccm";

  return (
    <footer className="py-16 md:py-32 border-t">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <LogoImage className="h-24 w-24" />
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href={youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Youtube"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              ></path>
            </svg>
          </Link>
          <Link
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
              ></path>
            </svg>
          </Link>
          <Link
            href={line}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Line"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
              ></path>
            </svg>
          </Link>
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {currentYear} วิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้
        </span>
      </div>
    </footer>
  );
}

export default Footer;
