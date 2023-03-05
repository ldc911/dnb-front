/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import axios from "axios";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function HautsFaits({ data }) {
  const { currentUserData } = useContext(AuthContext);
  const [modifications, setModifications] = useState(false);
  const [userHautsFaits, setUserHautsFaits] = useState(data.hauts_faits);
  const { id } = useParams();

  const handleClick = () => {
    setModifications(!modifications);
    if (modifications) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/persos/${data.id}`, {
          hauts_faits: userHautsFaits,
        })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleChange = (e) => {
    setUserHautsFaits(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-end px-2">
        {currentUserData.id === parseInt(id, 10) && (
          <button type="button" onClick={handleClick}>
            {modifications ? (
              <CheckCircleIcon className="text-red-700 hover:text-green-900  w-4 h-4  cursor-pointer " />
            ) : (
              <PencilIcon className="text-red-700 hover:text-yellow-700  w-4 h-4  cursor-pointer " />
            )}
          </button>
        )}
      </div>
      {!modifications ? (
        <p className=" h-24 break-words text-center overflow-auto scrollbar-hide px-1 md:px-4">
          {userHautsFaits}
        </p>
      ) : (
        <textarea
          name=""
          id=""
          rows="5"
          className="w-full h-full border-slate-300 rounded text-center scrollbar-hide"
          defaultValue={userHautsFaits}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default HautsFaits;
