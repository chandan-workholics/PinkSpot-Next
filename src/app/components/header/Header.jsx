"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import logo from '../../../../public/images/pink-logo.png'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import CloseOffcanvasLink from '../CloseOffcanvasLink'

const Header = () => {
    const pathname = usePathname();

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

    const handleNavClick = (href) => {
        if (href !== pathname) {
            router.push(href);
        }

        // Close Bootstrap offcanvas (if open)
        const offcanvasElement = document.querySelector('.offcanvas.show');
        if (offcanvasElement && window.bootstrap) {
            const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    };


    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg px-0 px-xl-5">
                    <div className="container-fluid p-0">
                        <Link className="navbar-brand text-dd88cf" href="/">
                            <img src={logo.src} alt="" className="" />
                        </Link>
                        <button className="btn d-block d-lg-none me-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <i className="fa-solid fa-circle-user text-dd88cf fs-1"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} aria-current="page" href="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${pathname.startsWith("/aboutus") ? "active" : ""}`} href="/aboutus">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${pathname.startsWith("/contactus") ? "active" : ""}`} href="/contactus">Contact Us</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                {!isAuthenticated ? (
                                    <>
                                        <Link className="btn btn-login text-4b164c bg-ffdef7 fw-semibold rounded-pill me-3 py-2 px-3"
                                            href="/allCategory?from=header">
                                            Search Escorts
                                        </Link>
                                        <button onClick={() => router.push("/login?mode=login")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'>LOG IN</button>
                                        <button onClick={() => router.push("/login?mode=signup")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'>Signup</button>
                                    </>
                                ) : (
                                    <>
                                        <Link className="btn btn-login text-4b164c bg-ffdef7 fw-semibold rounded-pill me-3 py-2 px-3"
                                            href="/allCategory?from=header">
                                            Search Escorts
                                        </Link>
                                        <button onClick={() => router.push("/adpost")} className='btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill py-xxl-2 px-xxl-3 me-3'>POST YOUR AD</button>

                                        <div className="dropdown">
                                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-circle-user text-dd88cf fs-1"></i>
                                            </Link>
                                            <ul className="dropdown-menu rounded-3 end-0 mt-2" style={{ left: "auto" }}>

                                                <li>
                                                    <button onClick={() => router.push("/UserProfile")} className="dropdown-item">MY PROFILE</button>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <button onClick={() => router.push("/Wallet")} className="dropdown-item">WALLET</button>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <button onClick={handleLogout} className="dropdown-item bg-white text-danger fw-normal">LOGOUT
                                                        <i className="fa-solid fa-right-from-bracket text-danger ms-2"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile-View */}
                <div className="d-block d-lg-none">
                    <div className="offcanvas offcanvas-start w-75" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <div className="">
                                <CloseOffcanvasLink className="navbar-brand text-dd88cf" href="/">
                                    <img src={logo.src} alt="" className="" />
                                </CloseOffcanvasLink>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <CloseOffcanvasLink className={`nav-link ${pathname === "/" ? "active" : ""}`} aria-current="page" href="/" >Home</CloseOffcanvasLink>
                                </li>
                                <li className="nav-item">
                                    <CloseOffcanvasLink className={`nav-link ${pathname.startsWith("/aboutus") ? "active" : ""}`} aria-current="page" href="/aboutus">About Us</CloseOffcanvasLink>
                                </li>
                                <li className="nav-item">
                                    <CloseOffcanvasLink className="nav-link" href="/login">Register</CloseOffcanvasLink>
                                </li>
                                <li className="nav-item">
                                    <CloseOffcanvasLink className={`nav-link ${pathname.startsWith("/contactus") ? "active" : ""}`} href="/contactus">Contact Us</CloseOffcanvasLink>
                                </li>
                                <li className="nav-item d-none d-lg-block">
                                    <CloseOffcanvasLink className="btn btn-login text-4b164c bg-fcf3fa fw-semibold rounded-pill my-3 py-2 px-3 mb-3"
                                        href="/allCategory?from=header">
                                        Search Escorts
                                    </CloseOffcanvasLink>
                                </li>
                                {!isAuthenticated ? (
                                    <li className="nav-item">
                                        <button onClick={() => router.push("/login")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill py-2 px-3'>LOG IN</button>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <CloseOffcanvasLink
                                                className={`nav-link ${pathname.startsWith("/subscription") ? "active" : ""}`}
                                                href="/subscription">
                                                Subscription Plan
                                            </CloseOffcanvasLink>
                                        </li>
                                        <li className="nav-item">
                                            <CloseOffcanvasLink
                                                className={`nav-link ${pathname.startsWith("/UserProfile") ? "active" : ""}`}
                                                href="/UserProfile">
                                                My Profile
                                            </CloseOffcanvasLink>
                                            {/* <div onClick={() => router.push("/UserProfile")} className='nav-link' style={{ cursor: "pointer" }}>My Profile</div> <br /> */}
                                        </li>
                                        <li className="nav-item">
                                            <CloseOffcanvasLink
                                                className={`nav-link ${pathname.startsWith("/Wallet") ? "active" : ""}`}
                                                href="/Wallet">
                                                Wallet
                                            </CloseOffcanvasLink>
                                            {/* <div onClick={() => router.push("/Wallet")} className='nav-link' style={{ cursor: "pointer" }}>Wallet</div> <br /> */}
                                        </li>
                                        <li className="nav-item d-block d-lg-none">
                                            <CloseOffcanvasLink className="btn btn-login text-4b164c bg-fcf3fa fw-semibold rounded-pill mt-3 py-2 px-3"
                                                href="/allCategory?from=header">
                                                Search Escorts
                                            </CloseOffcanvasLink>
                                        </li>
                                        <li className="nav-item">
                                            <div className="d-flex mt-3">
                                                <button onClick={() => router.push("/adpost")} className='btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill me-2'>POST YOUR AD</button>
                                                <button onClick={handleLogout} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill'>LOGOUT</button>
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header