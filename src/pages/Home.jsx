/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SessionList from "../components/SessionList";
import RandomSpell from "../components/RandomSpell";

export default function Home() {
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDelete, setSessionDelete] = useState(true);
  const [sessionUpdate, setSessionUpdate] = useState(true);
  const location = useLocation();
  const queryString = location.search;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sessions`)
      .then((response) => {
        setIsLoading(false);
        setSession(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sessionDelete, sessionUpdate]);
  const today = new Date();
  const dateTransform = (oneDate) => {
    const date = new Date(oneDate);
    return date;
  };

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="h-full flex flex-col">
      <div className=" flex flex-col gap-4 p-3 md:grid md:grid-cols-2">
        {session.filter((element) => {
          return dateTransform(element.dateSession) >= today;
        }).length === 0 ? (
          <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base ">
            <img
              src="https://cdn.midjourney.com/5455fa1b-bc1b-4285-8b32-110599f42944/grid_0.png"
              alt="No session"
            />
          </div>
        ) : (
          <ul>
            {session
              .filter((element) => {
                return dateTransform(element.dateSession) >= today;
              })
              .map((data, index) => (
                <li key={data.id}>
                  <SessionList
                    session={data}
                    query={queryString}
                    sessionDelete={sessionDelete}
                    setSessionDelete={setSessionDelete}
                    sessionUpdate={sessionUpdate}
                    setSessionUpdate={setSessionUpdate}
                    index={index}
                  />
                </li>
              ))}
          </ul>
        )}
        <div className="hidden md:block">
          <RandomSpell />
        </div>
      </div>
    </div>
  );
}
