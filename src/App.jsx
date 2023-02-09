/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from "react";
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
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRouteLogin>
              <Login />
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
        </Route>
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
