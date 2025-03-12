"use client"

import Link from 'next/link'
import React from 'react'
import logo from '../../../../public/images/pink-logo.png'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter();
    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg px-5">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-dd88cf" href="#">
                            <img src={logo.src} alt="" className="w-100" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">Contact Us</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <button onClick={() => router.push("/pages/login")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'>LOG IN</button>
                                <button onClick={() => router.push("/pages/adpost")} className='btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill py-2 px-3'>POST YOUR AD</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header