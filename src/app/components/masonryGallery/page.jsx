'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import callAPI, { interceptor } from '../../Common_Method/api';

const MasonryGallery = () => {
    const { slug } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [posts, setPosts] = useState([]);

    const getPost = async () => {
        try {
            interceptor();

            if (!slug) {
                console.error("Slug is missing, cannot fetch post.");
                return;
            }

            const response = await callAPI.post(`/postad/getpostadby_single_slug`, { slug });

            if (response.data && response.data.data) {
                const postData = response.data.data;

                // Convert images to array (only non-empty ones)
                const imagesArray = Object.values({
                    image1: postData.image1,
                    image2: postData.image2,
                    image3: postData.image3,
                    image4: postData.image4,
                    image5: postData.image5,
                    image6: postData.image6,
                    image7: postData.image7,
                    image8: postData.image8,
                    image9: postData.image9,
                    image10: postData.image10,
                    image11: postData.image11,
                    image12: postData.image12,
                    image13: postData.image13,
                    image14: postData.image14,
                    image15: postData.image15,
                    image16: postData.image16,
                    image17: postData.image17,
                    image18: postData.image18,
                    image19: postData.image19,
                    image20: postData.image20,
                }).filter(img => img);

                setPosts(imagesArray);
            } else {
                console.warn("No data found for slug:", slug);
                setPosts([]);
            }
        } catch (error) {
            console.error("Error fetching post details:", error);
            setPosts([]);
        }
    };
    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            <div className="masonryGallery">
                <div className="gallery gap-3">
                    {posts.map((img, index) => (
                        <div key={index} className="galleryItem position-relative" onClick={() => setSelectedImage(img)}>
                            <img
                                src={img}
                                alt={img.title}
                                width={400}
                                height={300}
                                className="img-fluid rounded"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div className="preview position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" onClick={() => setSelectedImage(null)}>
                        <div className="previewContent p-3 rounded">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                width={800}
                                style={{ maxHeight: "80vh", objectFit: "contain" }}
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
