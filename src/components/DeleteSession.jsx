/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import ModalConfirm from "./ModalConfirm";
import classNames from "./utils/classNames";

export default function DeleteSession({
  data,
  query,
  sessionDelete,
  setSessionDelete,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClick = () => {
    setShowDeleteModal(true);
  };
  const handleClose = () => {
    setShowDeleteModal(false);
    setSessionDelete(!sessionDelete);
  };

  return (
    <div>
      <ModalConfirm
        showDeleteModal={showDeleteModal}
        handleClose={handleClose}
        data={data}
        query={query}
      />
      <Menu as="div" className="flex-shrink-0 relative inline-block text-left">
        <Menu.Button className="group relative w-8 h-8 bg-white rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open options menu</span>
          <span className="flex items-center justify-center h-full w-full rounded-full">
            <EllipsisVerticalIcon
              className="w-6 h-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute z-10 top-0 right-9 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={handleClick}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm cursor-pointer w-full text-red-600"
                    )}
                  >
                    Supprimer
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
