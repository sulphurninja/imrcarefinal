import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddServiceDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedSubcategory('');
    setServiceName('');
    setServiceImage('');
    setServiceDescription('');
    setIsSubmitted(false);
  };

  useEffect(() => {
    // Fetch all subcategories on page load
    axios.get('/api/getAllSubCategories').then((res) => {
      setSubcategories(res.data.data);
    });
  }, []);


  const handleSubcategoryChange = (event) => {
    const subcategoryId = event.target.value;
    setSelectedSubcategory(subcategoryId);
  };

  const handleServiceSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/api/services', {
        name: serviceName,
        description: serviceDescription,
        subcategory: selectedSubcategory,
      })
      .then((res) => {
        // Handle the response as needed
        setServiceName('');
        setServiceImage('');
        setServiceDescription('');
      });
  };

  return (
    <div className="relative">
      <button
        className="bg-[#5E474C] mt-10 hover:bg-[#F6F4EE] hover:text-[#5E474C] text-white font-darkage font-semibold py-2 px-4 rounded"
        onClick={openDialog}
      >
        Add a Service
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#5E474C] text-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold font-coffee mb-4">Add a Service</h2>
            <form onSubmit={handleServiceSubmit}>
              <div className="mb-4">
                <label htmlFor="subcategory" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  className="w-full border font-darkage bg-[#F6F4EE] text-[#5E474C] border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="serviceName" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  id="serviceName"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full font-darkage border border-gray-300 rounded px-3 py-2 focus:outline-none bg-[#F6F4EE] text-[#5E474C] focus:border-[#F6F4EE]"
                  placeholder="Enter Service name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="serviceDescription" className="block text-[#F6F4EE] font-bold font-darkage mb-2">
                  Service Description
                </label>
                <textarea
                  id="serviceDescription"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="w-full font-darkage border border-gray-300 rounded px-3 py-2 focus:outline-none bg-[#F6F4EE] text-[#5E474C] focus:border-[#F6F4EE]"
                  placeholder="Enter Service description"
                  required
                ></textarea>
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

export default AddServiceDialog;
