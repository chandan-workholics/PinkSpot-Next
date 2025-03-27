"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Image from 'next/image';
import profileImg from "../../../public/images/pro-img.png";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import callAPI from '../Common_Method/api';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const UserProfile = () => {
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);

    const [isEditing, setIsEditing] = useState(false);
    const [posts, Setposts] = useState([{}]);
    const [showModal, setShowModal] = useState(false);
    const [myProfile, setMyProfile] = useState('')
    const router = useRouter();
    const usertoken = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    const userid = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;
    const [users, setUsers] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const [profile, setProfile] = useState({
        name: "Manish Kush5555",
        email: "manish.workholics@gmail.com",
        password: "adhjkjkdnjkv",
        phone: "8435360142",
        streetaddress: "Vijay Nagar",
        image: profileImg.src, // Default profile image profileImg.src
    });

    useEffect(() => {
        if (!usertoken) {
            router.push("/login");
        } else {
            fetchUserProfile();
            getpost();
            getMyProfile();
        }
    }, [usertoken]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDelete = async (_id) => {
        try {
            const response = await callAPI.DELETE(`/postad/deletepostadby_single_id/${_id}`);

            if (response.ok) {
                const data = await response.json();
                console.log("Post deleted:", data);
                getPost();
                setShowModal(false);
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };



    const handleUpdateClick = async () => {
        setIsEditing(false);
        console.log("Updated Profile:", profile);
        try {
            const response = await callAPI.post(`/users/updateprofile/${userid}`, {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                streetaddress: profile.streetaddress,
                image: profile.image,
                password: profile.password
            });
            if (response?.data?.success) {
                alert("Profile updated successfully!");
                fetchUserProfile();
            } else {
                alert("Profile updated successfully!")
            }
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        if (!e.target.files[0]) return;
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const response = await axios.post("http://206.189.130.102:4000/upload", formData);
            console.log("response of image :", response)
            if (response?.data?.url) {
                setProfile((prev) => ({ ...prev, image: response.data.url }));
            }
        } catch (error) {
            console.error("File upload error:", error);
        }
    };


    const fetchUserProfile = async () => {
        try {
            const response = await callAPI.get(`/users/${userid}`);
            if (response?.data) {
                setUsers(response?.data);
                setProfile({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    streetaddress: response.data.streetaddress,
                    image: response.data.image,
                });
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };


    const getpost = async () => {
        try {
            const response = await callAPI.get(`/postad/getfavpostbyuserid/${userid}`);

            if (response?.data) {
                Setposts(Array.isArray(response.data) ? response.data : []);
            } else {
                console.warn("No data received from API");
                Setposts([]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const getMyProfile = async () => {
        try {
            const response = await callAPI.get(`/postad/getpostadby_user_id/${userid}`);
            if (response?.data?.data) {
                setMyProfile(Array.isArray(response.data.data) ? response.data.data : []);
            } else {
                console.warn("No data received from API");
                setMyProfile([]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setMyProfile([]); // Set empty array to prevent rendering errors
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
                                        {users &&
                                            <div >
                                                <Image
                                                    src={users.image ? `${users.image}?t=${new Date().getTime()}` : profile.image}
                                                    alt="Profile"
                                                    width={150}
                                                    height={150}
                                                    className="profileImage"
                                                    key={users.image}
                                                />

                                                <h3 className="text-center mt-3">{users.name}</h3>
                                                <p className="text-center">
                                                    {users.streetaddress}, Province
                                                </p>
                                            </div>
                                        }
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
                                    {users &&
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '125px' }}>Name</td>
                                                    <td>
                                                        {isEditing ? (
                                                            <input type="text" name="name" value={profile.name} onChange={handleChange} className="form-control" />
                                                        ) : (
                                                            users.name
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '125px' }}>Email</td>
                                                    <td>
                                                        {isEditing ? (
                                                            <input type="email" name="email" value={profile.email} onChange={handleChange} className="form-control" />
                                                        ) : (
                                                            users.email
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Password</td>
                                                    <td>
                                                        {isEditing ? (
                                                            <div className="position-relative">
                                                                <input
                                                                    type={showPassword ? "text" : "password"}
                                                                    name="password"
                                                                    value={profile.password || ""}
                                                                    onChange={handleChange}
                                                                    className="form-control"
                                                                />
                                                                <span
                                                                    className="position-absolute end-0 top-50 translate-middle-y me-2"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                                </span>
                                                            </div>
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
                                                            users.phone
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Street address</td>
                                                    <td>
                                                        {isEditing ? (
                                                            <input type="text" name="streetaddress" value={profile.streetaddress} onChange={handleChange} className="form-control" />
                                                        ) : (
                                                            users.streetaddress
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
                                    }
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
                                                        {posts && posts.map((post, index) => (
                                                            <div key={index}>
                                                                <div className="rounded-5 overflow-hidden">
                                                                    <Image src={post?.image || profileImg.src} alt="Profile" width={150} height={150} className="img-fluid rounded-start w-100" />
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                            {posts && posts.map((post, index1) => (
                                                                <div key={index1}>
                                                                    <h5 className="card-title">{post.title || "NA"}</h5>
                                                                    <p className="card-text">{post.description || "NA"}</p>
                                                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                                                    <Link
                                                                        href={`/post/${post.slug}`}
                                                                        legacyBehavior
                                                                    >
                                                                        <a className="btn bg-4b164c text-white rounded-pill shadow">View Post</a>
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        {myProfile.length > 0 ? (
                                           myProfile.map((profile, indexx) => (
                                            <div key={indexx} className="card mb-3 shadow-sm bg-faedf8 border-0 rounded-5">
                                                <div className="row g-0">
                                                    <div className="col-md-3">
                                                        <div className="rounded-5 overflow-hidden">
                                                            <Image src={profile.image1} alt="Profile" width={150} height={150} className="img-fluid rounded-start w-100" />
                                                            <div className='ps-3'>
                                                                <p className="mb-0">Order Id : {profile.orderid}</p>
                                                                <p >Payment Status: {profile.paymentstatusdetail}</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                                <div className="card-body">
                                                                    <div>
                                                                        <h5 className="card-title">{profile.title} </h5>
                                                                        <p className="card-text">
                                                            {profile.description.length > 0
                                                                ? profile.description.substring(0, 200) + "..."
                                                                : profile.description}
                                                        </p>

                                                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago | City: {profile.city}</small></p>
                                                                        <Link href={`/viewAdd/${profile?.slug}`} className="btn bg-4b164c text-white rounded-pill shadow me-3">View Ad</Link>
                                                                        <button
                                                                            className="btn btn-danger rounded-pill shadow"
                                                                            onClick={() => setShowModal(true)}
                                                                        >
                                                                            Delete Post
                                                                        </button>
                                                                    </div>

                                                                    {/* Modal */}
                                                                    {showModal && (
                                                                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title">Confirm Deletion</h5>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn-close"
                                                                                            onClick={() => setShowModal(false)}
                                                                                        ></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <p>Do you really want to delete this post permanently?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-secondary"
                                                                                            onClick={() => setShowModal(false)}
                                                                                        >
                                                                                            No
                                                                                        </button>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-danger"
                                                                                            onClick={handleDelete}
                                                                                        >
                                                                                            Yes, Delete
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Modal Backdrop */}
                                                                    {showModal && <div className="modal-backdrop fade show"></div>}
                                                                </div>
                                                    </div>
                                                </div>
                                            </div>
                                             ))
                                            ) : (
                                              <p>No profile data available.</p>
                                            )}
                                        </div>

                                        <div className="tab-pane fade" id="nav-post" role="tabpanel" aria-labelledby="nav-post-tab">
                                            {myProfile.length > 0 ? (
                                                myProfile.map((profile, index) => (
                                                    <div key={index} className="card mb-3 shadow-sm bg-faedf8 border-0 rounded-5">
                                                        <div className="row g-0">
                                                            <div className="col-md-3">
                                                                <div className="rounded-5 overflow-hidden">
                                                                    <Image key={index} src={profile.image1} alt="Profile" width={150} height={150} className="img-fluid rounded-start w-100" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <div className="card-body">
                                                                    <div key={index}>
                                                                        <h5 className="card-title">{profile.title}</h5>
                                                                        <p className="card-text">
                                                                            {profile.description.length > 30
                                                                                ? profile.description.substring(0, 30) + "..."
                                                                                : profile.description}
                                                                        </p>

                                                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                                                        <Link href={`/myProfile1/${profile?.slug}`} className="btn bg-4b164c text-white rounded-pill shadow me-3">View Post</Link>
                                                                        <button
                                                                            className="btn btn-danger rounded-pill shadow"
                                                                            onClick={() => setShowModal(true)}
                                                                        >
                                                                            Delete Post
                                                                        </button>
                                                                    </div>
                                                                    {/* Modal */}
                                                                    {showModal && (
                                                                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title">Confirm Deletion</h5>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn-close"
                                                                                            onClick={() => setShowModal(false)}
                                                                                        ></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <p>Do you really want to delete this post permanently?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-secondary"
                                                                                            onClick={() => setShowModal(false)}
                                                                                        >
                                                                                            No
                                                                                        </button>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-danger"
                                                                                            onClick={handleDelete}
                                                                                        >
                                                                                            Yes, Delete
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Modal Backdrop */}
                                                                    {showModal && <div className="modal-backdrop fade show"></div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No profile data available.</p>
                                            )}
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

