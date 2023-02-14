/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function RecoverPassword({ openNotif, closeNotif }) {
  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/passwordRecover/${token}`)
      .then((response) => {
        if (response.status === 200) {
          setIsValidated(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError(
        "Ton mot de passe doit être identique à celui de la confirmation."
      );
    }
    setError("");

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/passwordRecover`, {
        token: token.split("-").join("."),
        password: newPassword,
      })
      .then(() => {
        openNotif();
        closeNotif();
        navigate("/login");
      });
  };

  return !isLoading && isValidated ? (
    <div className="h-screen w-screen flex items-center justify-center py-4">
      <div className=" w-full h-full bg-white rounded-md py-16 px-2 m-4 shadow text-xs md:text-base flex flex-col items-center">
        <div className="text-lg text-center font-bold text-red-800 md:text-xl">
          CHANGEMENT DE MOT DE PASSE
        </div>
        <div className="text-base text-center font-semibold text-gray-800 mb-16">
          Pour les gobelins sans cervelle.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full h-10 px-4 flex flex-col mb-6 md:justify-between items-center md:flex-row">
            <div className="text-center mb-2">Nouveau mot de passe</div>
            <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-4 py-1 w-full md:w-1/2 focus:border-gray-500">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                autoComplete="password"
                className="w-full text-center font-medium text-xs"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-10 px-4 flex flex-col mb-16 md:justify-between items-center md:flex-row">
            <div className="text-center mb-2">Confirmer mot de passe</div>
            <div className=" bg-white border border-gray-300 rounded shadow-sm  pl-4 pr-4 py-1 w-full md:w-1/2 focus:border-gray-500">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Mot de passe"
                autoComplete="confirm-password"
                className="w-full text-center font-medium text-xs"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <button
              type="submit"
              className="w-2/3 md:w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 mb-6 focus:ring-offset-2 focus:ring-gray-600"
              onClick={handleSubmit}
            >
              Valider
            </button>
            <p className="text-center text-red-800 font-medium">{error}</p>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}
