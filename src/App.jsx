/* eslint-disable import/no-extraneous-dependencies */
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateSession from "./pages/CreateSession";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";

import "./index.css";

function ProtectedRoute({ children }) {
  const { userToken } = useContext(AuthContext);
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
}

function ProtectedRouteLogin({ children }) {
  const { userToken } = useContext(AuthContext);
  if (userToken) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const [showNotifModif, setShowNotifModif] = useState(false);
  const openNotif = () => setShowNotifModif(true);
  const closeNotif = () => {
    setTimeout(() => setShowNotifModif(false), 3000);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRouteLogin>
              <Login
                showNotifModif={showNotifModif}
                setShowNotifModif={setShowNotifModif}
              />{" "}
            </ProtectedRouteLogin>
          }
        />
        <Route
          path="/password_recover/:token"
          element={
            <ProtectedRouteLogin>
              <RecoverPassword openNotif={openNotif} closeNotif={closeNotif} />
            </ProtectedRouteLogin>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NavBar />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

ProtectedRoute.defaultProps = {
  children: <div />,
};

ProtectedRouteLogin.propTypes = {
  children: PropTypes.node,
};

ProtectedRouteLogin.defaultProps = {
  children: <div />,
};

export default App;
