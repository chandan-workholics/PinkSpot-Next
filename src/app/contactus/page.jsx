
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import contactus from "../../../public/images/Contact us-rafiki.png";

function ContactUs() {
    return (
        <div className="contact-us-page">
            {/* Header */}
            <Header />
            {/* Contact Section */}
            <section className="h-100 contact-banner bg-ffdef7">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-10">
                            <div className="card contact-card shadow-lg p-4 border-0 rounded-5">
                                <div className="row g-0 align-items-center">
                                    {/* Image Section - Hidden on Small Screens */}
                                    <div className="col-md-6 d-none d-md-block">
                                        <Image
                                            src={contactus}
                                            alt="Contact Us Illustration"
                                            className="img-fluid contact-img"
                                            layout="responsive"
                                            priority
                                        />
                                    </div>

                                    {/* Contact Details Section */}
                                    <div className="col-md-6 col-12 d-flex flex-column text-center p-4">
                                        <h1 className="fw-bold text-primary">Contact Us</h1>
                                        <p className="fw-semibold text-muted">For any support related issues please contact</p>

                                        {/* Contact Button */}
                                        <Link href="mailto:support@pinkspot.cc">
                                            <button className="btn btn-lg bg-dd88cf text-white rounded-4 shadow-sm px-4 py-2 mt-3">
                                                <span className="">support@pinkspot.cc</span>
                                                <i className="fa-solid fa-paper-plane ms-2"></i>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Optional Footer (if needed) */}
        </div>
    );
}

export default ContactUs;

