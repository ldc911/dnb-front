/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import axios from "axios";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Biography({ data }) {
  const { currentUserData } = useContext(AuthContext);
  const [modifications, setModifications] = useState(false);
  const [userBio, setUserBio] = useState(data.bio);
  const { id } = useParams();

  const handleClick = () => {
    setModifications(!modifications);
    if (modifications) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
          id,
          bio: userBio,
        })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleChange = (e) => {
    setUserBio(e.target.value);
  };

  return (
    <div className="w-full h-3/4">
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
        <p>{userBio}</p>
      ) : (
        <textarea
          name=""
          id=""
          rows="3"
          className="w-full border-slate-300 rounded text-center"
          defaultValue={userBio}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default Biography;
