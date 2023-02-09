import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RandomSpell() {
  const [spell, setSpell] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/spells`)
      .then((response) => {
        setIsLoading(false);
        setSpell(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className=" w-full bg-white rounded-md p-3 mb-4 shadow text-xs md:text-base ">
      <div className="font-semibold mb-4">As-tu déjà essayé ce sort ?</div>
      <div className="text-red-800 text-xl font-bold mb-4">{spell.name}</div>
      {spell.level_int && (
        <div className="mb-4">
          C'est un sort de niveau {spell.level_int}{" "}
          {spell.dnd_class.length > 0
            ? `qu'un ${spell.dnd_class} peut
        lancer`
            : ""}
          .
        </div>
      )}
      <div className="mb-2">Révise ton angliche, voici ce que ça fait :</div>
      <div>{spell.desc}</div>
    </div>
  );
}
