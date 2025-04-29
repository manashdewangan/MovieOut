import React, { useState } from "react";
import { Link } from "react-router-dom";

// ================================================NAVBAR==============================================================

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Movies", to: "/movies" },
  { name: "Tv Shows", to: "/tvshows" },
  { name: "About", to: "/aboutus" },
];
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-transparent inset-x-0 z-50">
      <nav className="flex items-center justify-between lg:px-40 sm:px-10 sm:py-5 px-10 py-5 lg:py-5">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="text-3xl text-white font-bold">
            Movie<span className="text-red-600">Ot</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-base font-semibold leading-6 text-white hover:text-red-600 transition ease-in-out"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black opacity-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="logo"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={closeMobileMenu} // Close mobile menu on item click
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-white hover:bg-gray-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-white hover:bg-gray-500"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
export function Footer() {
  return (
    <div class="container mt-20 px-5 py-8 mx-auto flex items-center sm:flex-row flex-col bg-neutral-900">
      <div className="flex lg:flex-1">
        <Link to="/" className="">
          <span className="text-2xl pl-5 text-white font-bold">
            Movie<span className="text-red-600">Out</span>
          </span>
        </Link>
      </div>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        ©2025 Moviout —
        <a
          href="https://twitter.com/knyttneve"
          class="text-gray-600 ml-1"
          rel="noopener noreferrer"
          target="_blank"
        >
          @manashdewangan
        </a>
      </p>
    </div>
  );
}
