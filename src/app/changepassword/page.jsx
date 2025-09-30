"use client"

import React, { useState } from "react";
import Link from 'next/link'
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import changepassword from '../../../public/images/changepassword.png';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'


const UserProfile = () => {
    const router = useRouter();
    const [password, setPassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const userid = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

    const handleSubmitChangePassword = () => {
        const postURL = `https://pinkspot.cc/api/v1/users/change-password`;
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: userid,
                currentPassword: password,
                newPassword: newpassword
            })
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status === 200) {
                    window.alert("Password changed successfully");
                    sessionStorage.clear();
                    router.push("/login");
                } else {
                    alert(data.message || "Something went wrong");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error changing password");
            });
    };

    return (
        <>
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

                    <div className="container my-5 px-4">
                        <div className="row shadow-lg bg-white rounded-5">

                            {/* Left Side Image */}
                            <div className="col-12 col-md-6 col-lg-5 mx-auto">
                                <img
                                    src={changepassword.src}
                                    alt="Change Password Illustration"
                                    className="img-fluid w-100"
                                    style={{ objectFit: "cover", height: "100%" }}
                                />
                            </div>

                            {/* Right Side Form */}
                            <div className="col-12 col-md-6 col-lg-5 mx-auto d-flex align-items-center">
                                <div className="w-100">
                                    <h3 className="mb-4 text-center">Change Password</h3>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Old Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter Old Password"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="newpassword" className="form-label">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter New Password"
                                                id="newpassword"
                                                onChange={(e) => setNewpassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                className="btn bg-4b164c text-white w-100 rounded-pill px-4 mb-4"
                                                onClick={handleSubmitChangePassword}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}

export default UserProfile

