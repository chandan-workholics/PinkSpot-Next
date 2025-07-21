import React from 'react'
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Link from 'next/link'

const aboutus = () => {
    return (
        <div>
            <div className="container-fluid p-0">
                <div className="about-page bg-ffdef7">
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
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 px-4">
                                <h6 className="mb-3">
                                    Founded in 2024, Pinkspot.cc is Canada’s first sex worker-owned and operated escort directory built by and for the community. Our mission is simple but powerful: to create a safe, reliable, and affordable space for real escorts to promote their services and connect with respectful, high-paying clients—without the frustration of fake ads or outrageous fees.
                                </h6>
                                <h5 className="">Why We Started Pinkspot.cc</h5>
                                <h6 className="">
                                    <Link href='http://Pinkspot.cc'>Pinkspot.cc</Link> was born out of necessity. We experienced firsthand the flaws of other advertising platforms—sky-high posting fees, poor customer support, and endless fake ads that drown out real sex workers. These issues don’t just hurt business; they create an unsafe and unfair digital environment. That’s why we decided to build something better.
                                </h6>
                                <h6 className="mb-3">
                                    We launched <Link href='http://Pinkspot.cc'>Pinkspot.cc</Link> with the goal of putting power back into the hands of working companions. By charging the lowest posting fees in the industry and providing proper ad verification, we ensure your time and money aren’t wasted. Our platform helps filter out scams and fake accounts so genuine providers can stand out and thrive.
                                </h6>
                                <h5 className="">What Makes Us Different</h5>
                                <ul className="mb-3">
                                    <li className="">
                                        Sex Worker-Owned and Operated: We understand your needs because we’ve lived them. Every feature and policy on Pinkspot.cc is designed with real-world experience in mind.
                                    </li>
                                    <li className="">
                                        Affordable and Transparent Pricing: Our rates are designed to be accessible to independent providers and agencies alike—no hidden fees, no games.
                                    </li>
                                    <li className="">
                                        Real Ads, Real People: We use advanced verification tools to keep the platform clean and trustworthy. Clients browsing Pinkspot.cc can do so with confidence.
                                    </li>
                                    <li className="">
                                        Elite Clientele: Our marketing strategies are targeted to attract upscale, respectful clients who are serious about booking and value discretion and professionalism.
                                    </li>
                                    <li className="">
                                        24/7 Human Support: Whether you’re dealing with an ad issue, payment question, or simply need help creating your profile, our support team is always available—day or night.
                                    </li>
                                </ul>
                                <h5 className="">Our Values</h5>
                                <h6 className="">
                                    We believe that sex work is work—and it deserves the same respect, rights, and dignity as any other profession. That’s why we’ve built Pinkspot.cc on a foundation of:
                                </h6>
                                <ul className="mb-3">
                                    <li className="">
                                        Empowerment: We give providers the tools they need to promote themselves professionally and safely.
                                    </li>
                                    <li className="">
                                        Safety: With strong verification and community moderation, we work hard to make Pinkspot.cc a scam-free zone.
                                    </li>
                                    <li className="">
                                        Equality: We support all identities, orientations, and body types. Our platform is inclusive and body-positive.
                                    </li>
                                    <li className="">
                                        Integrity: We’re upfront about our pricing, policies, and how we operate. No tricks, no traps—just transparency.
                                    </li>
                                </ul>
                                <h5 className="">Growing Together</h5>
                                <h6 className="mb-3">
                                    While we’re still new, our growth has been powered entirely by word of mouth and community support—and we’re just getting started. Every ad posted on Pinkspot.cc helps strengthen a platform that exists for sex workers, not corporations. As we grow, we’re committed to reinvesting into new features, better visibility, and community partnerships that uplift the people who matter most: you.
                                </h6>
                                <h5 className="">Reach Out Anytime</h5>
                                <h6 className="mb-3">
                                    Our team is here to help you get the most out of your experience on Pinkspot.cc. Whether you’re a new escort building your first ad or a seasoned professional looking for a better alternative, we’re ready to support you.
                                </h6>
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
                                <h6 className="">
                                    Join a platform that respects your work, protects your time, and puts money back in your hands. Welcome to Pinkspot.cc—Canada’s most trusted and inclusive escort directory.
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default aboutus