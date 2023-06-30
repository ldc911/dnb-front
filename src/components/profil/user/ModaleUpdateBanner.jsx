/* eslint-disable react/prop-types */
import { Fragment, useRef, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ChangeBannerModal({
  openModalBanner,
  setOpenModalBanner,
  persoUpdate,
  setPersoUpdate,
  handleNotif,
  data,
  expe,
}) {
  const { currentUserData } = useContext(AuthContext);
  const inputRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const modifiedItem = { ...data };

  const { id } = useParams();

  function handleChange(event) {
    setImageName(event.target.files[0].name);
    setImageSrc(URL.createObjectURL(event.target.files[0]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("banPic", inputRef.current.files[0]);

    if (currentUserData.id === parseInt(id, 10)) {
      const file = inputRef.current.files[0];

      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      axios
        .post(import.meta.env.VITE_UPLOAD_ADDRESS, formData)
        .then((response) => {
          modifiedItem.banPic = response.data.secure_url;
          axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/${expe}/${data.id}`,
              {
                ...modifiedItem,
              },
              { headers: { currentuserid: currentUserData.id } }
            )
            .then(() => {
              handleNotif();
              setOpenModalBanner(false);
              setPersoUpdate(!persoUpdate);
            });
        });
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const cancelClick = () => {
    setOpenModalBanner(false);
    setImageName("");
    setImageSrc("");
  };
  return (
    <Transition.Root show={openModalBanner} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpenModalBanner}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
            <div className="lg:w-[500px] inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Changer la bannière
                  </Dialog.Title>
                  <div className="mt-6">
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                      <button
                        type="button"
                        className="relative overflow-hidden flex flex-col items-center w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                        onClick={handleButtonClick}
                      >
                        {imageName ? (
                          <img
                            src={imageSrc}
                            alt={imageName}
                            className="h-20 w-60 rounded-md"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mx-auto h-12 w-12 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        )}

                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          {imageName || "Choisir une image"}
                        </span>
                      </button>
                      <input
                        type="file"
                        name="monfichier"
                        className="relative hidden"
                        ref={inputRef}
                        onChange={handleChange}
                      />
                      <div className="mt-6 gap-3 flex flex-col sm:flex-row justify-end">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-3 focus:ring-red-700 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={cancelClick}
                          ref={cancelButtonRef}
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-800 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-offset-4 focus:ring-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpenModalBanner(false)}
                        >
                          Modifier la photo
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

ChangeBannerModal.propTypes = {
  openModalBanner: PropTypes.bool,
  setOpenModalBanner: PropTypes.func,
};

ChangeBannerModal.defaultProps = {
  openModalBanner: false,
  setOpenModalBanner: () => {},
};
