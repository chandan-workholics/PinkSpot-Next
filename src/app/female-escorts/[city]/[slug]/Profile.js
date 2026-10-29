"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import callAPI, { interceptor } from "../../../Common_Method/api";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SwiperPage from "../../../components/Swiper/page";
import VerifiedBadge from "../../../components/VerifiedBadge/VerifiedBadge";

const Profile = ({ post }) => {
    const router = useRouter();
    const [posts, setPosts] = useState(post);
    const [selectedImage, setSelectedImage] = useState("");
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const availabilityText = Array.isArray(posts?.availability)
        ? posts.availability.join(", ")
        : posts?.availability;
    const userid = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;
    const images = Array.from(
        new Set([...Array.from({ length: 20 }, (_, index) => posts?.[`image${index + 1}`]), posts?.image].filter(Boolean))
    );
    const activeImage = selectedImage || images[0] || "/images/no-img.png";
    const activeImageBackground = `url("${String(activeImage).replace(/"/g, "%22")}")`;
    const activeImageIndex = Math.max(images.indexOf(activeImage), 0);
    const showImageNav = images.length > 1;

    const showPreviousImage = () => {
        if (!images.length) return;
        const previousIndex = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
        setSelectedImage(images[previousIndex]);
    };

    const showNextImage = () => {
        if (!images.length) return;
        const nextIndex = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
        setSelectedImage(images[nextIndex]);
    };
    const isFavourite = posts?.favouritepostbyuser?.includes(userid);
    const hourlyRate = posts?.price
        ? `${String(posts.price).startsWith("$") ? "" : "$"}${posts.price}/hr`
        : "—";
    const profileDetails = [
        ["Name", posts?.name],
        ["Age", posts?.age],
        ["City", posts?.city],
        ["Hourly Rate", hourlyRate],
        ["Contact", posts?.phone, "phone"],
        ["Availability", availabilityText],
        ["Ethnicity", posts?.ethicity],
        ["Bust", posts?.bodystatus],
        ["Height", posts?.height],
        ["Weight", posts?.weight],
        ["Hair Colour", posts?.haircolour],
        ["Eye Colour", posts?.eyecolour],
    ];

    const getPost = useCallback(async () => {
        try {
            interceptor();
            const response = await callAPI.post("/postad/getpostadby_single_slug", { slug: posts?.slug });
            if (response.data?.data) setPosts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }, [posts?.slug]);

    const favouriteClick = async () => {
        try {
            const favouriteByuserid = sessionStorage.getItem("userid");
            if (!favouriteByuserid) return alert("Please Login");

            const response = await callAPI.post("/postad/favouritesubmit", {
                favouriteToPostid: posts?._id,
                favouriteByuserid,
            });
            if (response.status === 200) getPost();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (posts?.slug) getPost();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [posts?.slug, getPost]);

    useEffect(() => {
        setSelectedImage("");
    }, [posts?._id, posts?.image1]);

    return (
        <div className="container-fluid p-0">
            <div className="profile-page">
                <Header />

                <section className="ad-profile-hero">
                    <div className="ad-profile-hero__inner">
                        <button type="button" onClick={() => {
                            const savedListingUrl = typeof window !== "undefined"
                                ? sessionStorage.getItem("pinkspot-last-listing-url")
                                : null;
                            if (savedListingUrl) router.push(savedListingUrl);
                            else router.back();
                        }} className="ad-profile-back">
                            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                            Back
                        </button>

                        <div className="ad-profile-gallery">
                            <div className="ad-profile-gallery__main" style={{ "--profile-image": activeImageBackground }}>
                                <img
                                    src={activeImage}
                                    alt={`${posts?.name || "Provider"} profile`}
                                    decoding="async"
                                    fetchPriority="high"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setIsZoomOpen(true)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") setIsZoomOpen(true);
                                    }}
                                />
                                <span>
                                    <i className="fa-regular fa-images" aria-hidden="true"></i>
                                    {images.length ? activeImageIndex + 1 : 0} / {images.length || 1}
                                </span>
                            </div>
                            {showImageNav && (
                                <>
                                    <button
                                        type="button"
                                        className="ad-profile-gallery__nav ad-profile-gallery__nav--prev"
                                        aria-label="Previous photo"
                                        onClick={showPreviousImage}
                                    >
                                        <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="ad-profile-gallery__nav ad-profile-gallery__nav--next"
                                        aria-label="Next photo"
                                        onClick={showNextImage}
                                    >
                                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                                    </button>
                                </>
                            )}

                            {images.length > 1 && (
                                <div className="ad-profile-gallery__thumbs" aria-label="Profile photos">
                                    {images.map((image, index) => (
                                        <button
                                            type="button"
                                            key={image}
                                            className={activeImage === image ? "active" : ""}
                                            aria-label={`View photo ${index + 1}`}
                                            onClick={() => setSelectedImage(image)}
                                        >
                                            <img src={image} alt="" loading="lazy" decoding="async" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="ad-profile-intro">
                            <button
                                type="button"
                                className={`ad-profile-favourite ${isFavourite ? "active" : ""}`}
                                aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
                                onClick={favouriteClick}
                            >
                                <i className={`${isFavourite ? "fa-solid" : "fa-regular"} fa-heart`} aria-hidden="true"></i>
                            </button>

                            <div className="ad-profile-intro__name">
                                <h1>{posts?.name || "Profile"}</h1>
                                <VerifiedBadge record={posts} />
                            </div>
                            <p className="ad-profile-intro__meta">
                                {posts?.age && <span>{posts.age}</span>}
                                {posts?.city && (
                                    <span><i className="fa-solid fa-location-dot" aria-hidden="true"></i>{posts.city}</span>
                                )}
                            </p>
                            {posts?.title && (
                                <div className="ad-profile-title-preview">
                                    <p>{posts.title}</p>
                                </div>
                            )}
                        </div>

                        {isZoomOpen && (
                            <div className="ad-profile-zoom" role="dialog" aria-modal="true" aria-label="Zoomed profile photo" onClick={() => setIsZoomOpen(false)}>
                                <button type="button" className="ad-profile-zoom__close" aria-label="Close zoomed image" onClick={() => setIsZoomOpen(false)}>
                                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                                </button>
                                <img src={activeImage} alt={`${posts?.name || "Provider"} zoomed profile`} onClick={(event) => event.stopPropagation()} />
                            </div>
                        )}
                    </div>
                </section>

                <section className="container my-5 ad-profile-content">
                    <section className="ad-profile-details" aria-labelledby="profile-details-title">
                        <h2 id="profile-details-title">Profile Details</h2>
                        <dl className="ad-profile-details__grid">
                            {profileDetails.map(([label, value, type]) => (
                                <div key={label}>
                                    <dt>{label}</dt>
                                    <dd>
                                        {type === "phone" && value ? (
                                            <a href={`tel:${value}`}>{value}</a>
                                        ) : (value || "—")}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <aside className="ad-profile-seen-badge" aria-label="Say you saw my ad on Pinkspot">
                        <img src="/images/seen-my-ad-badge.jpeg" alt="Mention you saw my ad on Pinkspot.cc" />
                    </aside>

                    <section className="ad-profile-about" aria-labelledby="profile-about-title">
                        <h2 id="profile-about-title">About Me</h2>
                        <span aria-hidden="true"></span>
                        <p>{posts?.description || "No description available."}</p>
                    </section>
                </section>
            </div>

            <SwiperPage />
            <Footer />
        </div>
    );
};

export default Profile;
