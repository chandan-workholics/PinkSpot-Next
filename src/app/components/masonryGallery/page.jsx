'use client';

import React, { useState } from 'react';

const images = [
    {
        src: '/images/m1.jpg'
    },
    {
        src: '/images/m2.jpg'
    },
    {
        src: '/images/m3.jpg'
    },
    {
        src: '/images/m4.jpg'
    },
    {
        src: '/images/m5.jpg'
    },
    {
        src: '/images/m6.jpg'
    },
    {
        src: '/images/m7.jpg'
    },
    
];

const MasonryGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <div className="masonryGallery">
                {/* <h1 className="text-center text-primary">Inspiring Gallery</h1> */}
                <div className="gallery gap-3">
                    {images.map((img, index) => (
                        <div key={index} className="galleryItem position-relative" onClick={() => setSelectedImage(img)}>
                            <img 
                                src={img.src} 
                                alt={img.title} 
                                width={400} 
                                height={300} 
                                className="img-fluid rounded"
                                style={{ objectFit: 'cover' }} // Ensures proper display
                            />
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div className="preview position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" onClick={() => setSelectedImage(null)}>
                        <div className="previewContent p-3 rounded">
                            <img 
                                src={selectedImage.src} 
                                alt="Preview" 
                                width={800} 
                                style={{maxHeight:"80vh", objectFit:"contain"}} 
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MasonryGallery;
