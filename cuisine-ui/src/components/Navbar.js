import "../styles/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleRegister = () => {
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex items-center justify-between  text-black py-4 px-6">
      <h1 className="text-2xl font-bold ml-24">CuisineHub</h1>
      <nav>
        <ul className="flex">
          {isAuthenticated ? (
            <li className=" cursor-pointer" onClick={toggleSidebar}>
              <span> View </span>
              {showSidebar && (
                <div className="absolute top-0 bg-white shadow-md rounded-md mt-14 mr-4 p-2">
                  <ul>
                    <Link to='/'>
                    <li className="cursor-pointer mt-5" > Search  </li>
                    </Link>
                    <Link to='favorite-recipes'>
                    <li className="cursor-pointer mt-5" > Favorites </li>
                    </Link>
                    <Link to='/profile'>
                    <li className="cursor-pointer mt-5" > Profile </li>
                    </Link>
                    <li onClick={handleLogout} className="cursor-pointer mt-5">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <>
              <li
                className="nav-btn mr-4 hover:text-gray-300 cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </li>
              <li
                className="nav-btn hover:text-gray-300 cursor-pointer"
                onClick={handleRegister}
              >
                Register
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
