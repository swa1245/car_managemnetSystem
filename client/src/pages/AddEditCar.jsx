import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCar, updateCar } from '../api';
import { getCars } from '../api';

const AddEditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        images: null,
    });

    const fetchCarDetails = async () => {
        try {
            const { data } = await getCars(id);
            setFormData({
                title: data.title,
                description: data.description,
                tags: data.tags.join(', '),
                images: null,
            });
        } catch (err) {
            alert('Error fetching car details');
        }
    };

    useEffect(() => {
        if (id) fetchCarDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('tags', formData.tags);
        if (formData.images) {
            for (let i = 0; i < formData.images.length; i++) {
                form.append('images', formData.images[i]);
            }
        }

        try {
            if (id) {
                await updateCar(id, form);
            } else {
                await createCar(form);
            }
            navigate('/');
        } catch (err) {
            alert('Error saving car');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">
                    {id ? 'Edit Car' : 'Add Car'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            placeholder="Enter car title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            placeholder="Enter car description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Tags</label>
                        <input
                            type="text"
                            placeholder="Enter tags (comma-separated)"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({ ...formData, images: e.target.files })
                            }
                            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {id ? 'Update Car' : 'Add Car'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEditCar;
