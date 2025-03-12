"use client"
import Footer from '@/app/components/footer/page'
import Header from '@/app/components/header/page'
import React from 'react'
import Link from 'next/link'
import homeSec2Img from "../../../../public/images/homeSec2-img.png";
import Sec3SliderImg from "../../../../public/images/sec3-sliderImg.png";
// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';


const HomePage = () => {
    return (
        <>
            <div className="container-fluid p-0">
                <div className="home-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-center">
                                <div className="">
                                    <h1 className="text-white">Welcome To
                                        <span className="text-dd88cf"> Pink Spot</span><br />
                                        Choose Your Vibe
                                    </h1>
                                    <h3 className="text-white fw-normal">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
                                    <Link href="/" className='btn bg-dd88cf text-4b164c fw-semibold rounded-pill py-2 px-3 mt-5'>Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-section2 bg-dd88cf">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={homeSec2Img.src} alt="" className="w-100 bounceImg" />
                                </div>
                                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                                    <div className="">
                                        <h2 className="text-white text-center fw-bolder">Lorem ipsum dolor sit amet.</h2>
                                        <h5 className="text-white text-center fw-normal">ipsum dolor sit amet consectetur adipisicing.</h5>
                                    </div>
                                </div>
                                <div className="col-lg-3 d-flex justify-content-end align-items-center">
                                    <button className="btn btn-register text-dd88cf bg-fcf3fa rounded-pill py-2 px-4 fw-semibold">Register Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-section3 bg-faedf8 py-5">
                        <div className="container">
                            <div className="row">
                                {/* Slider start */}
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 40,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    modules={[Pagination, Autoplay]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="effect-image-1">
                                            <img src={Sec3SliderImg.src} alt="image-1" className='w-100' />
                                            <div className="simple-text">
                                                <p>Web-designer</p>
                                                <p>lorem text ipsum</p>
                                            </div>
                                            <div className="overlay-sim-text-2 overlay-xs-1">
                                                <p>lorem ipsum text init lorem ipsum text init</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                {/* Slider end */}
                            </div>
                        </div>
                    </div>
                    <div className="home-section4">
                        <section className="container my-5">
                            <div className="row align-items-center">
                                <div className="col-md-5">
                                    <h2 className="fw-bold">
                                        Enjoy This Our <br /> <span className="text-dd88cf">Special</span> Features
                                    </h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
                                        repudiandae odit dolorem quis laudantium impedit beatae perferendis
                                        natus, hic libero sed atque.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
                                        repudiandae odit dolorem quis laudantium impedit beatae perferendis
                                        natus, hic libero sed atque.
                                    </p>
                                    <button className="btn bg-dd88cf text-white">
                                        Learn More <span>&raquo;</span>
                                    </button>
                                </div>
                                <div className="col-md-7">
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
                </div>
                <Footer />
            </div>
        </>
    )
}

export default HomePage