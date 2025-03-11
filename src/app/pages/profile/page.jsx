"use client"
import Footer from '@/app/components/footer/page'
import Header from '@/app/components/header/page'
import React from 'react'
import Link from 'next/link'
import profileImg from "../../../../public/images/pro-img.png";
import MasonryGallery from '@/app/components/masonryGallery/page'

const Profile = () => {
    return (
        <>
            <div className="container-fluid p-0">
                <div className="profile-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">Single Profile</h1>
                                    <h3 className="text-white">
                                        Home
                                        <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i>
                                        Single Profile
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
                                    <div className="profileHeader"></div>
                                    <img
                                        src={profileImg.src}
                                        alt="Profile"
                                        className="profileImage"
                                    />
                                    <h3 className="text-center mt-3">Albert Don</h3>
                                    <p className="text-center">21 Years Old | Paris, France</p>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-danger">Get Premium</button>
                                    </div>
                                </div>
                                <div className="profileDetails">
                                    <h4>Base</h4>
                                    <hr />
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>Albert Don</td>
                                            </tr>
                                            <tr>
                                                <td>Birthday</td>
                                                <td>1998-01-19</td>
                                            </tr>
                                            <tr>
                                                <td>I am a</td>
                                                <td>Man</td>
                                            </tr>
                                            <tr>
                                                <td>Looking for</td>
                                                <td>Woman</td>
                                            </tr>
                                            <tr>
                                                <td>Marital Status</td>
                                                <td>Single</td>
                                            </tr>
                                            <tr>
                                                <td>Country</td>
                                                <td>France</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>Paris</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Right Details Section */}
                            <div className="col-md-8">
                                <div className="profileDetails">
                                    <h4>Myself Summary</h4>
                                    <hr />
                                    <p>
                                        I don’t like to talk too much to be honest and especially about
                                        myself. I am a man of actions, I do a lot of sports, I adore to
                                        travel and to see the world.
                                    </p>
                                </div>
                                <div className="profileGallery">
                                    <MasonryGallery />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Profile