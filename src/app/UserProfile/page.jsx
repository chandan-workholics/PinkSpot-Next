"use client"

import React, { useState } from 'react';
import Link from 'next/link'
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Image from 'next/image';
import profileImg from "../../../public/images/pro-img.png";

const UserProfile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Manish Kush5555",
        email: "manish.workholics@gmail.com",
        password: "adhjkjkdnjkv",
        phone: "8435360142",
        address: "Vijay Nagar",
        image: profileImg.src, // Default profile image
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = () => {
        setIsEditing(false);
        console.log("Updated Profile:", profile);
        // API call can be added here to save updated profile data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, image: imageUrl }));
        }
    };

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
                                    <div>
                                        <div className="profileHeader"></div>
                                        <Image src={profile.image} alt="Profile" width={150} height={150} className="profileImage" />
                                        <h3 className="text-center mt-3">Postname</h3>
                                        <p className="text-center">Postage Years Old | City, Province</p>
                                        <div className="d-flex justify-content-center">
                                            {isEditing ? (
                                                <button className="btn btn-success text-white" onClick={handleUpdateClick}>
                                                    Update Profile
                                                </button>
                                            ) : (
                                                <button className="btn btn-warning text-white" onClick={handleEditClick}>
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="profileDetails">
                                    <h4>Details</h4>
                                    <hr />
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '125px' }}>Name</td>
                                                <td>
                                                    {isEditing ? (
                                                        <input type="text" name="name" value={profile.name} onChange={handleChange} className="form-control" />
                                                    ) : (
                                                        profile.name
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '125px' }}>Email</td>
                                                <td>
                                                    {isEditing ? (
                                                        <input type="email" name="email" value={profile.email} onChange={handleChange} className="form-control" />
                                                    ) : (
                                                        profile.email
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Password</td>
                                                <td>
                                                    {isEditing ? (
                                                        <input type="password" name="password" value={profile.password} onChange={handleChange} className="form-control" />
                                                    ) : (
                                                        "********"
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone number</td>
                                                <td>
                                                    {isEditing ? (
                                                        <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="form-control" />
                                                    ) : (
                                                        profile.phone
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Street address</td>
                                                <td>
                                                    {isEditing ? (
                                                        <input type="text" name="address" value={profile.address} onChange={handleChange} className="form-control" />
                                                    ) : (
                                                        profile.address
                                                    )}
                                                </td>
                                            </tr>
                                            {isEditing && (
                                                <tr>
                                                    <td>Profile Image</td>
                                                    <td>
                                                        <input type="file" accept="image/*" className="form-control mt-2 shadow-none" onChange={handleImageChange} />
                                                    </td>
                                                </tr>
                                            )}
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