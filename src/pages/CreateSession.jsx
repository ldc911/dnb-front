/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import SelectMenuDuration from "../components/selects/SelectMenuDuration";
import SelectMenu from "../components/selects/SelectMenu";

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
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState("");
  const [mealDealer, setMealDealer] = useState(null);
  const [mealDealerName, setMealDealerName] = useState("Qui régale ?");
  const [menu, setMenu] = useState("");
  const [sweetDealer, setSweetDealer] = useState(null);
  const [sweetDealerName, setSweetDealerName] = useState("Qui régale ?");
  const [aperoDealer, setAperoDealer] = useState(null);
  const [aperoDealerName, setAperoDealerName] = useState("Qui régale ?");
  const [dessertDealer, setDessertDealer] = useState(null);
  const [dessertDealerName, setDessertDealerName] = useState("Qui régale ?");
  const [softDealer, setSoftDealer] = useState(null);
  const [softDealerName, setSoftDealerName] = useState("Qui régale ?");
  const [alcoolDealer, setAlcoolDealer] = useState(null);
  const [alcoolDealerName, setAlcoolDealerName] = useState("Qui régale ?");
  const navigate = useNavigate();

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
    setTitle(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeMenu = (event) => {
    setMenu(event.target.value);
  };

  let footer = <p>Sélectionne une date.</p>;
  if (selectedDate) {
    footer = <p>Date sélectionnée : {format(selectedDate, "PP")}</p>;
  }

  useEffect(() => {
    if (mealDealer) {
      const userMeal = users.filter((user) => user.id === mealDealer);
      setMealDealerName(userMeal[0].nickname);
    }
  }, [mealDealer]);

  useEffect(() => {
    if (sweetDealer) {
      const userSweet = users.filter((user) => user.id === sweetDealer);
      setSweetDealerName(userSweet[0].nickname);
    }
  }, [sweetDealer]);

  useEffect(() => {
    if (aperoDealer) {
      const userApero = users.filter((user) => user.id === aperoDealer);
      setAperoDealerName(userApero[0].nickname);
    }
  }, [aperoDealer]);

  useEffect(() => {
    if (dessertDealer) {
      const userDessert = users.filter((user) => user.id === dessertDealer);
      setDessertDealerName(userDessert[0].nickname);
    }
  }, [dessertDealer]);

  useEffect(() => {
    if (softDealer) {
      const userSoft = users.filter((user) => user.id === softDealer);
      setSoftDealerName(userSoft[0].nickname);
    }
  }, [softDealer]);

  useEffect(() => {
    if (alcoolDealer) {
      const userAlcool = users.filter((user) => user.id === alcoolDealer);
      setAlcoolDealerName(userAlcool[0].nickname);
    }
  }, [alcoolDealer]);

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
          user_meal: mealDealer,
          details_meals: menu,
          user_apero: aperoDealer,
          user_alcool: alcoolDealer,
          user_sweets: sweetDealer,
          user_dessert: dessertDealer,
          user_soft: softDealer,
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
  return isLoading ? (
    <p>loading</p>
  ) : (
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
          <div className="text-center">Combien de temps ?</div>
          <div className="w-1/2 leading-4">
            <SelectMenuDuration
              duration={duration}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Sera-ce une campagne ?</div>
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
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Le titre ?</div>
          <div className="  bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              placeholder="Entre le titre de la session"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Et c'est où ?</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1">
            <input
              type="text"
              value={location}
              onChange={handleChangeLocation}
              placeholder="Entre le lieu de la session"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div>Gestion du repas</div>
          <div className="w-1/2 leading-4">
            <SelectMenu
              data={users}
              setSelectedElement={setMealDealer}
              placeHolder={mealDealerName}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Un peu de détails :</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1">
            <input
              type="text"
              value={menu}
              onChange={handleChangeMenu}
              placeholder="On mange quoi ?"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div>Le dessert :</div>
          <div className="w-1/2 leading-4">
            <SelectMenu
              data={users}
              setSelectedElement={setDessertDealer}
              placeHolder={dessertDealerName}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div>L'apéro :</div>
          <div className="w-1/2 leading-4">
            <SelectMenu
              data={users}
              setSelectedElement={setAperoDealer}
              placeHolder={aperoDealerName}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div>Le sucré :</div>
          <div className="w-1/2 leading-4">
            <SelectMenu
              data={users}
              setSelectedElement={setSweetDealer}
              placeHolder={sweetDealerName}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center">
          <div>Le sans alcool :</div>
          <div className="w-1/2 leading-4">
            <SelectMenu
              data={users}
              setSelectedElement={setSoftDealer}
              placeHolder={softDealerName}
            />
          </div>
        </div>
        <div className="w-full h-10 mb-4 md:w-2/3 px-4 flex flex-row justify-between items-center mb-3">
          <div>La bière et le vin :</div>
          <div className="w-1/2 leading-4">
            <SelectMenu
              data={users}
              setSelectedElement={setAlcoolDealer}
              placeHolder={alcoolDealerName}
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
