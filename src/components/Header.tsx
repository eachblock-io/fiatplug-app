"use client";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import brandLogo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./NavItems";

const navList = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Features",
    path: "/features",
  },
  {
    id: 3,
    title: "About us",
    path: "/about",
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact",
  },
  {
    id: 5,
    title: "FAQ",
    path: "/faq",
  },
  {
    id: 5,
    title: "Log In",
    path: "/https://app.fiatplug.com/login",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      <header className="bg-white border-b-2 border-gray-300">
        <nav
          className="mx-auto flex container items-center justify-between py-6"
          aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Fiatplug</span>
              <Image
                className="sm:h-8 h-7 w-auto"
                src={brandLogo}
                alt="Fiatplug Logo"
                priority
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {navList?.map((link) => (
              <NavItem key={link.id} navItem={link} />
            ))}
          </Popover.Group>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Fiatplug</span>
                <Image
                  className="sm:h-8 h-7 w-auto"
                  src={brandLogo}
                  alt="Fiatplug Logo"
                  priority
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-6 pt-20">
                  {navList?.map((link) => (
                    <NavItem
                      key={link.id}
                      navItem={link}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
