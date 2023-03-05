/* eslint-disable react/prop-types */
import React from "react";
import getRandomColor from "./utils/getRandomColor";

export default function Avatar({ data }) {
  return (
    <div className="h-full w-full shrink-0">
      {!data.avatar ? (
        <div
          className={`h-full w-full rounded-full overflow-hidden ${getRandomColor()} flex justify-center items-center text-4xl md:text-6xl text-white font-medium shadow-md border-4 border-white`}
        >
          {`${data.nickname.charAt(0)}`}
        </div>
      ) : (
        <img
          className="inline-block h-full w-full rounded-full cursor-pointer shadow-md border-4 border-white"
          src={data.avatar}
          alt="profil avatar"
        />
      )}
    </div>
  );
}
