/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment, useContext, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Popover, Menu, Transition } from "@headlessui/react";
import { Bars2Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../contexts/AuthContext";
import getRandomColor from "../utils/getRandomColor";
import DisconnectModal from "./profil/user/DisconnectModal";

export default function NavBar() {
  const [openModalDisconnect, setOpenModalDisconnect] = useState(false);
  const handleClick = () => {
    setOpenModalDisconnect(true);
  };
  const location = useLocation().pathname;
  const { currentUserData } = useContext(AuthContext);
  return (
    <>
      <DisconnectModal
        openModalDisconnect={openModalDisconnect}
        setOpenModalDisconnect={setOpenModalDisconnect}
      />
      <div className="w-full h-11 md:bg-red-800 relative z-50">
        <div className="h-5/6 md:h-full md:text-white md:flex md:flex-row md:items-center md:justify-center md:gap-12 relative">
          {location !== "/" && (
            <div className="hidden md:block md:hover:font-semibold">
              <Link to="/" className=" hover:font-semibold">
                Accueil
              </Link>
            </div>
          )}
          {location !== "/create" && (
            <div className="hidden md:block md:hover:font-semibold">
              <Link to="/create" className=" hover:font-semibold">
                Créer une session
              </Link>
            </div>
          )}
          {location !== "/profile" && (
            <div className="hidden md:block md:hover:font-semibold">
              <Link to="/profile" className=" hover:font-semibold">
                Profils
              </Link>
            </div>
          )}
          <Menu
            as="div"
            className="absolute flex-shrink-0 top-2 md:top-1 right-2 ml-5"
          >
            <div>
              <Menu.Button className="w-fit items-center py-0.5 px-1.5 rounded-full flex">
                <span className="sr-only">Open user menu</span>
                <div className="w-full flex justify-between items-center gap-2">
                  {currentUserData.avatar ? (
                    <img
                      className="h-9 w-9 shrink-0 rounded-full"
                      src={currentUserData.avatar}
                      alt=""
                    />
                  ) : (
                    <div
                      className={`h-9 w-9 shrink-0 rounded-full overflow-hidden ${getRandomColor()} flex justify-center items-center text-2xl text-white font-medium`}
                    >
                      {`${currentUserData.nickname.charAt(0)}`}
                    </div>
                  )}
                  <div className="hidden md:flex md:flex-row md:items-right md:gap-1">
                    <p>{currentUserData.nickname}</p>
                    <ChevronDownIcon className="w-6 h-6 pt-1 " />
                  </div>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Item>
                <div className="bg-white rounded-md shadow-sm absolute mt-1 right-2">
                  <div className="hover:font-semibold">
                    <Link
                      to={`/profile/${currentUserData.id}`}
                      className=" hover:font-semibold text-gray-900 text-sm pl-2"
                    >
                      Mon profil
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="block py-2 px-4 w-full text-center text-sm text-red-600 border-t hover:text-red-900"
                  >
                    Déconnexion
                  </button>
                </div>
              </Menu.Item>
            </Transition>
          </Menu>
        </div>

        <Popover className="absolute top-0 left-0 p-3 md:hidden whitespace-nowrap z-10">
          <Popover.Button>
            <Bars2Icon className="w-14 h-10 text-red-700" />
          </Popover.Button>

          <Popover.Panel className="absolute">
            <div className="flex flex-col bg-white rounded-md shadow-md px-1 pt-1">
              {location !== "/" && (
                <Link
                  to="/"
                  className="hover:font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <p className="pl-1 mb-2">Accueil</p>
                </Link>
              )}
              {location !== "/create" && (
                <Link
                  to="/create"
                  className="hover:font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <p className="pl-1 mb-2">Créer une session</p>
                </Link>
              )}
              {location !== "/profile" && (
                <Link
                  to="/profile"
                  className="hover:font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <p className="pl-1 mb-2">Profils</p>
                </Link>
              )}
              <div className="border-separate">
                <button
                  type="button"
                  onClick={handleClick}
                  className="block py-2 px-10 w-full text-center text-sm text-red-600 border-t hover:text-red-900"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      {location === "/" && (
        <Link to="/create">
          <PlusCircleIcon className="fixed z-50 bottom-3 right-3 w-20 h-20 text-red-800 opacity-40 hover:opacity-100" />
        </Link>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
}
