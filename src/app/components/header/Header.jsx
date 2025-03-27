"use client"

import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import logo from '../../../../public/images/pink-logo.png'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '../../Common_Method/protectedroute'

const Header = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = sessionStorage.getItem("token"); 
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token"); 
        setIsAuthenticated(false);
        router.push("/login");
    };


    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg px-5">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-dd88cf" href="/">
                            <img src={logo.src} alt="" className="w-100" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/login">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/contactus">Contact Us</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                            {!isAuthenticated ? (
                                    <button onClick={() => router.push("/login")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'>LOG IN</button>
                                ) : (
                                    <>
                                    <button onClick={handleLogout} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'>LOGOUT</button>
                                    <button onClick={() => router.push("/UserProfile")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'>MY PROFILE</button>
                                    <button onClick={() => router.push("/adpost")} className='btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill py-2 px-3'>POST YOUR AD</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header