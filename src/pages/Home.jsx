/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Session from "../components/session/Session";
import RandomSpell from "../components/RandomSpell";
import ModalUpdatePwd from "../components/profil/user/ModalUpdatePwd";
import Notif from "../components/notifications/Notif";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDelete, setSessionDelete] = useState(true);
  const [sessionUpdate, setSessionUpdate] = useState(true);
  const [openModalChangePwd, setOpenModalChangePwd] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const { currentUserData } = useContext(AuthContext);
  const { firstConnexion } = currentUserData;

  const location = useLocation();
  const queryString = location.search;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sessions`)
      .then((response) => {
        setIsLoading(false);
        setSession(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sessionDelete, sessionUpdate]);

  const handleCloseModalUpdatePwd = () => {
    setOpenModalChangePwd(false);
  };

  const closeNotif = () => {
    setShowNotif(false);
  };

  const handleNotif = () => {
    setShowNotif(true);
    setTimeout(() => closeNotif(), 3000);
  };

  const notifPayload = {
    title: "Mot de passe changé !",
    content:
      " Vous pouvez vous connecter avec votre email et votre nouveau mot de passe.",
  };

  useEffect(() => {
    if (firstConnexion && !isLoading) {
      setOpenModalChangePwd(true);
    }
  }, [isLoading]);

  const today = new Date();
  const dateTransform = (oneDate) => {
    const date = new Date(oneDate);
    return date;
  };
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="h-full flex flex-col">
      <Notif
        showNotif={showNotif}
        setShowNotif={setShowNotif}
        payload={notifPayload}
      />
      <ModalUpdatePwd
        openModalChangePwd={openModalChangePwd}
        setOpenModalChangePwd={setOpenModalChangePwd}
        handleNotifUpdateUser={handleNotif}
        handleCloseModalUpdatePwd={handleCloseModalUpdatePwd}
      />
      <div className=" flex flex-col p-3 md:flex-row md:flex-wrap md:items-start md:justify-start">
        <div className="hidden p-2 md:block overflow-hidden">
          <RandomSpell />
        </div>
        <div className=" w-full bg-white rounded-md p-4 mb-4 shadow text-xs md:hidden">
          <Disclosure>
            <Disclosure.Button className=" w-full px-2 flex flex-wrap justify-between content-center">
              <div className="align-center pt-1">Découvre un sort</div>
              <ChevronDownIcon className="w-6 h-6 pt-1 " />
            </Disclosure.Button>
            <Disclosure.Panel className="block overflow-hidden">
              <RandomSpell />
            </Disclosure.Panel>
          </Disclosure>
        </div>
        {session.filter((element) => {
          return dateTransform(element.dateSession) >= today;
        }).length === 0 ? (
          <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base ">
            <img
              src="https://cdn.midjourney.com/5455fa1b-bc1b-4285-8b32-110599f42944/grid_0.png"
              alt="No session"
              className="m-auto"
            />
          </div>
        ) : (
          <ul className="w-full md:grid md:grid-cols-2">
            {session
              .filter((element) => {
                return dateTransform(element.dateSession) >= today;
              })
              .map((data, index) => (
                <li className="md:w-full p-2" key={data.id}>
                  <Session
                    session={data}
                    query={queryString}
                    sessionDelete={sessionDelete}
                    setSessionDelete={setSessionDelete}
                    sessionUpdate={sessionUpdate}
                    setSessionUpdate={setSessionUpdate}
                    index={index}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
