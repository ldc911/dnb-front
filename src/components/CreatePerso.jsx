/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef } from "react";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function CreatePerso({
  idAuthor,
  setPersoUpdate,
  persoUpdate,
  setOpenModalCreatePerso,
  handleNotifCreatePerso,
}) {
  const [perso, setPerso] = useState({
    nickname: "",
    lastname: "",
    classe: "",
    idAuthor,
    background: "",
    avatar: "",
    hauts_faits: "",
    species: "",
  });
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const inputRef = useRef(null);

  const handleChangeNickname = (event) => {
    setPerso({ ...perso, nickname: event.target.value });
  };

  const handleChangeLastname = (event) => {
    setPerso({ ...perso, lastname: event.target.value });
  };

  const handleChangeClasse = (event) => {
    setPerso({ ...perso, classe: event.target.value });
  };

  const handleChangeBackground = (event) => {
    setPerso({ ...perso, background: event.target.value });
  };

  const handleChangeHautsFaits = (event) => {
    setPerso({ ...perso, hauts_faits: event.target.value });
  };

  const handleChangeSpecies = (event) => {
    setPerso({ ...perso, species: event.target.value });
  };

  function handleChangeAvatar(event) {
    setImageName(event.target.files[0].name);
    setImageSrc(URL.createObjectURL(event.target.files[0]));
  }

  const handleRemoveImage = () => {
    setImageSrc("");
    setImageName("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.files[0]) {
      const file = inputRef.current.files[0];
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      axios
        .post(import.meta.env.VITE_UPLOAD_ADDRESS, formData)
        .then((response) => {
          perso.avatar = response.data.secure_url;
        })
        .then(() => {
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/persos`, { ...perso })
            .then(() => {
              setPersoUpdate(!persoUpdate);
              handleNotifCreatePerso();
              setOpenModalCreatePerso(false);
            });
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/persos`, { ...perso })
        .then(() => {
          setPersoUpdate(!persoUpdate);
          handleNotifCreatePerso();
          setOpenModalCreatePerso(false);
        });
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className=" w-full h-full bg-white rounded-md py-6 px-2  shadow text-xs md:text-base flex flex-col items-center">
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center relative">
          <button
            type="button"
            className="py-1 px-1 cursor-pointer border-transparent border-2 border-slate-100 rounded-md text-grey hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 max-w-20"
          >
            Avatar
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              className="absolute left-0 z-10 max-w-[5rem] opacity-0 cursor-pointer"
              onChange={handleChangeAvatar}
            />
          </button>
          {imageName ? (
            <>
              <img
                src={imageSrc}
                alt={imageName}
                className="h-10 w-10 rounded-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage()}
                className="inline-flex border border-transparent text-center text-base shadow-sm text-red-700 hover:text-white bg-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-full absolute top-[-0.5rem] right-[-0.5rem] z-50 h-6 w-6"
              >
                <XCircleIcon />
              </button>
            </>
          ) : (
            <span />
          )}
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Prénom / surnom</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 focus:border-gray-500">
            <input
              type="text"
              value={perso.nickname}
              onChange={handleChangeNickname}
              placeholder="Prénom / surnom"
              className="w-full"
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
              placeholder="Famille / Clan"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Espèce</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2">
            <input
              type="text"
              value={perso.species || ""}
              onChange={handleChangeSpecies}
              placeholder="Espèce"
              className="w-full"
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
              placeholder="Classe / ss-classe"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full h-full mb-1 px-4 flex flex-row justify-between items-start">
          <div className="text-center">Background</div>
          <div className=" border border-gray-300 rounded shadow-sm px-1 py-1 w-1/2 ">
            <textarea
              name=""
              id=""
              rows="5"
              className="w-full h-full border-slate-300 rounded text-center scrollbar-hide"
              value={perso.background}
              onChange={handleChangeBackground}
            />
          </div>
        </div>
        <div className="w-full h-full mb-5 px-4 flex flex-row justify-between items-start">
          <div className="text-center">Faits marquants</div>
          <div className=" border border-gray-300 rounded shadow-sm  px-1 py-1 w-1/2 ">
            <textarea
              name=""
              id=""
              rows="5"
              className="w-full h-full border-slate-300 rounded text-center scrollbar-hide"
              value={perso.hauts_faits}
              onChange={handleChangeHautsFaits}
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
