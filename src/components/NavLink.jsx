"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className }) => {
  const pathName = usePathname();

  const isActive = href === pathName;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-white bg-[#0c2461] p-2 rounded-md" : ""} ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
