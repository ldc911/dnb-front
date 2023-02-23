/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Biography from "./Biography";

export default function UserList({ user }) {
  const { nickname, banPic, isMJ } = user;

  return (
    <div className=" w-full h-[50vh] bg-white rounded-md p-2 mb-4 shadow text-xs md:w-[48vw]  md:text-base ">
      <div className="flex h-1/3 flex-col mb-10 ">
        <div className="flex h-full flex-col items-center justify-start relative">
          <div className="flex flex-row overflow-hidden mb-2 shadow-md rounded-md items-center">
            <img className="-z-0" src={banPic} alt="bannière" />
          </div>

          <div className="md:h-40 md:w-40 h-32 w-32 absolute -bottom-3 md:-bottom-10">
            <Link to={`/profile/${user.id}`}>
              <Avatar data={user} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-4 text-lg font-bold">
        <div className="w-full font-semibold text-xl text-center">
          {nickname}
        </div>
        <div className="text-center text-sm font-semibold mb-3">
          {isMJ ? "Joueur/Dungeon Master" : "Joueur"}
        </div>
        <div className="w-full font-medium text-sm md:text-base text-center break-words md:justify-between mb-2 shadow h-44">
          <Biography data={user} />
        </div>
      </div>
    </div>
  );
}
