import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import Base from '@layouts/Baseof';

const SubCategoryPage = () => {
    const router = useRouter();
    const { subcategoryId } = router.query;
    const [services, setServices] = useState([]);
    const [subcategoryName, setSubCategoryName] = useState('');
    const [subcategory, setSubcategory] = useState();
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`/api/getServices?subcategoryId=${subcategoryId}`);
                setServices(response.data.data);
                console.log(services, 'services');
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSubcategoryName = async () => {
            try {
                const response = await axios.get(`/api/getSubcategoriesNameById?subcategoryId=${subcategoryId}`);
                setSubCategoryName(response.data.data.name);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchSubcategory = async () => {
            try {
                const response = await axios.get(`/api/getSubCategoriesById?subcategoryId=${subcategoryId}`);
                setSubcategory(response.data.data);

            } catch (error) {
                console.error(error);
            }
        };

        if (subcategoryId) {
            fetchServices();
            fetchSubcategory();
            fetchSubcategoryName();
        }
    }, [subcategoryId]);

    if (!subcategoryId) {
        return <div>Loading...</div>;
    }

    return (
        <Base>
            <div className="container  mx-auto p-4">
                <h1 className="text-lg  text-black font-bold flex gap-2  mb-8">
                    <AiFillHome className='text-2xl' />

                    <Link href='/'>
                        <span className='cursor-pointer hover:underline'>Home /</span>
                    </Link>
                    {subcategory?.name}
                </h1>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-coffee text-center">
                    <div className='mb-6 flex md:block'>
                    <h1 className='my-auto'>{subcategory?.name}</h1>

                        <img className='md:w-full w-1/2' src={subcategory?.image} />
                    </div>

                    <div>
                        <h1 className='font-thin p-4'>Select Your Issue:</h1>
                        <div className='grid grid-cols-2 '>
                        
                            {services?.map((service) => (
                                <Link key={service._id} href={`/service/${service._id}`}>
                                <div className="p-4 border-2 rounded-2xl cursor-pointer hover:shadow-md shadow-green-400 dark:hover:-mt-2 ">
                                    <h2 className="text-lg text-black dark:text-white font-semibold mb-2">{service.name}</h2>
                                    <p className="text-gray-600 dark:text-white">{service.description}</p>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default SubCategoryPage;
