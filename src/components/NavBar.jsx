/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

export default function NavBar() {
  const location = useLocation().pathname;
  return (
    <>
      <div className="w-full h-10 md:bg-red-800 ">
        <div className="hidden md:h-full md:text-white md:flex flex-row items-center justify-center gap-12">
          {location !== "/" && (
            <div className="hover:font-semibold">
              <Link to="/" className=" hover:font-semibold">
                Accueil
              </Link>
            </div>
          )}
          {location !== "/create" && (
            <div className="hover:font-semibold">
              <Link to="/create" className=" hover:font-semibold">
                Créer une session
              </Link>
            </div>
          )}
          {location !== "/profile" && (
            <div className="hover:font-semibold">
              <Link to="/profile" className=" hover:font-semibold">
                Profils
              </Link>
            </div>
          )}
        </div>
        <Popover className="fixed top-0 left-0 p-3 md:hidden whitespace-nowrap">
          <Popover.Button>
            <Bars2Icon className="w-14 h-10 text-red-700" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10">
            <div className="flex flex-col bg-white rounded-md shadow-md px-1">
              {location !== "/" && (
                <Link
                  to="/"
                  className=" hover:font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Accueil
                </Link>
              )}
              {location !== "/create" && (
                <Link
                  to="/create"
                  className=" hover:font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Créer une session
                </Link>
              )}
              {location !== "/profile" && (
                <Link
                  to="/profile"
                  className=" hover:font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Profils
                </Link>
              )}
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      {location !== "/create" && (
        <Link to="/create">
          <PlusCircleIcon className="fixed bottom-3 right-3 w-20 h-20 text-red-800" />
        </Link>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
}
