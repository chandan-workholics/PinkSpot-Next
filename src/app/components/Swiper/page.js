"use client"
import Footer from '../../components/footer/page'
import Header from '../../components/header/page'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import homeSec2Img from "../../../../public/images/homeSec2-img.png";
import noImg from "../../../../public/images/no-img.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import callAPI, { interceptor } from '../../Common_Method/api'
import { useRouter } from "next/navigation"


const SwiperPage = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter()
    const maxLength = 10;
    const getPosts = async () => {
        try {
            interceptor();
            const response = await callAPI.post(`/postad/getallpostad_sort_desc`, { limit: "12" });
            if (response.data) {
                setPosts(response.data || []);
            } else {
                console.error("Unexpected response format", response);
                setPosts([]);
            }
        } catch (error) {
            console.error("Error fetching posts", error);
            setPosts([]);
        }
    };

    useEffect(() => {
        getPosts();
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, []);
    return (
        <div>
            <div className="home-section3 bg-faedf8 py-5">
                <div className="container">
                    <div className="row">
                        {/* Swiper start */}
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 4, spaceBetween: 40 },
                                1024: { slidesPerView: 4, spaceBetween: 50 },
                            }}
                            modules={[Pagination, Autoplay]}
                            className="mySwiper"
                        >
                            {Array.isArray(posts?.data) ? posts.data.map((post, index) => (
                                <SwiperSlide key={index}>
                                    <div className="effect-image-1">
                                        <Image
                                            src={post.image1 ? post.image1 : noImg.src}
                                            alt="Post Image"
                                            className="w-100"
                                        />
                                        <div className="simple-text">
                                            <p>{post.name}</p>
                                            <p>{post.city}</p>
                                        </div>
                                        {/* Added overlay to match the static design */}
                                        <div className="overlay-sim-text-2 overlay-xs-1">
                                            <p className="mb-1">
                                                {post.description.length > maxLength
                                                    ? `${post.description.slice(0, maxLength)}...`
                                                    : post.description}
                                            </p>
                                            {post.description.length > maxLength && (
                                                <Link
                                                    key={index}
                                                    href={`pinkspot/pages/profile/${post?.city.split(" ").join("-")}/${post?.slug}`}
                                                >
                                                    Read More
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )) : <p>No posts available</p>}
                        </Swiper>
                        {/* Slider end */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwiperPage
