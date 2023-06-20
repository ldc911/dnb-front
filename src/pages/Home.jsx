/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Session from "../components/session/Session";
import RandomSpell from "../components/RandomSpell";
import ModalUpdatePwd from "../components/profil/user/ModalUpdatePwd";
import NotifUpdateUser from "../components/notifications/NotifUpdateUser";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDelete, setSessionDelete] = useState(true);
  const [sessionUpdate, setSessionUpdate] = useState(true);
  const [openModalChangePwd, setOpenModalChangePwd] = useState(false);
  const [showNotifUpdateUser, setShowNotifUpdateUser] = useState(false);

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

  const closeUpdateUserNotif = () => {
    setShowNotifUpdateUser(false);
  };

  const handleNotifUpdateUser = () => {
    setShowNotifUpdateUser(true);
    setTimeout(() => closeUpdateUserNotif(), 3000);
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
      <NotifUpdateUser
        showNotifUpdateUser={showNotifUpdateUser}
        setShowNotifUpdateUser={setShowNotifUpdateUser}
      />
      <ModalUpdatePwd
        openModalChangePwd={openModalChangePwd}
        setOpenModalChangePwd={setOpenModalChangePwd}
        handleNotifUpdateUser={handleNotifUpdateUser}
        handleCloseModalUpdatePwd={handleCloseModalUpdatePwd}
      />
      <div className=" flex flex-col p-3 md:flex-row md:flex-wrap md:items-start md:justify-start">
        <div className="hidden p-2 md:block overflow-hidden">
          <RandomSpell />
        </div>
        {session.filter((element) => {
          return dateTransform(element.dateSession) >= today;
        }).length === 0 ? (
          <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base ">
            <img
              src="https://cdn.midjourney.com/5455fa1b-bc1b-4285-8b32-110599f42944/grid_0.png"
              alt="No session"
            />
          </div>
        ) : (
          <ul className="md:flex md:flex-wrap">
            {session
              .filter((element) => {
                return dateTransform(element.dateSession) >= today;
              })
              .map((data, index) => (
                <li className="md:w-1/2 p-2" key={data.id}>
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
