/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PencilSquareIcon, PencilIcon } from "@heroicons/react/24/outline";
import Avatar from "../user/Avatar";
import DeletePerso from "./DeletePerso";
import Background from "./Background";
import HautsFaits from "./HautsFaits";
import ModalUpdatePerso from "./ModalUpdatePerso";
import ModaleUpdateAvatar from "../user/ModaleUpdateAvatar";
import { AuthContext } from "../../../contexts/AuthContext";

export default function PersoList({
  perso,
  persoDelete,
  setPersoDelete,
  handleNotifDeletePerso,
  persoUpdate,
  setPersoUpdate,
  handleNotifUpdatePerso,
}) {
  const { currentUserData } = useContext(AuthContext);
  const [openModalUpdatePerso, setOpenModalUpdatePerso] = useState(false);
  const [openModalAvatar, setOpenModalAvatar] = useState(false);
  const { id } = useParams();
  const expe = "persos";

  const handleClick = () => {
    setOpenModalUpdatePerso(true);
  };

  const handleCloseModalUpdatePerso = () => {
    setOpenModalUpdatePerso(false);
  };

  const handleClickPencil = () => {
    setOpenModalAvatar(true);
  };

  return (
    <div className=" bg-white rounded-md p-2 mb-2 shadow text-xs md:text-base ">
      {parseInt(id, 10) === currentUserData.id && (
        <div className="flex flex-row justify-end">
          <button type="button" onClick={handleClick}>
            <PencilSquareIcon className="w-4 h-4 text-red-700 hover:text-red-900 cursor-pointer" />
          </button>
          <DeletePerso
            data={perso}
            setPersoDelete={setPersoDelete}
            persoDelete={persoDelete}
            handleNotifDeletePerso={handleNotifDeletePerso}
          />
        </div>
      )}
      <ModalUpdatePerso
        persoUpdate={persoUpdate}
        openModalUpdatePerso={openModalUpdatePerso}
        setOpenModalUpdatePerso={setOpenModalUpdatePerso}
        setPersoUpdate={setPersoUpdate}
        handleNotifUpdatePerso={handleNotifUpdatePerso}
        handleCloseModalUpdatePerso={handleCloseModalUpdatePerso}
        data={perso}
      />
      <ModaleUpdateAvatar
        openModalAvatar={openModalAvatar}
        setOpenModalAvatar={setOpenModalAvatar}
        persoUpdate={persoUpdate}
        setPersoUpdate={setPersoUpdate}
        handleNotifUpdatePerso={handleNotifUpdatePerso}
        expe={expe}
        data={perso}
      />
      <div className="flex flex-col items-center ">
        <div className="md:h-40 md:w-40 h-32 w-32 mb-4 relative">
          <Avatar data={perso} />
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
        <div className="text-lg font-semibold">{`${perso.nickname} ${
          perso.lastname ? perso.lastname : ""
        }`}</div>
        <div className="w-full mb-4 md:pr-5 font-normal text-center md:text-right">
          {perso.species}
        </div>
        <div className="w-full mb-4 md:pr-5 font-medium text-center md:text-right">
          {perso.classe}
        </div>
        <div className="w-full text-left font-medium pl-2">Background</div>
        <div className="w-full text-sm md:texte:base md:justify-between mb-2 shadow">
          <Background data={perso} />
        </div>
        <div className="w-full text-left font-medium pl-2">Hauts faits</div>
        <div className="w-full text-sm md:texte:base md:justify-between mb-2 shadow">
          <HautsFaits data={perso} />
        </div>
      </div>
    </div>
  );
}
