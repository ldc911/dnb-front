import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import pictureForm from "../assets/form-picture.webp";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { setUser, setUserData } = useContext(AuthContext);

  const [errorConnection, setErrorConnection] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        inputs
      );

      if (response.data.token) {
        setUser(response.data.token);
        setUserData(response.data.user);
        navigate("/");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error.message);
      setErrorConnection(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-32 xl:px-44">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <img className="h-16 mb-10 w-auto" src={logo} alt="logo" />

          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">
              Se connecter
            </h2>
          </div>

          {errorConnection && (
            <div className="rounded-md bg-[#FFE0E6] p-4 mt-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-700"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-700">
                    Identifiants incorrects. Veuillez réessayer.
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      required="required"
                      placeholder="grodarjetaime@dnb.com"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-600 focus:border-gray-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="*************"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-600 focus:border-gray-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  >
                    Connexion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={pictureForm}
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
