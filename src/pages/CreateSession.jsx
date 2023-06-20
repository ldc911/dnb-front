/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import SelectMenuDuration from "../components/selects/SelectMenuDuration";

const { VITE_BACKEND_URL } = import.meta.env;

const duration = [
  { id: 1, value: "Après-midi" },
  { id: 2, value: "Soirée" },
  { id: 3, value: "Après-midi et soirée" },
  { id: 4, value: "Week-end" },
];

export default function CreateSession() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDuration, setSelectedDuration] = useState(duration[0].value);
  const [selectedCampaign, setSelectedCampaign] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [mealDealerName, setMealDealerName] = useState("");
  const [menu, setMenu] = useState("");
  const [sweets, setSweets] = useState("");
  const [sweetsDealerName, setSweetsDealerName] = useState("");
  const [aperoDealerName, setAperoDealerName] = useState("");
  const [apero, setApero] = useState("");
  const [dessertDealerName, setDessertDealerName] = useState("");
  const [dessert, setDessert] = useState("");
  const [soft, setSoft] = useState("");
  const [softDealerName, setSoftDealerName] = useState("");
  const [alcool, setAlcool] = useState("");
  const [alcoolDealerName, setAlcoolDealerName] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeMenu = (event) => {
    setMenu(event.target.value);
  };
  const handleChangeMealDealer = (event) => {
    setMealDealerName(event.target.value);
  };
  const handleDessertDealer = (event) => {
    setDessertDealerName(event.target.value);
  };
  const handleChangeDessert = (event) => {
    setDessert(event.target.value);
  };
  const handleAperoDealer = (event) => {
    setAperoDealerName(event.target.value);
  };
  const handleChangeApero = (event) => {
    setApero(event.target.value);
  };
  const handleSweetsDealer = (event) => {
    setSweetsDealerName(event.target.value);
  };
  const handleChangeSweets = (event) => {
    setSweets(event.target.value);
  };
  const handleSoftDealer = (event) => {
    setSoftDealerName(event.target.value);
  };
  const handleChangeSoft = (event) => {
    setSoft(event.target.value);
  };
  const handleAlcoolDealer = (event) => {
    setAlcoolDealerName(event.target.value);
  };
  const handleChangeAlcool = (event) => {
    setAlcool(event.target.value);
  };

  let footer = <p className="text-sm text-gray-500">Sélectionne une date.</p>;
  if (selectedDate) {
    footer = (
      <p className="text-sm">
        Date sélectionnée : {format(selectedDate, "PP")}
      </p>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let isCampaign;
    selectedCampaign === true ? (isCampaign = 1) : (isCampaign = 0);
    axios
      .post(
        `${VITE_BACKEND_URL}/sessions`,
        {
          dateSession: selectedDate,
          duration: selectedDuration,
          localisation: location,
          isCampaign,
          title,
          user_meal: mealDealerName,
          details_meals: menu,
          user_apero: aperoDealerName,
          user_alcool: alcoolDealerName,
          user_sweets: sweetsDealerName,
          user_dessert: dessertDealerName,
          user_soft: softDealerName,
          details_dessert: dessert,
          details_sweets: sweets,
          details_apero: apero,
          details_alcool: alcool,
          details_soft: soft,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function handleResponse() {
        navigate("/");
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="h-full bg-white rounded-md py-6 px-2 m-4 shadow text-xs md:text-xl flex flex-col items-center">
        <div className=" rounded-md shadow pb4 mb-4 h-fit w-fit">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            footer={footer}
            locale={fr}
          />
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Combien de temps ?</div>
          <div className="w-1/2 leading-4">
            <SelectMenuDuration
              duration={duration}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Sera-ce une campagne ?</div>
          <div className="py-16">
            <Switch
              checked={selectedCampaign}
              onChange={setSelectedCampaign}
              className={`${selectedCampaign ? "bg-green-900" : "bg-red-900"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  selectedCampaign ? "translate-x-9" : "translate-x-0"
                }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
        <div className="w-full h-6 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Le titre ?</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              placeholder="Entre le titre de la session"
              className="text-center w-full h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Et c'est où ?</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={location}
              onChange={handleChangeLocation}
              placeholder="Entre le lieu de la session"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <span className="border-b-2 mb-4 w-2/3 md:w-1/2" />
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Gestion du repas</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={mealDealerName}
              onChange={handleChangeMealDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Un peu de détails :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={menu}
              onChange={handleChangeMenu}
              placeholder="On mange quoi ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <span className="border-b-2 mb-4 w-2/3 md:w-1/2" />
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Le dessert :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={dessertDealerName}
              onChange={handleDessertDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Un peu de détails :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={dessert}
              onChange={handleChangeDessert}
              placeholder="Une idée ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <span className="border-b-2 mb-4 w-2/3 md:w-1/2" />
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">L'apéro :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={aperoDealerName}
              onChange={handleAperoDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Un peu de détails :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={apero}
              onChange={handleChangeApero}
              placeholder="Une idée ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <span className="border-b-2 mb-4 w-2/3 md:w-1/2" />
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Le sucré :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={sweetsDealerName}
              onChange={handleSweetsDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Un peu de détails :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={sweets}
              onChange={handleChangeSweets}
              placeholder="Une idée ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <span className="border-b-2 mb-4 w-2/3 md:w-1/2" />
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Le sans alcool :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={softDealerName}
              onChange={handleSoftDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Un peu de détails :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={soft}
              onChange={handleChangeSoft}
              placeholder="Une idée ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <span className="border-b-2 mb-4 w-2/3 md:w-1/2" />
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">L'alcool :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={alcoolDealerName}
              onChange={handleAlcoolDealer}
              placeholder="Qui s'en occupe ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center text-base">Un peu de détails :</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  px-4 py-1">
            <input
              type="text"
              value={alcool}
              onChange={handleChangeAlcool}
              placeholder="Une idée ?"
              className="text-center h-6 focus:border-none border-none focus:ring-1 focus:ring-red-700 text-sm "
            />
          </div>
        </div>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-700"
        >
          Valider !
        </button>
      </div>
    </form>
  );
}
