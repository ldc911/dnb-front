/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";

export default function Home() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => {
        setIsLoading(false);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className=" h-full w-screen p-4">
      <ul className="flex flex-col md:items-start md:flex-wrap md:justify-evenly md:flex-row justify-center items-center">
        {users.map((data) => (
          <li key={data.id}>
            <UserList user={data} />
          </li>
        ))}
      </ul>
    </div>
  );
}
