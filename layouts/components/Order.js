import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Order() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/getCategories');
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    console.log(categories, 'categories')

    return (
        <>
            <div className='text-black dark:bg-[#ffffff] rounded-2xl dark:p-4 text-lg mb-4 mt-12 '>
                <p className='text-cyan-950 md:text-3xl text-center font-bold' >How to book?  </p>
                <p className='text-cyan-700 text-lg mb-10 text-center'>IMR Care Service Center</p>
                <div className='grid grid-cols-3 justify-items-center font-bold'>
                    <div className='grid justify-items-center text-sm md:text-lg'>
                        <img src='whyIMRC/booking.png' className='hover:bg-blue-600 hover:rounded-2xl hover:p-1 m-2 hover:text-white h-8 md:h-20 ' />
                        <p className="text-sm md:text-lg">Book Your Repair</p></div>
                    <div className='grid justify-items-center text-sm md:text-lg'><img src='whyIMRC/expert.png' className='hover:bg-blue-600 hover:rounded-2xl hover:p-1 m-2 hover:text-white h-12 md:h-20' /><p>Expert Visit</p></div>
                    <div className='grid justify-items-center text-sm md:text-lg'><img src='whyIMRC/pay.png' className='hover:bg-blue-600 hover:rounded-2xl hover:p-1 m-2 hover:text-white h-12 md:h-20' /><p>Repair & Pay</p></div>

                </div>
                <p className='text-cyan-950 bg-[#f7f7f7] rounded py-4 text-4xl text-center mt-12  font-bold' >Book Now 👇  </p>

            </div>

            <div className="bg-gray-700  rounded-2xl  w-full  section">
                <h1 className='text-white text-center'>🛒 Select Your Mobile Brand</h1>
                <div className='grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 mt-12 mx-4 gap-4 '>
                    {categories.map((category) => (
                        <Link key={category._id} href={`/category/${category._id}`}>
                            <div className='bg-white rounded-2xl text-black shadow-white shadow-sm hover:-mt-2  '>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="object-fill h-32 w-full rounded-2xl "
                                />

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}


