/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import UserList from "../components/profil/user/UserList";

export default function Home() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUserData } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: { currentUserId: currentUserData.id },
      })
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
    <div className=" w-screen h-full p-4">
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
