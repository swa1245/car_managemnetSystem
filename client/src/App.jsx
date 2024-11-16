import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AddEditCar from "./pages/AddEditCar";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import Signup from "./pages/Signup";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add" element={<AddEditCar />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
