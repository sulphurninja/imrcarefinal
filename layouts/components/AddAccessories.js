import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAccessories = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [accImage, setaccImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false); // New state variable for expanded view

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setCategoryName('');
        setaccImage('');
        setIsSubmitted(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'x8yy4v2u');
        setIsUploading(true);
        axios
            .post('https://api.cloudinary.com/v1_1/kaam-24x7/image/upload', formData)
            .then((response) => {
                setaccImage(response.data.secure_url);
                setIsUploading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsUploading(false);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accImage) {
            console.log('Image is not available yet. Please wait.');
            return;
        }

        try {
            setIsSubmitted(true);
            setIsUploading(false);
            await axios.post('/api/addAccessories', {
                name: categoryName,
                image: accImage,
                description,
                price,
            });

            console.log('Accessory added successfully');
            closeDialog();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };


    const toggleExpand = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <div className="relative">
            {isSubmitted ? (
                <h1>✅</h1>
            ) : (
                <>
                    {isUploading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <h1>👇</h1>
                    )}
                </>
            )}

            <button
                className="bg-[#5E474C] hover:bg-[#F6F4EE] hover:text-[#5E474C] text-white font-darkage font-semibold py-2 px-4 rounded"
                onClick={openDialog}
            >
                Add an Accesory
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-[#5E474C] text-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold font-coffee mb-4">Add an Accessory</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                                    Accessory Name
                                </label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="w-full font-darkage border border-gray-300 rounded px-3 py-2 focus:outline-none bg-[#F6F4EE] text-[#5E474C] focus:border-[#F6F4EE]"
                                    placeholder="Enter accessory name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categoryImage" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                                    Category Image
                                </label>
                                <input
                                    type="file"
                                    id="categoryImage"
                                    accept="image/*"
                                    className="w-full font-darkage"
                                    onChange={handleImageUpload}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                                   Description
                                </label>
                                <textarea
                                    type="text"
                                    id="desription"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full font-darkage border border-gray-300 rounded px-3 py-2 focus:outline-none bg-[#F6F4EE] text-[#5E474C] focus:border-[#F6F4EE]"
                                    placeholder="Enter accessory description"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                                    Accessory Price
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full font-darkage border border-gray-300 rounded px-3 py-2 focus:outline-none bg-[#F6F4EE] text-[#5E474C] focus:border-[#F6F4EE]"
                                    placeholder="Enter accessory price"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-[#F6F4EE] font-extrabold font-coffee mr-4"
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#F6F4EE] hover:bg-green-200 text-[#5E474C] font-semibold py-2 px-4 rounded font-coffee"
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Uploading...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAccessories;
