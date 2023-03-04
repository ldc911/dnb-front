/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import Biography from "./Biography";
import { AuthContext } from "../contexts/AuthContext";
import ModaleUpdateAvatar from "./ModaleUpdateAvatar";
import ModaleUpdateBanner from "./ModaleUpdateBanner";
import ModalUpdateUser from "./ModalUpdateUser";

export default function UserList({
  user,
  userUpdate,
  setUserUpdate,
  handleNotifUpdateUser,
}) {
  const { nickname, banPic, isMJ } = user;
  const location = useLocation();
  const { currentUserData } = useContext(AuthContext);
  const expe = "users";
  const { id } = useParams();
  const [openModalAvatar, setOpenModalAvatar] = useState(false);
  const [openModalBanner, setOpenModalBanner] = useState(false);
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);

  const handleClickPencil = () => {
    setOpenModalAvatar(true);
  };

  const handleClickBanner = () => {
    setOpenModalBanner(true);
  };

  const handleClick = () => {
    setOpenModalUpdateUser(true);
  };
  return (
    <div className=" w-full h-[50vh] bg-white rounded-md p-2 mb-4 shadow text-xs md:w-[48vw]  md:text-base ">
      {parseInt(id, 10) === currentUserData.id && (
        <div className="flex flex-row justify-end">
          <button type="button" onClick={handleClick}>
            <PencilSquareIcon className="text-red-700 hover:text-red-900  w-4 h-4  cursor-pointer" />
          </button>
        </div>
      )}
      <ModalUpdateUser
        handleNotif={handleNotifUpdateUser}
        openModalUpdateUser={openModalUpdateUser}
        setOpenModalUpdateUser={setOpenModalUpdateUser}
        userUpdate={userUpdate}
        setUserUpdate={setUserUpdate}
        data={user}
      />
      <ModaleUpdateAvatar
        openModalAvatar={openModalAvatar}
        setOpenModalAvatar={setOpenModalAvatar}
        persoUpdate={userUpdate}
        setPersoUpdate={setUserUpdate}
        handleNotif={handleNotifUpdateUser}
        expe={expe}
        data={user}
      />
      <ModaleUpdateBanner
        openModalBanner={openModalBanner}
        setOpenModalBanner={setOpenModalBanner}
        persoUpdate={userUpdate}
        setPersoUpdate={setUserUpdate}
        handleNotif={handleNotifUpdateUser}
        expe={expe}
        data={user}
      />

      <div className="flex h-1/3 flex-col mb-10 ">
        <div className="flex h-full flex-col items-center justify-start relative">
          <div className="flex flex-row overflow-hidden mb-2 shadow-md rounded-md items-center">
            <img className="-z-0" src={banPic} alt="bannière" />
            {currentUserData.id === parseInt(id, 10) && (
              <button
                type="button"
                className="absolute p-1.5 top-2 right-2 bg-white md:p-2 rounded-lg shadow hover:bg-slate-50"
                onClick={handleClickBanner}
              >
                <PencilIcon className="w-4 h-4 text-red-800 hover:text-red-700" />
              </button>
            )}
          </div>

          <div className="md:h-40 md:w-40 h-32 w-32 absolute -bottom-3 md:-bottom-10">
            {location.pathname === "/profile" ? (
              <Link to={`/profile/${user.id}`}>
                <Avatar data={user} />
              </Link>
            ) : (
              <div>
                <Avatar data={user} />
                {currentUserData.id === parseInt(id, 10) && (
                  <button
                    type="button"
                    className="absolute p-1.5 top-2 right-2 bg-white md:p-2 rounded-lg shadow hover:bg-slate-50"
                    onClick={handleClickPencil}
                  >
                    <PencilIcon className="w-4 h-4 text-red-800 hover:text-red-700" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-4 text-lg font-bold">
        <div className="w-full font-semibold text-xl text-center">
          {nickname}
        </div>
        <div className="text-center text-sm font-semibold mb-3">
          {isMJ ? "Joueur/Dungeon Master" : "Joueur"}
        </div>
        <div className="w-full font-medium text-sm md:text-base text-center break-words md:justify-between mb-2 shadow h-44">
          <Biography data={user} />
        </div>
      </div>
    </div>
  );
}
