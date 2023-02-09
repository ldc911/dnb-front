/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { createContext, useState, useMemo } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [currentUserData, setCurrentUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const value = useMemo(
    () => ({
      setUser: (token) => {
        if (token) {
          Cookies.set("userToken", token, {
            expires: 1 / 24,
          });
          setUserToken(token);
        } else {
          Cookies.remove("userToken");
          setUserToken(null);
          localStorage.removeItem("user");
        }
      },
      userToken,
      setUserData: (userData) => {
        setCurrentUserData(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      },
      currentUserData,
      setCurrentUserData,
    }),
    [currentUserData, userToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

AuthContextProvider.defaultProps = {
  children: <div />,
};

export { AuthContext, AuthContextProvider };
