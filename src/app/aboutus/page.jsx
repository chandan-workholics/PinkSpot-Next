import React from 'react'
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Link from 'next/link'
import modelImg1 from "../../../public/images/m7.jpg";
import modelImg2 from "../../../public/images/m2.jpg";
import modelImg3 from "../../../public/images/m3.jpg";
import modelImg4 from "../../../public/images/m4.jpg";
import reachoutPng from "../../../public/images/reachout-png.png";
import growingTogetherPng from "../../../public/images/growingTogether-png.png";

const aboutus = () => {
    return (
        <div>
            <div className="container-fluid p-0">
                <div className="about-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">About Us</h1>
                                    <h3 className="text-white">
                                        Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i> About Us
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="about-container container pb-5">
                            <div className="contentLeft">
                                <div className="row mx-auto">
                                    <div className="imgWrapper">
                                        <img src={modelImg1.src} alt="" />
                                    </div>
                                    <div className="imgWrapper">
                                        <img src={modelImg2.src} alt="" />
                                    </div>
                                    <div className="imgWrapper">
                                        <img src={modelImg3.src} alt="" />
                                    </div>
                                    <div className="imgWrapper">
                                        <img src={modelImg4.src} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="contentRight">
                                <div className="content">
                                    <h4 className='text-dd88cf fw-semibold'>Welcome To</h4>
                                    <h2>Pinkspot.cc</h2>
                                    <p>Founded in 2024, Pinkspot.cc is Canada’s first sex worker-owned and operated escort directory built by and for the community. Our mission is simple but powerful: to create a safe, reliable, and affordable space for real escorts to promote their services and connect with respectful, high-paying clients—without the frustration of fake ads or outrageous fees.</p>
                                    <Link href="" className="btn btn-addPost bg-4b164c text-white fw-semibold rounded-pill py-xxl-2 px-xxl-3 me-3">POST YOUR AD</Link>
                                </div>
                            </div>
                        </div>
                        <div className="about-container container mt-5">
                            <div className="contentRight">
                                <div className="content">
                                    <h2>Why We Started Pinkspot.cc</h2>
                                    <p><Link href='http://Pinkspot.cc'>Pinkspot.cc</Link> was born out of necessity. We experienced firsthand the flaws of other advertising platforms—sky-high posting fees, poor customer support, and endless fake ads that drown out real sex workers. These issues don’t just hurt business; they create an unsafe and unfair digital environment. That’s why we decided to build something better.</p>
                                    <p> We launched <Link href='http://Pinkspot.cc'>Pinkspot.cc</Link> with the goal of putting power back into the hands of working companions. By charging the lowest posting fees in the industry and providing proper ad verification, we ensure your time and money aren’t wasted. Our platform helps filter out scams and fake accounts so genuine providers can stand out and thrive.</p>
                                </div>
                            </div>
                            <div className="contentLeft">
                                <div className="row d-flex mx-auto">
                                    <div className="col-12">
                                        <img src={modelImg2.src} alt="" className='w-100' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light">
                        <div className="container py-5">
                            <div className="row justify-content-center text-center">
                                <h1 className='fw-semibold mb-5'>What Makes Us Different</h1>
                                <div className="col-md-4 mb-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <div
                                            className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                            style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                        >
                                            {/* <FaPenNib size={24} color="green" /> */}
                                        </div>
                                        <h5 className="fw-bold">Sex Worker-Owned and Operated</h5>
                                        <p className="text-muted">
                                            We understand your needs because we’ve lived them. Every feature and policy on Pinkspot.cc is designed with real-world experience in mind.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <div
                                            className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                            style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                        >
                                            {/* <FaPeace size={24} color="green" /> */}
                                        </div>
                                        <h5 className="fw-bold">Affordable and Transparent Pricing</h5>
                                        <p className="text-muted">
                                            Our rates are designed to be accessible to independent providers and agencies alike—no hidden fees, no games.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <div
                                            className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                            style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                        >
                                            {/* <FaPaperPlane size={24} color="green" /> */}
                                        </div>
                                        <h5 className="fw-bold">Real Ads, Real People</h5>
                                        <p className="text-muted">
                                            We use advanced verification tools to keep the platform clean and trustworthy. Clients browsing Pinkspot.cc can do so with confidence.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <div
                                            className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                            style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                        >
                                            {/* <FaPaperPlane size={24} color="green" /> */}
                                        </div>
                                        <h5 className="fw-bold">Elite Clientele</h5>
                                        <p className="text-muted">
                                            Our marketing strategies are targeted to attract upscale, respectful clients who are serious about booking and value discretion and professionalism.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <div
                                            className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                            style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                        >
                                            {/* <FaPaperPlane size={24} color="green" /> */}
                                        </div>
                                        <h5 className="fw-bold">24/7 Human Support</h5>
                                        <p className="text-muted">
                                            Whether you’re dealing with an ad issue, payment question, or simply need help creating your profile, our support team is always available—day or night.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container py-5">
                        <div className="row justify-content-center text-center">
                            <h1 className='fw-semibold mb-2'>Our Values</h1>
                            <h5 className='text-dd88cf mb-5'>We believe that sex work is work—and it deserves the same respect, rights, and dignity as any other profession. That’s why we’ve built Pinkspot.cc on a foundation of</h5>
                            <div className="col-md-3 mb-4">
                                <div className="d-flex flex-column align-items-center">
                                    <div
                                        className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                        style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                    >
                                        {/* <FaPenNib size={24} color="green" /> */}
                                    </div>
                                    <h5 className="fw-bold">Empowerment</h5>
                                    <p className="text-muted">
                                        We give providers the tools they need to promote themselves professionally and safely.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3 mb-4">
                                <div className="d-flex flex-column align-items-center">
                                    <div
                                        className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                        style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                    >
                                        {/* <FaPeace size={24} color="green" /> */}
                                    </div>
                                    <h5 className="fw-bold">Safety</h5>
                                    <p className="text-muted">
                                        With strong verification and community moderation, we work hard to make Pinkspot.cc a scam-free zone.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3 mb-4">
                                <div className="d-flex flex-column align-items-center">
                                    <div
                                        className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                        style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                    >
                                        {/* <FaPaperPlane size={24} color="green" /> */}
                                    </div>
                                    <h5 className="fw-bold">Equality</h5>
                                    <p className="text-muted">
                                        We support all identities, orientations, and body types. Our platform is inclusive and body-positive.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3 mb-4">
                                <div className="d-flex flex-column align-items-center">
                                    <div
                                        className="rounded-circle shadow d-flex justify-content-center align-items-center mb-3"
                                        style={{ width: '70px', height: '70px', backgroundColor: '#fff' }}
                                    >
                                        {/* <FaPaperPlane size={24} color="green" /> */}
                                    </div>
                                    <h5 className="fw-bold">Integrity</h5>
                                    <p className="text-muted">
                                        We’re upfront about our pricing, policies, and how we operate. No tricks, no traps—just transparency.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light">
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-3 px-4">
                                    <img src={growingTogetherPng.src} alt="" className="w-100" />
                                </div>
                                <div className="col-lg-8 mx-auto px-4 d-flex align-items-center">
                                    <div className="">
                                        <h1 className='fw-semibold mb-2 text-center'>Growing Together</h1>
                                        <p className="mb-3 text-center">
                                            While we’re still new, our growth has been powered entirely by word of mouth and community support—and we’re just getting started. Every ad posted on Pinkspot.cc helps strengthen a platform that exists for sex workers, not corporations. As we grow, we’re committed to reinvesting into new features, better visibility, and community partnerships that uplift the people who matter most: you.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 px-4 d-flex align-items-center">
                                <div className="">
                                    <h1 className='fw-semibold mb-2'>Reach Out Anytime</h1>
                                    <p className="mb-3">
                                        Our team is here to help you get the most out of your experience on Pinkspot.cc. Whether you’re a new escort building your first ad or a seasoned professional looking for a better alternative, we’re ready to support you.
                                    </p>
                                    <h6 className="mb-3">
                                        For questions, support, or feedback, please contact us anytime at:
                                    </h6>
                                    <h6 className="mb-3">
                                        <Link href='mailto:support@pinkspot.cc'>
                                            {/* 📧  */}
                                            <i className="fa-solid fa-envelope me-1"></i>
                                            support@pinkspot.cc
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                            <div className="col-lg-5 px-4">
                                <img src={reachoutPng.src} alt="" className="w-100" />
                            </div>
                            <h5 className="col-lg-8 mx-auto mb-4 text-dd88cf text-center">
                                Join a platform that respects your work, protects your time, and puts money back in your hands. Welcome to Pinkspot.cc—Canada’s most trusted and inclusive escort directory.
                            </h5>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default aboutus