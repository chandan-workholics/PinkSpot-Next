"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head';
import noImg from "../../../public/images/no-img.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import callAPI, { interceptor } from '../Common_Method/api'
import dynamic from 'next/dynamic';
const Header = dynamic(() => import("../components/header/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/footer/Footer"), { ssr: false });
import AOS from 'aos';
import 'aos/dist/aos.css';
import DisclaimerModal from '../components/DisclaimerModal/DisclaimerModal'
import { useRouter } from 'next/navigation';
import modelImg1 from "../../../public/images/m7.jpg";
import modelImg2 from "../../../public/images/m2.jpg";
import modelImg3 from "../../../public/images/m3.jpg";
import modelImg4 from "../../../public/images/m4.jpg";

const HomePage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [canonicalUrl, setCanonicalUrl] = useState("https://pinkspot.cc/");
    const maxLength = 90;

    useEffect(() => {
        if (typeof window !== "undefined") {
            AOS.init();
        }
    }, []);

    const [sessionModal, setSessionModal] = useState(null);

    useEffect(() => {
        const modal = sessionStorage.getItem("agreemodal");
        setSessionModal(modal === "true");
    }, []);

    const getPosts = async () => {
        try {
            interceptor();
            const response = await callAPI.post(`/postad/getallpostad_sort_desc`, { limit: "15" });
            if (response.data) {
                setPosts(response.data || []);
            } else {
                console.error("Unexpected response format", response);
                setPosts([]);
            }
        } catch (error) {
            console.error("Error fetching posts", error);
            setPosts([]);
        }
    };

    const [modalactive, setModalActive] = useState("block");
    const setModalHide = () => {
        setModalActive("none");
        sessionStorage.setItem("agreemodal", "true");
    };
    useEffect(() => {
        const ls = sessionStorage.getItem("agreemodal");
        if (ls) {
            setModalActive("none");
        }
    }, []);

    useEffect(() => {
        getPosts();
        window.scrollTo({ behavior: "smooth", top: 0 });
    }, []);

    const [city, setCity] = useState([]);
    const [province, setProvince] = useState([]);

    const [filters, setFilters] = useState({
        province: '',
        city: '',
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSearch = async () => {
        try {
            router.push(`/allCategory?province=${filters.province}&city=${filters.city}`);
        } catch (error) {
            console.error("Search failed", error);
        }

    };

    const fetchProvince = async () => {
        const response = await fetch(`https://pinkspot.cc/api/v1/getallprovince`);
        const result = await response.json();
        setProvince(result?.data);
    };

    const fetchCities = async (provinceId) => {
        const response = await fetch(`https://pinkspot.cc/api/v1/getallcity/${provinceId}`);
        const result = await response.json();
        setCity(result?.data);
    };

    useEffect(() => {
        fetchProvince();
    }, []);

    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <link rel="canonical" href={canonicalUrl} />
                <title>Pinkspot – Female Escorts in Canada | Toronto, Edmonton & More</title>
                <meta
                    name="description"
                    content="Discover verified female escorts in Toronto, Edmonton, and across Canada with PinkSpot. Enjoy safe, premium, and discreet connections."
                />
                <meta
                    name="keywords"
                    content="female escorts Canada, Toronto escorts, Edmonton escorts, verified escorts, premium adult services, discreet dating Canada, Pink Spot, adult companionship Toronto"
                />
                <meta name="author" content="Pink Spot" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content="Pinkspot – Female Escorts in Canada | Toronto, Edmonton & More" />
                <meta property="og:description" content="Discover verified female escorts in Toronto, Edmonton, and across Canada with PinkSpot. Safe, premium, and discreet." />
                <meta property="og:image" content="https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_CA" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:domain" content="pinkspot.cc" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content="Pinkspot – Female Escorts in Canada | Toronto, Edmonton & More" />
                <meta name="twitter:description" content="Discover verified female escorts in Toronto, Edmonton, and across Canada with PinkSpot." />
                <meta name="twitter:image" content="https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png" />

                {/* Performance Hints */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <meta name="theme-color" content="#dd88cf" />
                <link rel="icon" href="/favicon.ico" />

                {/* Schema.org JSON-LD for Local Business */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            name: "Pink Spot",
                            url: "https://pinkspot.cc/",
                            logo: "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png",
                            description:
                                "Discover verified female escorts in Toronto, Edmonton, and across Canada with PinkSpot. Safe, premium, and discreet.",
                            address: {
                                "@type": "PostalAddress",
                                addressCountry: "CA"
                            },
                            sameAs: [
                                "https://facebook.com/pinkspot",
                                "https://instagram.com/pinkspot"
                            ]
                        })
                    }}
                />
            </Head>

            <div className="container-fluid p-0">
                <div className="home-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-center">
                                <div className="w-100">
                                    <div className="" data-aos="fade-up" data-aos-duration="1000">
                                        {/* <h1 className="text-white">Welcome To
                                            <span className="text-dd88cf"> Pink Spot</span><br />
                                            Choose Your Vibe
                                        </h1> */}
                                        {/* <h3 className="text-white fw-normal">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
                                        <Link href="/allCategory" className='btn bg-dd88cf text-4b164c fw-semibold rounded-pill py-2 px-3 mt-5'>Get Started</Link> */}

                                        <div className="row position-relative my-5 d-block d-lg-none" style={{ height: "400px" }}>
                                            <div className="col-12">
                                                <div className="home-section3 bg-transparent 
                                                    position-absolute top-0 start-0"
                                                    style={{ zIndex: 1, width: "100%" }}>
                                                    <div className="container bg-transparent">
                                                        {/* Swiper start */}
                                                        <Swiper
                                                            slidesPerView={1}
                                                            spaceBetween={10}
                                                            pagination={{
                                                                clickable: true,
                                                            }}
                                                            autoplay={{
                                                                delay: 3000,
                                                                disableOnInteraction: false,
                                                            }}
                                                            breakpoints={{
                                                                640: { slidesPerView: 2, spaceBetween: 20 },
                                                                768: { slidesPerView: 2, spaceBetween: 40 },
                                                                1024: { slidesPerView: 3, spaceBetween: 30 },
                                                                1400: { slidesPerView: 4, spaceBetween: 50 },
                                                            }}
                                                            modules={[Pagination, Autoplay]}
                                                            className="mySwiper pb-5"
                                                        >
                                                            {Array.isArray(posts?.data) ? posts.data.map((post, index) => (
                                                                <SwiperSlide key={index}>
                                                                    <div className="effect-image-1 border border-white border-2 rounded-4">
                                                                        {post?.image1 == "" || null ?
                                                                            <img src={noImg.src} alt="Post Images" className='w-100 bg-white' /> :
                                                                            <img src={post.image1} alt="Post Image" className='w-100 bg-white' />
                                                                        }

                                                                        <div className="simple-text">
                                                                            <p>{post.name}</p>
                                                                            <p>{post.city}</p>
                                                                        </div>
                                                                        {/* Added overlay to match the static design */}
                                                                        <div className="overlay-sim-text-2 overlay-xs-1 d-flex align-items-center">
                                                                            <div className="w-100 p-3">
                                                                                <p className="mb-1 text-center">
                                                                                    {post.description.length > maxLength
                                                                                        ? `${post.description.slice(0, maxLength)}...`
                                                                                        : post.description}
                                                                                </p>
                                                                                <Link
                                                                                    className='btn bg-fcf3fa text-4b164c fw-semibold rounded-pill me-3 py-2 px-3'
                                                                                    key={index}
                                                                                    href={`/profile/${post?.city.split(" ").join("-")}/${post?.slug}`}
                                                                                >
                                                                                    View More
                                                                                </Link>
                                                                                {/* Like button for adding to favourites */}

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide>
                                                            )) : <p></p>}
                                                        </Swiper>
                                                        {/* Slider end */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-12 col-lg-8 col-xl-6 col-xxl-5 mx-auto">
                                                <select
                                                    className="form-select form-select-lg filter-btn position-relative rounded-pill shadow-none border-secondary-subtle mb-3"
                                                    name="province"
                                                    value={filters.province}
                                                    onChange={(e) => {
                                                        handleFilterChange('province', e.target.value);
                                                        fetchCities(e.target.value);
                                                    }}
                                                >
                                                    <option value="">Province</option>
                                                    {province.map((val, index) => (
                                                        <option key={index} value={val._id}>{val.name}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    className="form-select form-select-lg filter-btn position-relative rounded-pill shadow-none border-secondary-subtle mb-3"
                                                    name="city"
                                                    value={filters.city}
                                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                                >
                                                    <option value="">City</option>
                                                    {city.map((val, index) => (
                                                        <option key={index} value={val.name}>{val.name}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    className="btn btn-lg bg-dd88cf text-4b164c border-0 w-100 rounded-pill px-4 fw-semibold"
                                                    type="button" onClick={handleSearch}>
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-section3 bg-faedf8 py-5 d-none d-lg-block">
                        <div className="container">
                            <div className="row" data-aos="zoom-in-up" data-aos-duration="1000">
                                {/* Swiper start */}
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        640: { slidesPerView: 2, spaceBetween: 20 },
                                        768: { slidesPerView: 2, spaceBetween: 40 },
                                        1024: { slidesPerView: 3, spaceBetween: 30 },
                                        1400: { slidesPerView: 4, spaceBetween: 50 },
                                    }}
                                    modules={[Pagination, Autoplay]}
                                    className="mySwiper pb-5"
                                >
                                    {Array.isArray(posts?.data) ? posts.data.map((post, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="effect-image-1">
                                                {post?.image1 == "" || null ?
                                                    <img src={noImg.src} alt="Post Images" className='w-100' /> :
                                                    <img src={post.image1} alt="Post Image" className='w-100' />
                                                }

                                                <div className="simple-text">
                                                    <p>{post.name}</p>
                                                    <p>{post.city}</p>
                                                </div>
                                                {/* Added overlay to match the static design */}
                                                <div className="overlay-sim-text-2 overlay-xs-1 d-flex align-items-center">
                                                    <div className="text-center w-100 p-3">
                                                        <p className="mb-1 text-center">
                                                            {post.description.length > maxLength
                                                                ? `${post.description.slice(0, maxLength)}...`
                                                                : post.description}
                                                        </p>
                                                        <Link
                                                            className='btn bg-fcf3fa text-4b164c fw-semibold rounded-pill py-2 px-3'
                                                            key={index}
                                                            href={`/profile/${post?.city.split(" ").join("-")}/${post?.slug}`}
                                                        >
                                                            View More
                                                        </Link>
                                                        {/* Like button for adding to favourites */}

                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )) : <p>No posts available</p>}
                                </Swiper>
                                {/* Slider end */}
                            </div>
                        </div>
                    </div>
                    <div className="home-section4">
                        <section className="container my-5">
                            <div className="row align-items-center">
                                <div className="col-lg-5 mb-4 mb-lg-0" data-aos="fade-right" data-aos-duration="1800">
                                    <h2 className="fw-bold text-center text-lg-start">
                                        <span className="text-4b164c">Trusted, Verified, Discreet</span>
                                    </h2>
                                    <p className='text-center text-lg-start'>
                                        We link clients with verified providers in a secure, discreet space.
                                        Fake ads are removed quickly, and fair pricing keeps costs low without sacrificing quality.
                                    </p>
                                    <div className="d-flex">
                                        <Link href='/allCategory' className="mx-auto ms-lg-0 btn bg-dd88cf text-white">
                                            Search ads <span>&raquo;</span>
                                        </Link>
                                    </div>
                                </div>
                                {/* <div className="col-lg-7" data-aos="fade-left" data-aos-duration="2000">
                                    <div className="row g-4">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <div className="">
                                                <div className="cardFeature">
                                                    <i className="fa-solid fa-user-tie text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Verified Profiles</h5>
                                                    <p>We prioritize authenticity. All providers go through a verification process to ensure genuine and trusted connections.</p>
                                                </div>
                                                <div className="cardFeature">
                                                    <i className="fa-solid fa-comments text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Private Messaging</h5>
                                                    <p>Connect securely through our built-in messaging system — your conversations remain 100% confidential.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center">
                                            <div className="">
                                                <div className="cardFeature">
                                                    <i className="fa-brands fa-web-awesome text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Premium Listings</h5>
                                                    <p>Stand out from the crowd. Boost your profile visibility and attract more clients with featured placements.</p>
                                                </div>
                                                <div className="cardFeature active">
                                                    <i className="fa-solid fa-user-shield text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Safety Assurance</h5>
                                                    <p>Your security is our top priority — from encrypted data to anonymous browsing, we’ve got you covered.</p>
                                                </div>
                                                <div className="cardFeature">
                                                    <i className="fa-solid fa-globe text-dd88cf fs-1 mb-2"></i>
                                                    <h5 className="fw-bold">Find Nearby Providers</h5>
                                                    <p>Easily explore verified escort services near your location across Canada, with advanced local search filters.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </section>
                    </div>
                    <div className="home-section5">
                        {/* <h1>Gallery Images</h1> */}
                        <section>
                            <div className="gallery gallery-left">
                                <div className="left">
                                    {Array.isArray(posts?.data) &&
                                        posts.data.slice(0, 3).map((post, index) => (
                                            <img
                                                key={`left-top-${index}`}
                                                src={post?.image1 && post.image1.trim() !== "" ? post.image1 : noImg.src}
                                                className="box box1"
                                                alt={`Gallery image ${index}`}
                                                loading="lazy"
                                            />
                                        ))}
                                </div>
                                <div className="left">
                                    {Array.isArray(posts?.data) &&
                                        posts.data.slice(3, 6).map((post, index) => (
                                            <img
                                                key={`left-bottom-${index}`}
                                                src={post?.image1 && post.image1.trim() !== "" ? post.image1 : noImg.src}
                                                className="box box1"
                                                alt={`Gallery image ${index}`}
                                                loading="lazy"
                                            />
                                        ))}
                                </div>
                            </div>

                            <div className="gallery gallery-center">
                                <div className="center">
                                    {Array.isArray(posts?.data) &&
                                        posts.data.slice(6, 9).map((post, index) => (
                                            <img
                                                key={`center-top-${index}`}
                                                src={post?.image1 && post.image1.trim() !== "" ? post.image1 : noImg.src}
                                                className="box box1"
                                                alt={`Gallery image ${index}`}
                                                loading="lazy"
                                            />
                                        ))}
                                </div>
                                <div className="center">
                                    {Array.isArray(posts?.data) &&
                                        posts.data.slice(9, 12).map((post, index) => (
                                            <img
                                                key={`center-bottom-${index}`}
                                                src={post?.image1 && post.image1.trim() !== "" ? post.image1 : noImg.src}
                                                className="box box1"
                                                alt={`Gallery image ${index}`}
                                                loading="lazy"
                                            />
                                        ))}
                                </div>
                            </div>

                            <div className="gallery gallery-right">
                                <div className="right">
                                    {Array.isArray(posts?.data) &&
                                        posts.data.slice(12, 15).map((post, index) => (
                                            <img
                                                key={`right-top-${index}`}
                                                src={post?.image1 && post.image1.trim() !== "" ? post.image1 : noImg.src}
                                                className="box box1"
                                                alt={`Gallery image ${index}`}
                                                loading="lazy"
                                            />
                                        ))}
                                </div>
                                <div className="right">
                                    {Array.isArray(posts?.data) &&
                                        posts.data.slice(15, 18).map((post, index) => (
                                            <img
                                                key={`right-bottom-${index}`}
                                                src={post?.image1 && post.image1.trim() !== "" ? post.image1 : noImg.src}
                                                className="box box1"
                                                alt={`Gallery image ${index}`}
                                                loading="lazy"
                                            />
                                        ))}
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

                {sessionModal ?
                    <div className="modal" id="myModal" style={{ display: `${modalactive}` }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        <img
                                            className="logo"
                                            src={require("../../../public/images/pink-logo.png")}
                                            alt="sgdg"
                                        />
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <h6>
                                        As condition of your use of PinkSpot, you agree to the
                                        following:
                                    </h6>
                                    <ul style={{ listStyleType: "circle" }}>
                                        <li>
                                            I am at least 18 years of age - or of legal age in the country
                                            in which I reside.
                                        </li>
                                        <li>
                                            {" "}
                                            I will not post any material that exploits minors or in any
                                            way constitutes or assists in human trafficking.
                                        </li>
                                        <li>
                                            I will not post or produce content which violates Pinkspot
                                            guidelines (i.e. using images of genitalia, real or simulated
                                            sex acts as my profile picture).
                                        </li>
                                        <li>
                                            I have read and agree to observe the Terms of Service, Privacy
                                            Policy, ad posting guidelines and Rules not specifically
                                            addressed herein.
                                        </li>
                                    </ul>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-model" onClick={() => setModalHide()}>
                                        {" "}
                                        Agree
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ''}

                <Footer />
            </div >

            <DisclaimerModal />
        </>
    )
}

export default HomePage;
