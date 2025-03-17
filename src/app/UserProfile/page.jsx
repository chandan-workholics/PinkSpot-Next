"use client"

import React from 'react';
import Link from 'next/link'
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Image from 'next/image';
import profileImg from "../../../public/images/pro-img.png";

const UserProfile = () => {
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
                                <div className="profileCard">
                                    <div className="">
                                        <div className="profileHeader"></div>
                                        <Image src={profileImg.src} alt="Profile" width={150} height={150} className="profileImage" />
                                        <h3 className="text-center mt-3">postname</h3>
                                        <p className="text-center">postage Years Old | city, provincesid</p>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-warning text-white">Edit Profile</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileDetails">
                                    <h4>Details</h4>
                                    <hr />
                                    <table className="table">
                                        <tbody>
                                            <tr><td>Name</td><td>manish kush5555</td></tr>
                                            <tr><td>Email </td><td>manish.workholics@gmail.com</td></tr>
                                            <tr><td>Password</td><td>adhjkjkdnjkv</td></tr>
                                            <tr><td>Phone number</td><td>8435360142</td></tr>
                                            <tr><td>Street address / postal code (optional)</td><td>vijay nagar</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Right Details Section */}
                            <div className="col-md-8">
                                <div className="profileDetails">
                                    <nav>
                                        <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">My Favorites</button>
                                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Orders</button>
                                            <button className="nav-link" id="nav-post-tab" data-bs-toggle="tab" data-bs-target="#nav-post" type="button" role="tab" aria-controls="nav-post" aria-selected="false">My Post</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <div className="card mb-3 shadow-sm bg-faedf8 border-0 rounded-5">
                                                <div className="row g-0">
                                                    <div className="col-md-3">
                                                        <div className="rounded-5 overflow-hidden">
                                                            <Image src={profileImg.src} alt="Profile" width={150} height={150} className="img-fluid rounded-start w-100" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Card title</h5>
                                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                                            <Link href="/profile" className="btn bg-4b164c text-white rounded-pill shadow">View Post</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                            <p><strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, iure.</strong>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem nam id in aperiam, excepturi iste aliquam est ipsam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, recusandae? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, odio!</p>
                                        </div>
                                        <div className="tab-pane fade" id="nav-post" role="tabpanel" aria-labelledby="nav-post-tab">
                                            <div className="card mb-3 shadow-sm bg-faedf8 border-0 rounded-5">
                                                <div className="row g-0">
                                                    <div className="col-md-3">
                                                        <div className="rounded-5 overflow-hidden">
                                                            <Image src={profileImg.src} alt="Profile" width={150} height={150} className="img-fluid rounded-start w-100" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Card title</h5>
                                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                                            <Link href="/profile" className="btn bg-4b164c text-white rounded-pill shadow me-3">View Post</Link>
                                                            <Link href="/profile" className="btn btn-warning text-white rounded-pill shadow me-3">Edit Post</Link>
                                                            <Link href="/profile" className="btn btn-danger rounded-pill shadow">Delete Post</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default UserProfile