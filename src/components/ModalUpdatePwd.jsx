/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { Fragment, useRef, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import UpdatePwd from "./UpdatePwd";

const { VITE_BACKEND_URL } = import.meta.env;

function ModalUpdatePwd({
  openModalChangePwd,
  setOpenModalChangePwd,
  userUpdate,
  setUserUpdate,
  handleNotifUpdateUser,
  handleCloseModalUpdatePwd,
}) {
  const location = useLocation();
  const { currentUserData, setCurrentUserData } = useContext(AuthContext);
  const { id } = currentUserData;
  const cancelButtonRef = useRef(null);

  const updateFirstConnexion = () => {
    setCurrentUserData({ ...currentUserData, firstConnexion: 0 });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...currentUserData, firstConnexion: 0 })
    );
    axios.put(`${VITE_BACKEND_URL}/usersConnexion/${id}`, {
      firstConnexion: 0,
    });
  };

  const handleClose = () => {
    location.pathname === "/" && updateFirstConnexion();
    setOpenModalChangePwd(false);
  };
  return (
    <Transition.Root show={openModalChangePwd} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpenModalChangePwd}
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
                <UpdatePwd
                  setOpenModalChangePwd={setOpenModalChangePwd}
                  userUpdate={userUpdate}
                  setUserUpdate={setUserUpdate}
                  handleCloseModalUpdatePwd={handleCloseModalUpdatePwd}
                  handleNotifUpdateUser={handleNotifUpdateUser}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleClose}
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

export default ModalUpdatePwd;

ModalUpdatePwd.propTypes = {
  openModalChangePwd: PropTypes.bool,
  setOpenModalChangePwd: PropTypes.func,
};

ModalUpdatePwd.defaultProps = {
  openModalChangePwd: false,
  setOpenModalChangePwd: () => {},
};
