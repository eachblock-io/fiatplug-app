"use client";
import classNames from "classnames";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ navItem, onClick }: any) => {
  const pathname = usePathname();

  const isCurrentRoute = pathname === navItem.path;

  const classes = classNames({
    "justify-start nav flex items-center gap-2": true,
    "transform transition ease-in-out duration-100": !isCurrentRoute,
    "navActive pb-1 border-b-4 border-[#F9A21B] ": isCurrentRoute,
  });
  return (
    <NextLink href={navItem.path} className={classes} onClick={onClick}>
      <span className="block text-sm font-semibold">{navItem.title}</span>
    </NextLink>
  );
};
const NavItemContainer = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex flex-col gap-3 mt-20">{children}</ul>
);

export { NavItem, NavItemContainer };
