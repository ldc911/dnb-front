/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../contexts/AuthContext";
import UserList from "../components/UserList";
import PersoList from "../components/PersoList";
import ModalCreationPerso from "../components/ModalCreationPerso";
import NotifDeletePerso from "../components/NotifDeletePerso";
import NotifUpdatePerso from "../components/NotifUpdatePerso";
import NotifCreationPerso from "../components/NotifCreationPerso";
import NotifUpdateUser from "../components/NotifUpdateUser";

export default function Home() {
  const [user, setUser] = useState();
  const [perso, setPerso] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPersoLoading, setIsPersoLoading] = useState(true);
  const [userUpdate, setUserUpdate] = useState(false);
  const [persoDelete, setPersoDelete] = useState(false);
  const [persoUpdate, setPersoUpdate] = useState(false);
  const [showNotifDeletePerso, setShowNotifDeletePerso] = useState(false);
  const [showNotifUpdatePerso, setShowNotifUpdatePerso] = useState(false);
  const [showNotifCreationPerso, setShowNotifCreationPerso] = useState(false);
  const [openModalCreatePerso, setOpenModalCreatePerso] = useState(false);
  const [showNotifUpdateUser, setShowNotifUpdateUser] = useState(false);

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
  }, [userUpdate]);

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

  const closeDeleteNotif = () => {
    setShowNotifDeletePerso(false);
  };

  const closeUpdatePersoNotif = () => {
    setShowNotifUpdatePerso(false);
  };

  const closeUpdateUserNotif = () => {
    setShowNotifUpdateUser(false);
  };

  const closeCreationPersoNotif = () => {
    setShowNotifCreationPerso(false);
  };

  const handleNotifDeletePerso = () => {
    setShowNotifDeletePerso(true);
    setTimeout(() => closeDeleteNotif(), 3000);
  };

  const handleNotifUpdatePerso = () => {
    setShowNotifUpdatePerso(true);
    setTimeout(() => closeUpdatePersoNotif(), 3000);
  };

  const handleNotifUpdateUser = () => {
    setShowNotifUpdateUser(true);
    setTimeout(() => closeUpdateUserNotif(), 3000);
  };

  const handleNotifCreatePerso = () => {
    setShowNotifCreationPerso(true);
    setTimeout(() => closeCreationPersoNotif(), 3000);
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
    <div className=" h-full w-screen p-4">
      <NotifDeletePerso
        showNotif={showNotifDeletePerso}
        setShowNotif={setShowNotifDeletePerso}
      />
      <NotifUpdatePerso
        showNotifUpdate={showNotifUpdatePerso}
        setShowNotifUpdate={setShowNotifUpdatePerso}
      />
      <NotifCreationPerso
        showNotifCreation={showNotifCreationPerso}
        setShowNotifCreation={setShowNotifCreationPerso}
      />
      <NotifUpdateUser
        showNotifUpdateUser={showNotifUpdateUser}
        setShowNotifUpdateUser={setShowNotifUpdateUser}
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
