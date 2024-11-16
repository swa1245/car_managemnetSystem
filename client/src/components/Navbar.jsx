import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCars } from "../api"; 
import "remixicon/fonts/remixicon.css"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const fetchCars = async () => {
    try {
      const { data } = await getCars();
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCars();
    }
  }, [isAuthenticated]);

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/" className="text-2xl font-semibold uppercase flex items-center space-x-2">
          <i className="ri-car-fill text-yellow-400"></i>
          <span>Car Manager</span>
        </Link>

        <div className="space-x-6 flex items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/add"
                className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                <i className="ri-add-circle-line"></i>
                <span>Add Car</span>
              </Link>

              <div className="relative inline-block">
                <button className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
                  <i className="ri-car-line"></i>
                  <span>My Cars</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <ul className="space-y-2">
                    
                  </ul>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                <i className="ri-logout-box-line"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                <i className="ri-login-box-line"></i>
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-2 bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
              >
                <i className="ri-user-add-line"></i>
                <span>Signup</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
