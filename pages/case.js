import Base from '@layouts/Baseof'
import axios from 'axios';
import React from 'react'

export default function Case() {

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

    return (
        <Base>
          
        </Base>
    )
}
