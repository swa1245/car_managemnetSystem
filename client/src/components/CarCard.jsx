import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
    return (
        <div className="car-card">
            <img src={`http://localhost:5000/${car.images[0]}`} alt={car.title} />
            <h3>{car.title}</h3>
            <p>{car.description}</p>
            <Link to={`/cars/${car._id}`}>View Details</Link>
        </div>
    );
};

export default CarCard;
