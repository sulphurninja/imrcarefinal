import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import Base from '@layouts/Baseof';
import { AnimatePresence, motion } from 'framer-motion'

const ServicePage = () => {
    const router = useRouter();
    const { serviceId } = router.query;
    const [service, setService] = useState();
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);

      const toggleModal = () => {
        setShowModal(!showModal);
    };


    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`/api/getServicesById?serviceId=${serviceId}`);
                setService(response.data.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchService();

    }, [serviceId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/Order', {
                serviceId,
                name,
                contactNumber,
                address,
            });

            // Handle success or navigate to a success page
            console.log('Order placed:', response.data);
            setService('');
            setName('');
            if (response.data.success) {
                toggleModal(); // Show the modal on success
            } 
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Base>
            <div className="container  mx-auto p-4">
                <h1 className="text-lg  text-black font-bold flex gap-2  mb-8">
                    <AiFillHome className='text-2xl' />

                    <Link href='/'>
                        <span className='cursor-pointer hover:underline'>Home /</span>
                    </Link>
                    {service?.name}
                </h1>

                <div className='mb-6 flex md:block'>
                    <h1 className='my-auto'>{service?.name}</h1>
                </div>

                <form className='mt-8 bg-white   w-full shadow-[0_5px_25px_-18px_rgba(0,0,0,0.3)] shadow-black p-5 rounded-xl' onSubmit={handleSubmit}>
                    <h1 className='text-lg text-center mb-6'> Place your order for {service?.name}</h1>
                    <div className='flex space-x-4 '>
                        <label htmlFor="userName">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            className='w-full rounded-2xl  bg-[#F3F4F6]'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex mt-4 space-x-4'>
                        <label htmlFor="contactNumber">Mob.No:</label>
                        <input
                            type="text"
                            id="contactNumber"
                            value={contactNumber}
                            className=' rounded-2xl w-full bg-[#F3F4F6]'
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex mt-4 space-x-4'>
                        <label htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            className='rounded-2xl w-full bg-[#F3F4F6]'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='block p-4 w-full  bg-[#2289C9] text-white rounded-xl mt-4'>Place Order</button>
                </form>
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-95 bg-[#EDEDEC] z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="">
                            <img src='/images/logo.png' className='h-20 ml-20' />
                                <h1 className="text-black text-xl pt-4 font-book font-bold text-center">
                                    Order Placed successfully!
                                </h1>
                                <button
                                    className="bg-[#2F374B] text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4"
                                    onClick={toggleModal}
                                >
                                    OK
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Base>
    );
};

export default ServicePage;
