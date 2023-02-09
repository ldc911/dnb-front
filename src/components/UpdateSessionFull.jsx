/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import SelectMenuDurationUpdate from "./selects/SelectMenuDurationUpdate";
import SelectMenuUpdate from "./selects/SelectMenuUpdate";

const { VITE_BACKEND_URL } = import.meta.env;

const duration = [
  { id: 1, value: "Après-midi" },
  { id: 2, value: "Soirée" },
  { id: 3, value: "Après-midi et soirée" },
  { id: 4, value: "Week-end" },
];

export default function UpdateFullSession({
  data,
  setOpenModalUpdateSession,
  sessionUpdate,
  setSessionUpdate,
}) {
  const [isCampaignEnabled, setIsCampaignEnabled] = useState(
    parseInt(data.isCampaign, 10)
  );
  const [placeHolderMeal, setPlaceHolderMeal] = useState(
    data.mealDealer || "Qui régale ?"
  );
  const [placeHolderApero, setPlaceHolderApero] = useState(
    data.aperoDealer || "Qui régale ?"
  );
  const [placeHolderDessert, setPlaceHolderDessert] = useState(
    data.dessertDealer || "Qui régale ?"
  );
  const [placeHolderAlcool, setPlaceHolderAlcool] = useState(
    data.alcoolDealer || "Qui régale ?"
  );
  const [placeHolderSweet, setPlaceHolderSweet] = useState(
    data.sweetsDealer || "Qui régale ?"
  );
  const [placeHolderSoft, setPlaceHolderSoft] = useState(
    data.softDealer || "Qui régale ?"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState("");
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
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => {
        setIsLoading(false);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (event) => {
    setSessionInfo({ ...sessionInfo, title: event.target.value });
  };
  const handleChangeLocation = (event) => {
    setSessionInfo({ ...sessionInfo, localisation: event.target.value });
  };
  const handleChangeMenu = (event) => {
    setSessionInfo({ ...sessionInfo, details_meals: event.target.value });
  };

  const handleMeal = (event) => {
    const dealerMeal = users.filter((e) => e.id === event);
    setSessionInfo({ ...sessionInfo, user_meal: event });
    setPlaceHolderMeal(dealerMeal[0].nickname);
  };

  const handleDessert = (event) => {
    const dealerDessert = users.filter((e) => e.id === event);
    setPlaceHolderDessert(dealerDessert[0].nickname);
    setSessionInfo({ ...sessionInfo, user_dessert: event });
  };

  const handleApero = (event) => {
    const dealerApero = users.filter((e) => e.id === event);
    setPlaceHolderApero(dealerApero[0].nickname);
    setSessionInfo({ ...sessionInfo, user_apero: event });
  };

  const handleSweet = (event) => {
    const dealerSweet = users.filter((e) => e.id === event);
    setPlaceHolderSweet(dealerSweet[0].nickname);
    setSessionInfo({ ...sessionInfo, user_sweets: event });
  };

  const handleSoft = (event) => {
    const dealerSoft = users.filter((e) => e.id === event);
    setPlaceHolderSoft(dealerSoft[0].nickname);
    setSessionInfo({ ...sessionInfo, user_soft: event });
  };

  const handleAlcool = (event) => {
    const dealerAlcool = users.filter((e) => e.id === event);
    setPlaceHolderAlcool(dealerAlcool[0].nickname);
    setSessionInfo({ ...sessionInfo, user_alcool: event });
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
  return isLoading ? (
    <p>loading</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className=" w-full h-full bg-white rounded-md py-6 px-2 m-4 shadow text-xs md:text-base flex flex-col items-center">
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
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 focus:border-gray-500">
            <input
              type="text"
              value={sessionInfo.title}
              onChange={handleChange}
              placeholder="Entre le titre de la session"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Et c'est où ?</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2">
            <input
              type="text"
              value={sessionInfo.localisation}
              onChange={handleChangeLocation}
              placeholder="Entre le lieu de la session"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>Gestion du repas</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              handleChange={handleMeal}
              data={users}
              placeHolder={placeHolderMeal}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Menu :</div>
          <div className=" border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 ">
            <input
              type="text"
              value={sessionInfo.details_meals}
              onChange={handleChangeMenu}
              placeholder="On mange quoi ?"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>Le dessert :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              handleChange={handleDessert}
              data={users}
              placeHolder={placeHolderDessert}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>L'apéro :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              handleChange={handleApero}
              data={users}
              placeHolder={placeHolderApero}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>Le sucré :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              handleChange={handleSweet}
              data={users}
              placeHolder={placeHolderSweet}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div>Le sans alcool :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              handleChange={handleSoft}
              data={users}
              placeHolder={placeHolderSoft}
            />
          </div>
        </div>
        <div className="w-full h-10 px-4 flex flex-row justify-between items-center mb-3">
          <div>La bière et le vin :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              handleChange={handleAlcool}
              data={users}
              placeHolder={placeHolderAlcool}
            />
          </div>
        </div>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Valider !
        </button>
      </div>
    </form>
  );
}
