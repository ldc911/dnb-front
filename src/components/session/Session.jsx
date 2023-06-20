/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ModalUpdateSession from "./ModalUpdateSession";

import DeleteSession from "./DeleteSession";

export default function SessionList({
  session,
  index,
  query,
  sessionDelete,
  setSessionDelete,
  sessionUpdate,
  setSessionUpdate,
}) {
  const {
    title,
    dateSession,
    duration,
    localisation,
    isCampaign,
    user_meal,
    details_meals,
    user_apero,
    user_alcool,
    user_sweets,
    user_dessert,
    user_soft,
    details_dessert,
    details_alcool,
    details_apero,
    details_soft,
    details_sweets,
  } = session;
  const [openModalUpdateSession, setOpenModalUpdateSession] = useState(false);
  function getMonthName(date) {
    const birthdayMonth = new Date(date).getMonth();
    const newDate = new Date();
    newDate.setMonth(birthdayMonth);

    return newDate.toLocaleString("fr-FR", { month: "short" });
  }
  const getDay = new Date(dateSession).getDate();

  const handleClick = () => {
    setOpenModalUpdateSession(true);
  };

  return session.length !== 0 ? (
    <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base ">
      <ModalUpdateSession
        openModalUpdateSession={openModalUpdateSession}
        setOpenModalUpdateSession={setOpenModalUpdateSession}
        sessionUpdate={sessionUpdate}
        setSessionUpdate={setSessionUpdate}
        data={session}
      />
      <div className="grid grid-cols-3 items-center">
        <div>
          {index === 0 && (
            <div className=" text-xl text-center text-red-800 font-semibold">
              Pochaine session !
            </div>
          )}
          <div className="text-center">{title}</div>
        </div>

        <div className="w-1/2 mx-auto h-20 overflow-hidden flex flex-col items-center rounded-md shadow">
          <span className="h-1/3 w-full bg-red-800" />
          <div className="h-full flex flex-col items-center justify-evenly pb-2">
            <div className=" text-xl font-semibold">{getDay}</div>
            <div className=" text-xl font-semibold">
              {getMonthName(dateSession)}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-row justify-end">
            <button type="button" onClick={handleClick}>
              <PencilSquareIcon className="text-red-700 hover:text-red-900  w-4 h-4  cursor-pointer" />
            </button>
            <DeleteSession
              data={session}
              sessionDelete={sessionDelete}
              setSessionDelete={setSessionDelete}
              query={query}
            />
          </div>
          <div className="text-center">{duration}</div>
          <div className="text-center">
            {isCampaign === "1" ? "CAMPAGNE" : "SIDE QUESTS"}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="w-full font-semibold text-xl text-center mb-3 mt-2">
          {localisation}
        </div>
        <div className="w-full flex justify-between md:w-5/6 mb-2">
          <span className="w-1/3">Gestion du repas</span>
          <span className="w-1/3 text-center font-medium"> {user_meal}</span>
          <span className="w-1/3 text-right font-medium">{details_meals}</span>
        </div>
        <div className="w-full flex justify-between md:w-5/6 mb-2">
          <span className="w-1/3">Le dessert</span>
          <span className="w-1/3 text-center font-medium"> {user_dessert}</span>
          <span className="w-1/3 text-right font-medium">
            {details_dessert}
          </span>
        </div>
        <div className="w-full flex justify-between md:w-5/6  mb-2">
          <span className="w-1/3">L'apéro</span>
          <span className="w-1/3 text-center font-medium"> {user_apero}</span>
          <span className="w-1/3 text-right font-medium">{details_apero}</span>
        </div>
        <div className="w-full flex justify-between md:w-5/6  mb-2">
          <span className="w-1/3">Le sucré</span>
          <span className="w-1/3 text-center font-medium"> {user_sweets}</span>
          <span className="w-1/3 text-right font-medium">{details_sweets}</span>
        </div>
        <div className="w-full flex justify-between md:w-5/6  mb-2">
          <span className="w-1/3">Le sans alcool</span>
          <span className="w-1/3 text-center font-medium"> {user_soft}</span>
          <span className="w-1/3 text-right font-medium">{details_soft}</span>
        </div>
        <div className="w-full flex justify-between md:w-5/6  mb-2">
          <span className="w-1/3">Les bières et le vin</span>
          <span className="w-1/3 text-center font-medium"> {user_alcool}</span>
          <span className="w-1/3 text-right font-medium">{details_alcool}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base ">
      <img
        src="https://cdn.midjourney.com/5455fa1b-bc1b-4285-8b32-110599f42944/grid_0.png"
        alt="No session"
      />
    </div>
  );
}
