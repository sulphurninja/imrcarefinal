import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Base from '@layouts/Baseof';
import { AiFillHome } from 'react-icons/ai';


const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`/api/getSubCategories?categoryId=${categoryId}`);
        setSubcategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(`/api/getCategoriesById?categoryId=${categoryId}`);
        setCategoryName(response.data.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    if (categoryId) {
      fetchSubcategories();
      fetchCategoryName();
    }
  }, [categoryId]);

  if (!categoryId) {
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
          {categoryName}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  text-center">
          {subcategories.map((subcategory) => (
            <Link key={subcategory._id} href={`/subcategory/${subcategory._id}`}>
              <div className="block rounded-lg overflow-hidden hover:shadow-md dark:shadow-white  transform hover:scale-105 ">
                <div
                  className="relative h-48 w-full"
                  style={{
                    perspective: '800px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    style={{
                      transform: 'rotateY(20deg) translateZ(50px)',
                    }}
                  />
                </div>
                <div className="p-4 ">
                  <h2 className="lg:text-xl text-xs  hover:text-amber-300 text-black font-semibold mb-2">{subcategory.name}</h2>
                  <p className="text-gray-600">{subcategory.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default CategoryPage;
