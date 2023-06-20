/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

const { VITE_BACKEND_URL } = import.meta.env;

export default function UpdatePwd({
  handleNotifUpdateUser,
  handleCloseModalUpdatePwd,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUserData } = useContext(AuthContext);
  const { id } = currentUserData;
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return setError(
        "Ton mot de passe doit être identique à celui de la confirmation."
      );
    }
    setError("");

    axios
      .put(
        `${VITE_BACKEND_URL}/passwordUpdate/${id}`,
        {
          oldPassword,
          password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function handleResponse() {
        handleCloseModalUpdatePwd();
        handleNotifUpdateUser();
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" w-full h-full bg-white rounded-md py-6 px-2 shadow text-xs md:text-base flex flex-col items-center">
        <div className="w-full h-10 mb-3 px-4 flex flex-row justify-center items-center">
          <div className="text-center">
            {pathname === "/"
              ? "C'est ta première connexion, tu peux modifier ton mot de passe si tu le souhaites. Tu pourras toujours le modifier plus tard en allant sur ton profil si tu ne veux pas le faire maintenant."
              : "Modification du mot de passe"}
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-left">Entre ton mot de passe actuel</div>
          <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2">
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              autoComplete="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="mot de passe actuel"
              className="w-full focus:border-none focus:ring-red-700"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-left">Entre ton nouveau mot de passe</div>
          <div className=" border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 ">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="nouveau mot de passe"
              className="w-full focus:border-none focus:ring-red-700"
            />
          </div>
        </div>
        <div className="w-full h-10 mb-1 px-4 flex flex-row justify-between items-center">
          <div className="text-left w-1/2">
            Confirme le nouveau mot de passe
          </div>
          <div className=" border border-gray-300 rounded shadow-sm  pl-4 pr-10 py-1 w-1/2 ">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="confirmPassword"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="confirmer changement"
              className="w-full focus:border-none focus:ring-red-700"
            />
          </div>
        </div>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Valider !
        </button>
        <p className="text-center text-red-800 font-medium mt-3">{error}</p>
      </div>
    </form>
  );
}
