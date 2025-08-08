"use client"
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import Image from 'next/image';
import MasonryGallery from '../../../components/masonryGallery/page'
import { useParams } from 'next/navigation'
import callAPI, { interceptor } from '../../../Common_Method/api'
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperPage from '../../../components/Swiper/page'

const Profile = () => {
    const [posts, setPosts] = useState(null);
    const { slug } = useParams();
    const [active, setActive] = useState();
    const [isActive, setIsActive] = useState("");
    const userid = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

    const getPost = useCallback(async () => {
        try {
            interceptor();
            const response = await callAPI.post(`/postad/getpostadby_single_slug`, { slug });

            if (response.data && response.data.data) {
                setPosts(response.data.data);
            } else {
                console.error("Unexpected response format", response);
            }
        } catch (error) {
            console.error("Error fetching post details", error);
        }
    }, [slug]);


    //add to favourite code 

    const favouriteClick = async (favouriteToPostid) => {
        try {
            setIsActive(favouriteToPostid);
            var favouriteByuserid = sessionStorage.getItem("userid");
            if (!favouriteByuserid) {
                alert("Please Login");
                return;
            }
            const response = await callAPI.post(`/postad/favouritesubmit`, { favouriteToPostid, favouriteByuserid });

            if (response.status == 200) {
                getPost();
            } else {
                console.error("Unexpected response format", response);
            }
        } catch (error) {
            console.error("Error fetching post details", error);
        }
    }

    //add to favourite code


    useEffect(() => {
        if (slug) {
            getPost();
        }
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, [slug, getPost]);




    return (
        <>
            <div className="container-fluid p-0">
                <div className="profile-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">User Profile</h1>
                                    <h3 className="text-white">
                                        Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i> User Profile
                                    </h3>
                                </div>
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
        </>
    )
}

export default Profile;

