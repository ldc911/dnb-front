/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import SelectMenuDurationUpdate from "../selects/SelectMenuDurationUpdate";

const { VITE_BACKEND_URL } = import.meta.env;

const duration = [
  { id: 1, value: "Après-midi" },
  { id: 2, value: "Soirée" },
  { id: 3, value: "Après-midi et soirée" },
  { id: 4, value: "Week-end" },
];

export default function UpdateSessionForm({
  data,
  setOpenModalUpdateSession,
  sessionUpdate,
  setSessionUpdate,
}) {
  const [isCampaignEnabled, setIsCampaignEnabled] = useState(
    parseInt(data.isCampaign, 10)
  );
  const [sessionInfo, setSessionInfo] = useState({
    duration: data.duration || null,
    localisation: data.localisation || null,
    isCampaign: data.isCampaign || null,
    title: data.title || null,
    user_meal: data.user_meal || null,
    details_meals: data.details_meals || null,
    user_apero: data.user_apero || null,
    user_alcool: data.user_alcool || null,
    user_sweets: data.user_sweets || null,
    user_dessert: data.user_dessert || null,
    user_soft: data.user_soft || null,
    details_apero: data.details_apero || null,
    details_alcool: data.details_alcool || null,
    details_sweets: data.details_sweets || null,
    details_soft: data.details_soft || null,
    details_dessert: data.details_dessert || null,
  });

  const handleChange = (event) => {
    setSessionInfo({ ...sessionInfo, title: event.target.value });
  };
  const handleChangeLocation = (event) => {
    setSessionInfo({ ...sessionInfo, localisation: event.target.value });
  };
  const handleChangeMenu = (event) => {
    setSessionInfo({ ...sessionInfo, details_meals: event.target.value });
  };

  const handleChangeMealDealer = (event) => {
    setSessionInfo({ ...sessionInfo, user_meal: event.target.value });
  };
  const handleChangeDessert = (event) => {
    setSessionInfo({ ...sessionInfo, details_dessert: event.target.value });
  };

  const handleChangeDessertDealer = (event) => {
    setSessionInfo({ ...sessionInfo, user_dessert: event.target.value });
  };

  const handleChangeApero = (event) => {
    setSessionInfo({ ...sessionInfo, details_apero: event.target.value });
  };

  const handleChangeAperoDealer = (event) => {
    setSessionInfo({ ...sessionInfo, user_apero: event.target.value });
  };

  const handleChangeSweets = (event) => {
    setSessionInfo({ ...sessionInfo, details_sweets: event.target.value });
  };

  const handleChangeSweetsDealer = (event) => {
    setSessionInfo({ ...sessionInfo, user_sweets: event.target.value });
  };

  const handleChangeSoft = (event) => {
    setSessionInfo({ ...sessionInfo, details_soft: event.target.value });
  };

  const handleChangeSoftDealer = (event) => {
    setSessionInfo({ ...sessionInfo, user_soft: event.target.value });
  };

  const handleChangeAlcool = (event) => {
    setSessionInfo({ ...sessionInfo, details_alcool: event.target.value });
  };

  const handleChangeAlcoolDealer = (event) => {
    setSessionInfo({ ...sessionInfo, user_alcool: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${VITE_BACKEND_URL}/sessions/${data.id}`,
        {
          duration: sessionInfo.duration,
          localisation: sessionInfo.localisation,
          isCampaign: isCampaignEnabled ? "1" : "0",
          title: sessionInfo.title,
          user_meal: sessionInfo.user_meal,
          details_meals: sessionInfo.details_meals,
          user_apero: sessionInfo.user_apero,
          user_alcool: sessionInfo.user_alcool,
          user_sweets: sessionInfo.user_sweets,
          user_dessert: sessionInfo.user_dessert,
          user_soft: sessionInfo.user_soft,
          details_apero: sessionInfo.details_apero,
          details_alcool: sessionInfo.details_alcool,
          details_sweets: sessionInfo.details_sweets,
          details_soft: sessionInfo.details_soft,
          details_dessert: sessionInfo.details_dessert,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function handleResponse() {
        setSessionUpdate(!sessionUpdate);
        setOpenModalUpdateSession(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" w-full h-full bg-white rounded-md py-6 px-2 shadow text-xs md:text-base flex flex-col items-center">
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Combien de temps ?</div>
          <div className="w-1/2 leading-4">
            <SelectMenuDurationUpdate
              duration={duration}
              sessionInfo={sessionInfo}
              selectedDuration={sessionInfo.duration}
              setSessionInfo={setSessionInfo}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Sera-ce une campagne ?</div>
          <div className="py-16 ">
            <Switch
              checked={isCampaignEnabled}
              onChange={() => {
                if (!isCampaignEnabled) {
                  setIsCampaignEnabled(!isCampaignEnabled);
                } else {
                  setIsCampaignEnabled(false);
                }
              }}
              className={`${isCampaignEnabled ? "bg-green-900" : "bg-red-900"}
      relative inline-flex items-center h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  isCampaignEnabled ? "translate-x-4" : "translate-x-0"
                }
        pointer-events-none inline-block align-middle  h-[17px] w-[17px] transform rounded-full bg-white ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Le titre ?</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.title}
              onChange={handleChange}
              placeholder="Titre de session"
              className="text-center w-full h-6 focus:border-none border-none active:border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Et c'est où ?</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.localisation}
              onChange={handleChangeLocation}
              placeholder="Lieu de session"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm "
            />
          </div>
        </div>
        <span className="border-t-2 w-1/2" />
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Gestion du repas :</div>

          <div className=" bg-white border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.user_meal}
              onChange={handleChangeMealDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Menu :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.details_meals}
              onChange={handleChangeMenu}
              placeholder="On mange quoi ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <span className="border-t-2 w-1/2" />
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Le dessert :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.user_dessert}
              onChange={handleChangeDessertDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Détails :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.details_dessert}
              onChange={handleChangeDessert}
              placeholder="On mange quoi ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <span className="border-t-2 w-1/2" />
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">L'apéro :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.user_apero}
              onChange={handleChangeAperoDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Détails :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.details_apero}
              onChange={handleChangeApero}
              placeholder="On mange quoi ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <span className="border-t-2 w-1/2" />
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>Le sucré :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.user_sweets}
              onChange={handleChangeSweetsDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Détails :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.details_sweets}
              onChange={handleChangeSweets}
              placeholder="On mange quoi ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <span className="border-t-2 w-1/2" />
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>Le sans alcool :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.user_soft}
              onChange={handleChangeSoftDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Détails :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.details_soft}
              onChange={handleChangeSoft}
              placeholder="On boit quoi ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <span className="border-t-2 w-1/2" />
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center mb-1">
          <div>La bière et le vin :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.user_alcool}
              onChange={handleChangeAlcoolDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Détails :</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-4 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.details_alcool}
              onChange={handleChangeAlcool}
              placeholder="On boit quoi ?"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-0 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="ml-3 mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Valider !
        </button>
      </div>
    </form>
  );
}
