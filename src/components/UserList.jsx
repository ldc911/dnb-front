/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";

export default function UserList({ user }) {
  const { nickname, email, bio, banPic, isMJ } = user;

  return (
    <div className=" w-full px-3 bg-white rounded-md p-2 mb-4 shadow text-xs md:max-w-lg md:text-base ">
      <div className="flex flex-col mb-2">
        <img className="mb-2 shadow" src={banPic} alt="bannière" />{" "}
        <div className="w-full font-semibold text-xl text-center">
          {nickname}
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4">
        <div className="text-center">{isMJ ? "BIG BOSS" : "TROUFFION"}</div>

        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span className="text-right font-medium"> {email}</span>
        </div>
        <div className="w-full md:w-4/6 text-center break-words md:justify-between mb-2 shadow h-44">
          <span className=" font-medium">{bio}</span>
        </div>
      </div>
    </div>
  );
}
