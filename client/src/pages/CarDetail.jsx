import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCars, deleteCar } from '../api';

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    const fetchCarDetails = async () => {
        try {
            const { data } = await getCars(id);
            setCar(data);
        } catch (err) {
            alert('Error fetching car details');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCar(id);
            navigate('/');
        } catch (err) {
            alert('Error deleting car');
        }
    };

    useEffect(() => {
        fetchCarDetails();
    }, [id]);

    if (!car) return <p>Loading...</p>;

    return (
        <div className="car-detail">
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            <p>Tags: {car.tags.join(', ')}</p>
            <div className="car-images">
                {car.images.map((img, idx) => (
                    <img key={idx} src={`http://localhost:5000/${img}`} alt={car.title} />
                ))}
            </div>
            <button onClick={() => navigate(`/add/${id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CarDetail;
