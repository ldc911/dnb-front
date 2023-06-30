/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../contexts/AuthContext";
import UserList from "../components/profil/user/UserList";
import PersoList from "../components/profil/perso/PersoList";
import ModalCreationPerso from "../components/profil/perso/ModalCreationPerso";
import Notif from "../components/notifications/Notif";

export default function Home() {
  const [user, setUser] = useState();
  const [perso, setPerso] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPersoLoading, setIsPersoLoading] = useState(true);
  const [userUpdate, setUserUpdate] = useState(false);
  const [persoDelete, setPersoDelete] = useState(false);
  const [persoUpdate, setPersoUpdate] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [openModalCreatePerso, setOpenModalCreatePerso] = useState(false);
  const [notifPayload, setNotifPayload] = useState({});

  const { currentUserData } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
      .then((response) => {
        setIsLoading(false);
        setUser(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userUpdate, id]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/persos/${id}`)
      .then((response) => {
        setIsPersoLoading(false);
        setPerso(response.data);
      })
      .catch((err) => {
        return err.response.status === 404
          ? setPerso(null)
          : console.error(err);
      });
  }, [isLoading, persoDelete, persoUpdate]);

  const payloadCreate = {
    title: "Personnage créé avec succès !",
    content: "A lui l'aventure, les dangers et... LA MORT !",
  };

  const payloadDelete = {
    title: "Personnage supprimé avec succès",
    content: "Paix à som âme...",
  };

  const payloadUpdateUser = {
    title: "Utilisateur mis à jour avec succès",
    content: "Ca te convient maintenant ?",
  };

  const payloadUpdatePerso = {
    title: "Personnage mis à jour avec succès",
    content: "L'est tout beau maintenant",
  };

  const closeNotif = () => {
    setShowNotif(false);
  };

  const handleNotifDeletePerso = () => {
    setShowNotif(true);
    setNotifPayload(payloadDelete);
    setTimeout(() => closeNotif(), 3000);
  };

  const handleNotifUpdatePerso = () => {
    setShowNotif(true);
    setNotifPayload(payloadUpdatePerso);
    setTimeout(() => closeNotif(), 3000);
  };

  const handleNotifUpdateUser = () => {
    setNotifPayload(payloadUpdateUser);
    setShowNotif(true);
    setTimeout(() => closeNotif(), 3000);
  };

  const handleNotifCreatePerso = () => {
    setShowNotif(true);
    setNotifPayload(payloadCreate);
    setTimeout(() => closeNotif(), 3000);
  };

  const handleOpenModalCreation = () => {
    setOpenModalCreatePerso(true);
  };

  const handleCloseModalCreatePerso = () => {
    setOpenModalCreatePerso(false);
  };

  return isLoading ? (
    <div className=" h-full w-screen p-4">
      <div className="flex flex-col md:items-start md:flex-wrap md:justify-evenly md:flex-row justify-center items-center">
        <p>loading</p>
      </div>
    </div>
  ) : (
    <div className="h-full w-screen p-4">
      <Notif
        showNotif={showNotif}
        setShowNotif={setShowNotif}
        payload={notifPayload}
      />
      <ModalCreationPerso
        persoUpdate={persoUpdate}
        setPersoUpdate={setPersoUpdate}
        idAuthor={currentUserData.id}
        handleNotifCreatePerso={handleNotifCreatePerso}
        setOpenModalCreatePerso={setOpenModalCreatePerso}
        openModalCreatePerso={openModalCreatePerso}
        handleCloseModalCreatePerso={handleCloseModalCreatePerso}
      />
      <div className="  flex flex-col justify-center items-center">
        <UserList
          user={user}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
          handleNotifUpdateUser={handleNotifUpdateUser}
        />
        <div className=" w-full flex flex-col md:flex-row md:justify-between gap-2 text-xs md:max-w-[75vw] md:text-base ">
          {isPersoLoading || perso === null ? (
            <div className="w-full flex flex-row items-center justify-center leading-9 shadow bg-white rounded-md mb-2 relative">
              <p className=" text-center font-medium ">
                Personnages à ajouter !
              </p>
              {currentUserData.id === parseInt(id, 10) && (
                <button
                  type="button"
                  className="absolute right-4"
                  onClick={handleOpenModalCreation}
                >
                  <PlusCircleIcon className="h-8 w-8 text-red-800 hover:text-red-700" />
                </button>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex flex-row items-center justify-center leading-9 shadow bg-white rounded-md mb-2 relative">
                <p className=" text-center font-medium ">
                  {`Personnages de ${user.nickname}`}
                </p>
                <button
                  type="button"
                  className="absolute right-4"
                  onClick={handleOpenModalCreation}
                >
                  <PlusCircleIcon className="h-8 w-8  text-red-800 hover:text-red-700" />
                </button>
              </div>
              <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-2">
                {perso.map((element) => {
                  return (
                    <PersoList
                      perso={element}
                      setPersoDelete={setPersoDelete}
                      persoDelete={persoDelete}
                      handleNotifDeletePerso={handleNotifDeletePerso}
                      persoUpdate={persoUpdate}
                      setPersoUpdate={setPersoUpdate}
                      handleNotifUpdatePerso={handleNotifUpdatePerso}
                      key={element.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
