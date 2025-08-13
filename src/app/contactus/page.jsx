
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header/Header";
import contactus from "../../../public/images/Contact us-rafiki.png";

function ContactUs() {
    const canonicalUrl = "https://pinkspot.cc/contactus/";

    // Static SEO data (can be replaced with fetched API data)
    const seo = {
        title: "Contact Us | Pink Spot",
        description: "Get in touch with Pink Spot for support, inquiries, and assistance. We're here to help you with any questions you may have.",
        keywords: "Pink Spot contact, customer support, help center, Pink Spot assistance, email support",
        author: "Pink Spot",
        image: "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png", 
        url: canonicalUrl
    };
    return (
        <>
            <Head>
                {/* Canonical URL */}
                <link rel="canonical" href={seo.url} />

                {/* Basic SEO */}
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta name="author" content={seo.author} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:image" content={seo.image} />
                <meta property="og:url" content={seo.url} />
                <meta property="og:site_name" content="Pink Spot" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                <meta name="twitter:image" content={seo.image} />
                <meta name="twitter:site" content="@PinkSpot" />
            </Head>
            <div className="contact-us-page">
                {/* Header */}
                <Header />
                {/* Contact Section */}
                <section className="h-100 contact-banner bg-ffdef7">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-lg-10" data-aos="zoom-in" data-aos-duration="2000">
                                <div className="card contact-card shadow-lg p-4 border-0 rounded-5">
                                    <div className="row g-0 align-items-center">
                                        {/* Image Section - Hidden on Small Screens */}
                                        <div className="col-md-6 ">
                                            <Image
                                                src={contactus}
                                                alt="Contact Us Illustration"
                                                className="img-fluid contact-img"
                                                layout="responsive"
                                                priority
                                            />
                                        </div>

                                        {/* Contact Details Section */}
                                        <div className="col-md-6 col-12 d-flex flex-column text-center p-0 pt-0 pt-lg-4">
                                            <h1 className="fw-bold text-primary">Contact Us</h1>
                                            <p className="fw-semibold text-muted">For any support related issues please contact</p>

                                            {/* Contact Button */}
                                            <Link href="mailto:support@pinkspot.cc">
                                                <button className="btn btn-lg bg-dd88cf text-white rounded-4 shadow-sm mx-auto px-3 py-2 mt-3">
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
        </>
    );
}

export default ContactUs;

