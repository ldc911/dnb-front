/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

const { VITE_BACKEND_URL } = import.meta.env;

export default function UpdatePerso({
  data,
  setPersoUpdate,
  persoUpdate,
  setOpenModalUpdatePerso,
  handleNotifUpdatePerso,
}) {
  const [perso, setPerso] = useState({
    nickname: data.nickname || null,
    lastname: data.lastname || null,
    classe: data.classe || null,
    species: data.species || null,
  });
  const { currentUserData } = useContext(AuthContext);

  const handleChangeNickname = (event) => {
    setPerso({ ...perso, nickname: event.target.value });
  };

  const handleChangeLastname = (event) => {
    setPerso({ ...perso, lastname: event.target.value });
  };

  const handleChangeClasse = (event) => {
    setPerso({ ...perso, classe: event.target.value });
  };

  const handleChangeSpecies = (event) => {
    setPerso({ ...perso, species: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${VITE_BACKEND_URL}/persos/${data.id}`,
        {
          nickname: perso.nickname || "null",
          lastname: perso.lastname || "null",
          classe: perso.classe || "null",
          species: perso.species || "null",
        },
        {
          headers: {
            "Content-Type": "application/json",
            currentuserid: currentUserData.id,
          },
        }
      )
      .then(function handleResponse() {
        setPersoUpdate(!persoUpdate);
        setOpenModalUpdatePerso(false);
        handleNotifUpdatePerso();
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" w-full h-full bg-white rounded-md py-6 px-2 m-4 shadow text-xs md:text-base flex flex-col items-center">
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Prénom / surnom</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 focus:border-gray-500">
            <input
              type="text"
              value={perso.nickname}
              onChange={handleChangeNickname}
              placeholder="Prénom ou surnom"
              required
              className="w-full h-6 border-none focus:border-none focus:ring-red-700"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Nom</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2">
            <input
              type="text"
              value={perso.lastname || ""}
              onChange={handleChangeLastname}
              placeholder="Nom de famille, de clan"
              className="w-full h-6 border-none focus:border-none focus:ring-red-700"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Classe(s)</div>
          <div className=" border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 ">
            <input
              type="text"
              value={perso.classe}
              onChange={handleChangeClasse}
              placeholder="Classe(s), sous-classe(s)"
              className="w-full h-6 border-none focus:border-none focus:ring-red-700"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Espèce</div>
          <div className=" border border-gray-300 rounded shadow-sm pl-4 pr-10 py-1 w-1/2 ">
            <input
              type="text"
              value={perso.species}
              onChange={handleChangeSpecies}
              placeholder="Espèce"
              className="w-full h-6 border-none focus:border-none focus:ring-red-700"
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
