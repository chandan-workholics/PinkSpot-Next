"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
const logoSrc = "/new-logo-cropped.png";
import { useRouter, usePathname } from 'next/navigation'
import CloseOffcanvasLink from '../CloseOffcanvasLink'

const Header = () => {
    const pathname = usePathname();

    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loggedOutLinks = [
        { href: "/", label: "Home", icon: "fa-house", active: pathname === "/" },
        { href: "/pricing", label: "Pricing", icon: "fa-dollar-sign", active: pathname.startsWith("/pricing") },
        { href: "/login?mode=signup", label: "Register", icon: "fa-user-plus", active: false },
        { href: "/login?mode=login", label: "Log In", icon: "fa-user", active: pathname.startsWith("/login") },
        { href: "/get-verified", label: "Get Verified", icon: "fa-shield-heart", active: pathname.startsWith("/get-verified") },
        { href: "/aboutus", label: "About Us", icon: "fa-circle-info", active: pathname.startsWith("/aboutus") },
        { href: "/contactus", label: "Contact Us", icon: "fa-envelope", active: pathname.startsWith("/contactus") },
    ];
    const loggedInLinks = [
        { href: "/", label: "Home", icon: "fa-house", active: pathname === "/" },
        { href: "/female-escorts/toronto", label: "Search Escorts", icon: "fa-magnifying-glass", active: pathname.startsWith("/search-escorts") || pathname.startsWith("/female-escorts") },
        { href: "/UserProfile", label: "My Profile", icon: "fa-circle-user", active: pathname.startsWith("/UserProfile") },
        { href: "/Wallet", label: "Wallet", icon: "fa-wallet", active: pathname.startsWith("/Wallet") },
        { href: "/subscription", label: "Subscription Plan", icon: "fa-crown", active: pathname.startsWith("/subscription") },
        { href: "/get-verified", label: "Get Verified", icon: "fa-shield-heart", active: pathname.startsWith("/get-verified") },
        { href: "/pricing", label: "Pricing", icon: "fa-dollar-sign", active: pathname.startsWith("/pricing") },
        { href: "/contactus", label: "Contact Us", icon: "fa-envelope", active: pathname.startsWith("/contactus") },
        { href: "/aboutus", label: "About Us", icon: "fa-circle-info", active: pathname.startsWith("/aboutus") },
    ];
    const navLinks = isAuthenticated ? loggedInLinks : loggedOutLinks;
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
                        <Link className="navbar-brand text-dd88cf me-0" href="/">
                            <img src={logoSrc} alt="Pinkspot.cc" className="" />
                        </Link>
                        <div className="d-flex align-items-center gap-2 d-lg-none">
                            {!isAuthenticated ? (
                                <button onClick={() => router.push("/login?mode=login")} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill py-2 text-capitalize me-0'>Log In</button>
                            ) : (<></>)}
                            <button className="btn d-block d-lg-none me-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                <i className="fa-solid fa-bars text-dd88cf fs-1"></i>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                {navLinks.map((item) => (
                                    <li className="nav-item" key={item.href}>
                                        <Link className={`nav-link ${item.active ? "active" : ""}`} href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex">
                                {!isAuthenticated ? (
                                    null
                                ) : (
                                    <>
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
                    <div className="offcanvas offcanvas-start w-75 pink-mobile-menu" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <div>
                                <CloseOffcanvasLink className="navbar-brand text-dd88cf pink-mobile-menu__brand" href="/">
                                    <img src={logoSrc} alt="" className="" />
                                </CloseOffcanvasLink>
                            </div>
                            <button type="button" className="pink-mobile-menu__close" data-bs-dismiss="offcanvas" aria-label="Close">
                                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                {navLinks.map((item) => (
                                    <li className="nav-item" key={item.href}>
                                        <CloseOffcanvasLink className={`nav-link ${item.active ? "active" : ""}`} href={item.href}>
                                            <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                                            {item.label}
                                        </CloseOffcanvasLink>
                                    </li>
                                ))}
                                {!isAuthenticated ? null : (
                                    <>
                                        <li className="nav-item">
                                            <div className="d-flex mt-3">
                                                <button onClick={() => router.push("/adpost")} className='btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill me-2'>
                                                    <i className="fa-solid fa-plus" aria-hidden="true"></i>
                                                    POST YOUR AD
                                                </button>
                                                <button onClick={handleLogout} className='btn btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill'>
                                                    <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                                                    LOGOUT
                                                </button>
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
