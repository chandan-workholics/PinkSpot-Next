"use client"
import Footer from '@/app/components/footer/page'
import Header from '@/app/components/header/page'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import MasonryGallery from '@/app/components/masonryGallery/page'
import { useParams } from 'next/navigation'
import callAPI, { interceptor } from '@/app/Common_Method/api'
import { Pagination, Autoplay } from 'swiper/modules';
import Sec3SliderImg from "../../../../../../public/images//sec3-sliderImg.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperPage from '@/app/components/Swiper/page'

const Profile = () => {
    const [posts, setPosts] = useState(null);  // Fixed: Use null or []
    const [data, setData] = useState([]);
    const [urlpath, SetUrlpath] = useState("");
    const [seotitle, Setseotitle] = useState("");
    const [seodescription, Setseodescription] = useState("");
    const [seoimage, Setseoimage] = useState("");
    const [seokeywords, Setseokeywords] = useState("");
    const { slug } = useParams();
    const maxLength = 10;

    const getPost = useCallback(async () => {
        try {
            interceptor();
            const response = await callAPI.post(`/postad/getpostadby_single_slug`, { slug });

            if (response.data && response.data.data) {
                const postData = response.data.data;
                setPosts(postData);  // Fixed: No need for posts?.data
                Setseotitle(postData?.metatitle || "Default Title");
                Setseodescription(postData?.metadescription || "Default Description");
                Setseoimage(postData?.image1 || "default-image-url");
                Setseokeywords(postData?.keywords || "");
            } else {
                console.error("Unexpected response format", response);
            }
        } catch (error) {
            console.error("Error fetching post details", error);
        }
    }, [slug]);

    const getData = async () => {
        try {
            interceptor();
            const response = await callAPI.post(`/postad/getallpostad_sort_desc`, { limit: "50" });

            if (response.data) {
                setData(response.data.data || []);
            } else {
                console.error("Unexpected response format", response);
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching posts", error);
            setData([]);
        }
    };

    useEffect(() => {
        if (slug) {
            getPost();
        }
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, [slug, getPost]);

    useEffect(() => {
        getData();
        SetUrlpath(window.location.href);
    }, []);

    return (
        <>
            <div className="container-fluid p-0">
                <div className="profile-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <h1 className="text-white">Single Profile</h1>
                                <h3 className="text-white">
                                    Home
                                    <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i>
                                    Single Profile
                                </h3>
                            </div>
                        </div>
                    </div>

                    <section className="container my-5">
                        <div className="row">
                            {/* Left Profile Card */}
                            <div className="col-md-4">
                                <div className="profileCard">
                                    {posts && (
                                        <div>
                                            <div className="profileHeader"></div>
                                            <Image
                                                src={posts.image1}
                                                alt="Profile"
                                                className="profileImage"
                                            />
                                            <h3 className="text-center mt-3">{posts.name}</h3>
                                            <p className="text-center">{posts.age} | {posts.city}</p>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-danger">Get Premium</button>
                                    </div>
                                </div>
                                <div className="profileDetails">
                                    <h4>Base</h4>
                                    <hr />
                                    {posts && (
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{posts.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ethnicity</td>
                                                    <td>{posts.ethicity}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone</td>
                                                    <td>{posts.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Age</td>
                                                    <td>{posts.age}</td>
                                                </tr>
                                                <tr>
                                                    <td>Availability</td>
                                                    <td>{posts.availability}</td>
                                                </tr>
                                                <tr>
                                                    <td>Title</td>
                                                    <td>{posts.title}</td>
                                                </tr>
                                                <tr>
                                                    <td>City</td>
                                                    <td>{posts.city}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            {/* Right Details Section */}
                            <div className="col-md-8">
                                <div className="profileDetails">
                                    <h4>Myself Summary</h4>
                                    <hr />
                                    <p>
                                        {posts ? posts.description : "No description available."}
                                    </p>
                                </div>
                                <div className="profileGallery">
                                    <MasonryGallery />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div>
                    <SwiperPage />

                </div>
                <Footer />
            </div >
        </>
    )
}

export default Profile;
