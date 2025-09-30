"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import callAPI, { interceptor } from "../../../Common_Method/api";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import MasonryGallery from "../../../components/masonryGallery/page";
import SwiperPage from "../../../components/Swiper/page";

const Profile = ({ post }) => {
    const router = useRouter();
    const [posts, setPosts] = useState(post);
    const [active, setActive] = useState();

    const userid = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

    const getPost = useCallback(async () => {
        try {
            interceptor();
            const response = await callAPI.post(`/postad/getpostadby_single_slug`, { slug: posts?.slug });
            if (response.data && response.data.data) setPosts(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [posts?.slug]);

    const favouriteClick = async (favouriteToPostid) => {
        try {
            const favouriteByuserid = sessionStorage.getItem("userid");
            if (!favouriteByuserid) return alert("Please Login");

            const response = await callAPI.post(`/postad/favouritesubmit`, { favouriteToPostid, favouriteByuserid });
            if (response.status === 200) getPost();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (posts?.slug) getPost();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [posts?.slug, getPost]);

    return (
        <div className="container-fluid p-0">
            <div className="profile-page">
                <div className='home-banner'>
                    <Header className="position-absolute w-100" />

                </div>
                <div className="">
                    <button
                        onClick={() => router.back()} // 🔹 navigate to previous page
                        className="btn btn-light shadow-sm m-3"
                    >
                        <i className="fa-solid fa-arrow-left me-2"></i> Back
                    </button>
                </div>

                <section className="container my-5">
                    <div className="row">
                        {/* Left Profile Card */}
                        <div className="col-md-4">
                            <div className="profileCard">
                                {posts && (
                                    <div>
                                        <div className="profileHeader"></div>
                                        <img
                                            src={posts.image1 ? posts.image1 : noImg.src}
                                            alt="Profile"
                                            className="profileImage"
                                            width={100}
                                            height={100}
                                        />
                                        <h3 className="text-center mt-3">{posts.name}</h3>
                                        <p className="text-center">{posts.age} | {posts.city}</p>
                                    </div>
                                )}

                                <div className="d-flex justify-content-center">
                                    {
                                        posts?.favouritepostbyuser?.includes(userid) ? (
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setActive(posts?._id);
                                                    favouriteClick(posts?._id);
                                                }}
                                            >
                                                Remove From Favourite
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    setActive(posts?._id);
                                                    favouriteClick(posts?._id);
                                                }}
                                            >
                                                Add To Favourite
                                            </button>
                                        )
                                    }
                                </div>


                            </div>
                            <div className="profileDetails">
                                <h4>Details</h4>
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
    );
};

export default Profile;
