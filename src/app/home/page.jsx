"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import noImg from "../../../public/images/no-img.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import callAPI, { interceptor } from '../Common_Method/api'
import dynamic from 'next/dynamic';
const Header = dynamic(() => import("../components/header/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/footer/Footer"), { ssr: false });
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const maxLength = 90;

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
        <>
            <div className="container-fluid p-0">
                <div className="home-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-center">
                                <div className="" data-aos="fade-up" data-aos-duration="1000">
                                    <h1 className="text-white">Welcome To
                                        <span className="text-dd88cf"> Pink Spot</span><br />
                                        Choose Your Vibe
                                    </h1>
                                    <h3 className="text-white fw-normal">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
                                    <Link href="/allCategory" className='btn bg-dd88cf text-4b164c fw-semibold rounded-pill py-2 px-3 mt-5'>Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-section3 bg-faedf8 py-5">
                        <div className="container">
                            <div className="row" data-aos="zoom-in-up" data-aos-duration="1000">
                                {/* Swiper start */}
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    pagination={{
                                        clickable: true,
                                    }}
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
                                    className="mySwiper pb-5"
                                >
                                    {Array.isArray(posts?.data) ? posts.data.map((post, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="effect-image-1">
                                                {post?.image1 == "" || null ?
                                                    <img src={noImg.src} alt="Post Images" className='w-100' /> :
                                                    <img src={post.image1} alt="Post Image" className='w-100' />
                                                }

                                                <div className="simple-text">
                                                    <p>{post.name}</p>
                                                    <p>{post.city}</p>
                                                </div>
                                                {/* Added overlay to match the static design */}
                                                <div className="overlay-sim-text-2 overlay-xs-1 d-flex align-items-center">
                                                    <div className="">
                                                        <p className="mb-1">
                                                            {post.description.length > maxLength
                                                                ? `${post.description.slice(0, maxLength)}...`
                                                                : post.description}
                                                        </p>
                                                        {post.description.length > maxLength && (
                                                            <Link
                                                                className='btn bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'
                                                                key={index}
                                                                href={`/profile/${post?.city.split(" ").join("-")}/${post?.slug}`}
                                                            >
                                                                Read More
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )) : <p>No posts available</p>}
                                </Swiper>
                                {/* Slider end */}
                            </div>
                        </div>
                    </div>
                    <div className="home-section4">
                        <section className="container my-5">
                            <div className="row align-items-center">
                                <div className="col-md-5 mb-4 mb-lg-0" data-aos="fade-right" data-aos-duration="1800">
                                    <h2 className="fw-bold text-center text-lg-start">
                                        Enjoy This Our <br /> <span className="text-dd88cf">Special</span> Features
                                    </h2>
                                    <p className='text-center text-lg-start'>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
                                        repudiandae odit dolorem quis laudantium impedit beatae perferendis
                                        natus, hic libero sed atque.
                                    </p>
                                    <p className='text-center text-lg-start'>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
                                        repudiandae odit dolorem quis laudantium impedit beatae perferendis
                                        natus, hic libero sed atque.
                                    </p>
                                    <div className="d-flex">
                                        <Link href='/allCategory' className="mx-auto ms-lg-0 btn bg-dd88cf text-white">
                                            Learn More <span>&raquo;</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-7" data-aos="fade-left" data-aos-duration="2000">
                                    <div className="row g-4">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <div className="">
                                                <div className="cardFeature">
                                                    <i className="fa-solid fa-user-tie text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Profile Verification</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                                <div className="cardFeature">
                                                    <i className="fa-solid fa-comments text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Communication</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center">
                                            <div className="">
                                                <div className="cardFeature">
                                                    <i className="fa-brands fa-web-awesome text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Premium Features</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                                <div className="cardFeature active">
                                                    <i className="fa-solid fa-user-shield text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Safety Guaranty</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                                <div className="cardFeature">
                                                    <i className="fa-solid fa-globe text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Connect With Near</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="home-section5">
                        <h1>Gallery Images</h1>
                        <section>
                            <div className="gallery gallery-left">
                                <div className="left">
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                </div>
                                <div className="left">
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                </div>
                            </div>
                            <div className="gallery gallery-center">
                                <div className="center">
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1"
                                        alt="" loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1"
                                        alt="" loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                </div>
                                <div className="center">
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1"
                                        alt="" loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1"
                                        alt="" loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                </div>
                            </div>
                            <div className="gallery gallery-right">
                                <div className="right">
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1"
                                        alt="" loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg"
                                        className="box box1" alt="" loading="lazy" />
                                </div>
                                <div className="right">
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1" alt=""
                                        loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg" className="box box1"
                                        alt="" loading="lazy" />
                                    <img src="https://cdn.pixabay.com/photo/2024/06/24/04/05/woman-8849047_640.jpg"
                                        className="box box1" alt="" loading="lazy" />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default HomePage;
