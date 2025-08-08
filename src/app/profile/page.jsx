"use client"

import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Image from 'next/image';
import MasonryGallery from '../components/masonryGallery/page';
import profileImg from "../../../public/images/pro-img.png";
import callAPI, { interceptor } from '../Common_Method/api';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperPage from '../components/Swiper/page';

const Profile = () => {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [urlpath, SetUrlpath] = useState("");
    const maxLength = 80;

    const getPost = async () => {
        try {
            interceptor();

            if (!slug) {
                console.error("Slug is missing, cannot fetch post.");
                return;
            }
            const response = await callAPI.post(`/postad/getpostadby_single_slug`, { slug });

            if (response.data && response.data.data) {
                setPosts(response.data.data);
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
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, [slug]);

    useEffect(() => {
        const fullPath = window.location.href;
        SetUrlpath(fullPath);
    }, []);

    return (
        <div className="container-fluid p-0">
            <div className="profile-page">
                <div className='home-banner'>
                    <Header className="position-absolute w-100" />
                    <div className="container">
                        <div className="banner-content text-start">
                            <div className="">
                                <h1 className="text-white">Single Profile</h1>
                                <h3 className="text-white">
                                    Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i> Single Profile
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="container my-5">
                    <div className="row">
                        {/* Left Profile Card */}
                        <div className="col-md-4">
                            {posts?.data?.map((post) => (
                                <div key={post._id} className="profileCard">
                                    <Image src={post.image !== "" ? post.image : profileImg.src} alt="Profile" className="profileImage" />
                                    <h3 className="text-center mt-3">{post.name}</h3>
                                    <p className="text-center">{post.age} Years Old | {post.city}, {post.provincesid}</p>
                                    <div className="d-flex justify-content-center">
                                        {/* <button className="btn btn-danger">Get Premium</button> */}
                                    </div>
                                    <div className="profileDetails">
                                        <h4>Details</h4>
                                        <hr />
                                        <table className="table">
                                            <tbody>
                                                <tr><td>Name</td><td>{post.name}</td></tr>
                                                <tr><td>Birthday</td><td>{post.age}</td></tr>
                                                <tr><td>City</td><td>{post.city}</td></tr>
                                                <tr><td>Availability</td><td>{post.availability}</td></tr>
                                                <tr><td>Phone</td><td>{post.phone}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Right Details Section */}
                        <div className="col-md-8">
                            {posts?.data?.map((post) => (
                                <div key={post._id} className="profileDetails">
                                    <h4>Myself Summary</h4>
                                    <hr />
                                    <p>{post.description}</p>
                                    <div className="profileGallery">
                                        <MasonryGallery />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
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
                                        <Image src={post.image || Sec3SliderImg.src} alt="Post Image" className='w-100' />
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
                                                    href={`/profile/${post?.city.split(" ").join("-")}/${post?.slug}`}
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
            <div>
                <SwiperPage />
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
