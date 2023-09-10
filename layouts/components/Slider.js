import React, { useEffect, useRef } from 'react';

const Slider = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        let scrollInterval;

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                container.scrollLeft += 2; // Adjust the scroll speed as needed
            }, 20); // Adjust the scroll delay as needed
        };

        const stopScroll = () => {
            clearInterval(scrollInterval);
        };

        container.addEventListener('mouseenter', startScroll);
        container.addEventListener('mouseleave', stopScroll);

        return () => {
            container.removeEventListener('mouseenter', startScroll);
            container.removeEventListener('mouseleave', stopScroll);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ scrollBehavior: 'auto',  }} className= 'md:block flex md:overflow-hidden md:overflow-x-hidden space-y-4 overflow-scroll mt-4'>
            <img src="whyIMRC/img-1.jpg" alt="Image 1" style={{ marginRight: '10px' }} className='p-2 bg-black ' />
            <img src="whyIMRC/img-2.jpg" alt="Image 2" style={{ marginRight: '10px' }} className='p-2 bg-black ' />
            <img src="whyIMRC/img-3.jpg" alt="Image 3" style={{ marginRight: '10px' }} className='p-2 bg-black ' />
            <img src="whyIMRC/img-4.jpg" alt="Image 1" style={{ marginRight: '10px' }} className='p-2 bg-black ' />
        </div>
    );
};

export default Slider;