/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ModalForgottenPassword({
  modalForgottenPassword,
  handleClose,
}) {
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/pwd`, { email })
      .then(() => {
        setError("");
        handleClose();
      })
      .catch((err) => {
        setError("Email inconnu");
        console.error(err);
      });
  };

  return (
    <Transition.Root show={modalForgottenPassword} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex flex-col items-start">
                  <div className="flex flex-row items-center">
                    <div className="mx-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-900"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-800"
                      >
                        Mot de passe oublié
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className={`mt-2 `}>
                    <p className="text-sm text-center text-gray-500">
                      Renseignez votre email de connexion afin de recevoir un
                      email de renouvellement de mot de passe.
                    </p>
                  </div>
                </div>
              </div>
              <form>
                <div className="w-full h-10 px-4 flex flex-col mb-1 md:justify-between items-center md:flex-row">
                  <div className="text-center md:pl-4">Email de connexion</div>

                  <div className=" bg-white border border-gray-300 rounded shadow-sm py-1 px-4 w-full md:w-1/2 focus:border-gray-500">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      autoComplete="email"
                      className="w-full text-center font-medium text-xs"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-center md:pr-5 text-red-800 font-medium mt-5 mb-5 md:mt-0 md:text-right">
                  {error}
                </p>
              </form>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-800 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Valider
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                  ref={cancelButtonRef}
                >
                  Annuler
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Un email avec un lien permettant de changer votre mot de passe vient
            de vous être envoyé. Pensez à vérifier vos spams !
          </p>
        </div>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleClose}
          ref={cancelButtonRef}
        >
          Ok
        </button>
      </Dialog>
    </Transition.Root>
  );
}
