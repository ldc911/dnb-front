/* eslint-disable react/prop-types */
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import UpdateUser from "./UpdateUser";

function ModalUpdateUser({
  openModalUpdateUser,
  setOpenModalUpdateUser,
  userUpdate,
  setUserUpdate,
  handleNotifUpdateUser,
  handleCloseModalUpdateUser,
  data,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={openModalUpdateUser} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpenModalUpdateUser}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-60 backdrop-blur transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 max-w-5/6">
              <div className="sm:flex sm:items-start">
                <UpdateUser
                  data={data}
                  setOpenModalUpdateUser={setOpenModalUpdateUser}
                  userUpdate={userUpdate}
                  setUserUpdate={setUserUpdate}
                  handleCloseModalUpdateUser={handleCloseModalUpdateUser}
                  handleNotifUpdateUser={handleNotifUpdateUser}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpenModalUpdateUser(false)}
                  ref={cancelButtonRef}
                >
                  Retour
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalUpdateUser;

ModalUpdateUser.propTypes = {
  openModalUpdateUser: PropTypes.bool,
  setOpenModalUpdateUser: PropTypes.func,
};

ModalUpdateUser.defaultProps = {
  openModalUpdateUser: false,
  setOpenModalUpdateUser: () => {},
};
