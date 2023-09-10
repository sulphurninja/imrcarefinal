import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [casesAndCovers, setCasesAndCovers] = useState([]);
  const [activeTab, setActiveTab] = useState('casesAndCovers'); // Default to 'accessories' tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAccessories = await axios.get('/api/getAccessories');
        setAccessories(responseAccessories.data.data);

        const responseCasesAndCovers = await axios.get('/api/getMobileCovers');
        setCasesAndCovers(responseCasesAndCovers.data.data);

        console.log(accessories, 'accessories');
        console.log(casesAndCovers, 'casesAndCovers');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeTab]);

  // Define the active data based on the active tab
  const activeData = activeTab === 'accessories' ? accessories : casesAndCovers;

  return (
    <div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          className={`text-md font-semibold ${
            activeTab === 'casesAndCovers' ? 'text-white  bg-blue-400 p-3 rounded-full' : 'dark:text-white text-green-800'
          } hover:text-black focus:outline-none`}
          onClick={() => handleTabChange('casesAndCovers')}
        >
          Mobile Cases & Back Covers
        </button>
        <button
          className={`text-md font-semibold ${
            activeTab === 'accessories' ? 'text-white  bg-blue-400 p-3 rounded-full' : 'dark:text-white text-green-600'
          } hover:text-black focus:outline-none`}
          onClick={() => handleTabChange('accessories')}
        >
          Accessories
        </button>
      </div>

      <div className="md:grid-cols-4 grid-cols-2 grid mt-12 mx-4 gap-4">
        {activeData.map((category) => (
          <Link key={category._id} href={`/category/${category._id}`}>
            <div className="w-full max-w-sm bg-white border border-gray-200 shadow-md rounded-lg dark:shadow-sm dark:shadow-white dark:bg-gray-800 dark:border-gray-700">
              <div className="px-5 pb-5">
                <img
                  className="p-2 rounded-t-lg dark:rounded-2xl object-fill"
                  alt={category.image}
                  src={category.image}
                />
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {category.name}
                </h5>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹ {category.price}
                  </span>
                  <a
                    href="#"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
