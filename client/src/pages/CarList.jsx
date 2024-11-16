import React, { useEffect, useState } from "react";
import { getCars } from "../api";
import { useNavigate } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

 
  const fetchCars = async () => {
    try {
      const { data } = await getCars(); 
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars:", err);
      if (err.response && err.response.status === 401) {
        navigate("/login"); 
      } else {
        setError("Unable to fetch car details. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-fixed"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/lightened-luxury-sedan-car-against-night-city-with-headlamps-rear-tail-lights-lit_1284-28804.jpg?t=st=1731781138~exp=1731784738~hmac=cea18783e99fffd0772c146d42aee1b77e1c2919291ee691f58c8ab6fcd358a1&w=996https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?t=st=1731781321~exp=1731784921~hmac=61a81471accde716731571292f00dcc1d6e90e839cb2b7d5fff13abf4b744108&w=996')`, // Replace with your own image
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          My Cars
        </h1>

      
        {error && (
          <div className="text-red-500 text-center bg-red-100 py-2 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div
                key={car._id}
                onClick={() => navigate(`/cars/${car._id}`)}
                className="relative p-4 bg-white rounded-xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer group"
              >
               
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={car.images?.[0] || "https://via.placeholder.com/300"}
                    alt={car.title || "Car Image"}
                    className="w-full h-48 object-cover rounded-t-xl group-hover:opacity-90 transition-transform transform group-hover:scale-105"
                  />
                </div>
              
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-gray-900 truncate">
                    {car.title || "Untitled"}
                  </h2>
                  <p className="text-gray-700 mt-2 line-clamp-2">
                    {car.description || "No description available."}
                  </p>
                </div>
               
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                  ${car.price || "N/A"}
                </div>
              </div>
            ))
          ) : (
            
            <p className="text-center text-gray-700 text-lg">
              No cars found. Start adding your cars to see them here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarList;
