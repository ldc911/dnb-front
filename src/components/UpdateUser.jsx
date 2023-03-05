/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import axios from "axios";
import ModalUpdatePwd from "./ModalUpdatePwd";
import NotifUpdateUser from "./NotifUpdateUser";

const { VITE_BACKEND_URL } = import.meta.env;

export default function UpdateUser({
  data,
  setUserUpdate,
  userUpdate,
  setOpenModalUpdateUser,
  handleNotifUpdateUser,
}) {
  const [showNotifUpdateUser, setShowNotifUpdateUser] = useState(false);
  const [openModalChangePwd, setOpenModalChangePwd] = useState(false);
  const [user, setUser] = useState({
    nickname: data.nickname || null,
    email: data.email || null,
    bio: data.bio || null,
  });
  const handleCloseModalUpdatePwd = () => {
    setOpenModalChangePwd(false);
  };

  const handleChangeNickname = (event) => {
    setUser({ ...user, nickname: event.target.value });
  };

  const handleChangeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const handleChangeBio = (event) => {
    setUser({ ...user, bio: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${VITE_BACKEND_URL}/users/${data.id}`,
        {
          nickname: user.nickname || "null",
          email: user.email || "null",
          bio: user.bio || "null",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function handleResponse() {
        setUserUpdate(!userUpdate);
        setOpenModalUpdateUser(false);
        handleNotifUpdateUser();
      });
  };

  const handleOpenChangePwd = () => {
    setOpenModalChangePwd(true);
  };

  const closeUpdateUserNotif = () => {
    setShowNotifUpdateUser(false);
  };
  const handleNewNotifUpdateUser = () => {
    setShowNotifUpdateUser(true);
    setTimeout(() => closeUpdateUserNotif(), 3000);
  };

  return (
    <>
      <NotifUpdateUser
        showNotifUpdateUser={showNotifUpdateUser}
        setShowNotifUpdateUser={setShowNotifUpdateUser}
      />
      <ModalUpdatePwd
        openModalChangePwd={openModalChangePwd}
        setOpenModalChangePwd={setOpenModalChangePwd}
        handleNotifUpdateUser={handleNewNotifUpdateUser}
        handleCloseModalUpdatePwd={handleCloseModalUpdatePwd}
      />
      <form onSubmit={handleSubmit}>
        <div className=" w-full h-full bg-white rounded-md py-6 px-2 shadow text-xs md:text-base flex flex-col items-center relative">
          <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Prénom / surnom</div>
            <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 focus:border-gray-500">
              <input
                type="text"
                value={user.nickname}
                onChange={handleChangeNickname}
                placeholder="Prénom ou surnom"
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Email de connexion</div>
            <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2">
              <input
                type="text"
                value={user.email || ""}
                onChange={handleChangeEmail}
                placeholder="Email"
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full h-10 mb-16 px-4 flex flex-row justify-between items-start">
            <div className="text-center">Notes diverses</div>
            <div className=" border border-gray-300 rounded shadow-sm  pl-2 pr-2 py-1 w-1/2 ">
              <textarea
                name=""
                id=""
                rows="5"
                className="w-full border-slate-300 rounded text-center"
                value={user.bio || ""}
                onChange={handleChangeBio}
              />
            </div>
          </div>
          <button
            type="submit"
            className="absolute left-6 bottom-14 py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Valider !
          </button>
          <button
            type="button"
            onClick={handleOpenChangePwd}
            className="absolute left-6 bottom-2 py-2 px-4 border border-slate-50 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-50"
          >
            Changer le mot de passe
          </button>
        </div>
      </form>
    </>
  );
}
