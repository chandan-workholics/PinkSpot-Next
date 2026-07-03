"use client"

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import callAPI, { interceptor } from "../Common_Method/api";
import DisclaimerModal from "../components/DisclaimerModal/DisclaimerModal";
import noImg from "../../../public/images/no-img.png";
import logo from "../../../public/images/pink-logo.png";
import bannerImg from "../../../public/images/bannerImg.jpg";
import homeSec2 from "../../../public/images/homeSec2-img.png";
import sec3Slider from "../../../public/images/sec3-sliderImg.png";
import m1 from "../../../public/images/m1.jpg";
import m2 from "../../../public/images/m2.jpg";
import m3 from "../../../public/images/m3.jpg";
import m4 from "../../../public/images/m4.jpg";
import m5 from "../../../public/images/m5.jpg";
import m6 from "../../../public/images/m6.jpg";
import m7 from "../../../public/images/m7.jpg";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const featuredFallback = [
  { name: "Vanessa", city: "Vancouver", image: m1.src },
  { name: "Maria", city: "Montreal", image: m2.src },
  { name: "Sarah", city: "Edmonton", image: m3.src },
  { name: "Chloe", city: "Halifax", image: m4.src },
  { name: "Ava", city: "Quebec City", image: m5.src },
  { name: "Jessica", city: "Victoria", image: m6.src },
];

const cityCards = [
  { name: "Toronto", image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=700&q=75" },
  { name: "Vancouver", image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=700&q=75" },
  { name: "Montreal", image: "https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=700&q=75" },
  { name: "Calgary", image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=700&q=75" },
  { name: "Ottawa", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=75" },
  { name: "Edmonton", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=700&q=75" },
  { name: "Mississauga", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=700&q=75" },
  { name: "Quebec City", image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=700&q=75" },
];

const popularCities = [
  "London", "Saskatoon", "Brampton", "Sherbrooke", "Ottawa", "Mississauga",
  "Regina", "Windsor", "Barrie", "Edmonton", "Winnipeg", "Toronto",
  "Sarnia", "Montreal", "Calgary",
];

const faqs = [
  {
    question: "How do I post an ad on Pinkspot?",
    answer: "Create an account, add funds through your wallet, then publish your listing in your selected city.",
  },
  {
    question: "How do I add funds to my account?",
    answer: "You can add funds by sending Litecoin to your unique wallet address using the QR code provided in your wallet.",
  },
  {
    question: "How long do Litecoin deposits take?",
    answer: "Litecoin deposits are typically credited within 1-5 minutes after network confirmation.",
  },
  {
    question: "Are listings on Pinkspot verified?",
    answer: "Verified listings display a badge on their profile so users can identify providers who completed the verification process.",
  },
  {
    question: "How do I find companions near me?",
    answer: "Use the search at the top of the page to select your province and city, or browse listings in major Canadian cities.",
  },
  {
    question: "Is Pinkspot discreet and private?",
    answer: "Yes. Pinkspot is designed to be discreet and private, and we do not sell user data to third parties.",
  },
];

const slugify = (value) => value?.toLowerCase().trim().replace(/\s+/g, "-");

export default function HomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [filters, setFilters] = useState({ province: "", city: "" });

  useEffect(() => {
    const getPosts = async () => {
      try {
        interceptor();
        const response = await callAPI.post("/postad/getallpostad_sort_desc", { limit: "15" });
        setPosts(Array.isArray(response?.data?.data) ? response.data.data : []);
      } catch (error) {
        setPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    const fetchProvince = async () => {
      try {
        const response = await fetch("https://pinkspot.cc/api/v1/getallprovince");
        const result = await response.json();
        setProvince(Array.isArray(result?.data) ? result.data : []);
      } catch (error) {
        setProvince([]);
      }
    };

    getPosts();
    fetchProvince();
  }, []);

  const featuredListings = useMemo(() => {
    if (postsLoading) return [];
    if (!posts.length) return featuredFallback;

    return posts.slice(0, 6).map((post, index) => ({
      name: post?.name || featuredFallback[index]?.name || "Featured",
      city: post?.city || featuredFallback[index]?.city || "Canada",
      image: post?.image1?.trim() ? post.image1 : featuredFallback[index]?.image || noImg.src,
      slug: post?.slug,
    }));
  }, [posts, postsLoading]);

  const latestListings = useMemo(() => {
    if (postsLoading) return [];
    if (!posts.length) return featuredFallback.slice(0, 5);

    return posts.slice(0, 6).map((post, index) => ({
      name: post?.name || featuredFallback[index]?.name || "Latest",
      city: post?.city || featuredFallback[index]?.city || "Canada",
      image: post?.image1?.trim() ? post.image1 : featuredFallback[index]?.image || noImg.src,
      slug: post?.slug,
    }));
  }, [posts, postsLoading]);

  const fetchCities = async (provinceId) => {
    setCity([]);
    if (!provinceId) return;

    try {
      const response = await fetch(`https://pinkspot.cc/api/v1/getallcity/${provinceId}`);
      const result = await response.json();
      setCity(Array.isArray(result?.data) ? result.data : []);
    } catch (error) {
      setCity([]);
    }
  };

  const handleSearch = () => {
    if (filters.city) {
      router.push(`/female-escorts/${slugify(filters.city)}`);
      return;
    }

    router.push(`/search-escorts?page=1&province=${filters.province || ""}`);
  };

  const openListing = (listing) => {
    if (listing.slug && listing.city) {
      return `/female-escorts/${slugify(listing.city)}/${listing.slug}`;
    }

    return `/female-escorts/${slugify(listing.city || "canada")}`;
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="home-page pink-home">
          <div className="pink-home__nav">
            <Header />
          </div>

          <main>
            <section className="pink-hero">
              <div className="pink-hero__content">
                <h1>Find Female Escorts in Canada</h1>
                <p>Browse verified listings by city and province.</p>

                <div className="pink-search" aria-label="Search listings">
                  <label>
                    <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                    <select
                      value={filters.province}
                      onChange={(event) => {
                        const value = event.target.value;
                        setFilters({ province: value, city: "" });
                        fetchCities(value);
                      }}
                    >
                      <option value="">Select Province</option>
                      {province.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <i className="fa-regular fa-building" aria-hidden="true"></i>
                    <select
                      value={filters.city}
                      onChange={(event) => setFilters((current) => ({ ...current, city: event.target.value }))}
                    >
                      <option value="">Select City</option>
                      {city.map((item) => (
                        <option key={item._id || item.name} value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                    Search
                  </button>
                </div>
              </div>
            </section>

            <section className="pink-section pink-latest">
              <div className="pink-section__heading pink-section__heading--row">
                <h2><i className="fa-solid fa-fire" aria-hidden="true"></i> Latest Listings</h2>
                <Link href="/search-escorts">View all <i className="fa-solid fa-chevron-right" aria-hidden="true"></i></Link>
              </div>
              <Swiper
                slidesPerView={1}
                spaceBetween={14}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                className="pink-listing-swiper"
              >
                {postsLoading ? (
                  <SwiperSlide>
                    <div className="pink-latest-card pink-listing-placeholder" aria-label="Loading latest listings" />
                  </SwiperSlide>
                ) : (
                  latestListings.map((listing, index) => (
                    <SwiperSlide key={`${listing.name}-${index}`}>
                      <Link className="pink-latest-card" href={openListing(listing)}>
                        <img src={listing.image} alt={`${listing.name} in ${listing.city}`} />
                        <span>{listing.name}</span>
                      </Link>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </section>

            <section className="pink-section pink-why">
              <div className="pink-section__heading">
                <h2>Why Choose Pinkspot</h2>
                <p>Canada's trusted platform for verified companion listings.</p>
              </div>

              <div className="pink-trust-card">
                <img src={homeSec2.src} alt="" />
                <div>
                  <h3>Canada's Leading Companion Directory</h3>
                  <p><i className="fa-solid fa-check"></i> Largest selection of verified listings</p>
                  <p><i className="fa-solid fa-check"></i> Listings across major cities</p>
                  <p><i className="fa-solid fa-check"></i> Fast and accurate location search</p>
                </div>
              </div>

              <h3 className="pink-subtitle">Simple Pricing</h3>
              <div className="pink-pricing">
                <div className="pink-price-card">
                  <strong>$20</strong>
                  <span>Single Ad</span>
                  <p>Post anytime, no commitment</p>
                </div>
                <div className="pink-price-card pink-price-card--hot">
                  <span className="pink-badge">Best Value</span>
                  <strong>$100</strong>
                  <span>Monthly Plan</span>
                  <p>Post daily for maximum exposure</p>
                </div>
              </div>

              <div className="pink-benefits">
                <div><i className="fa-solid fa-eye"></i><span>Maximum visibility</span></div>
                <div><i className="fa-solid fa-litecoin-sign"></i><span>Fast Litecoin Deposits</span></div>
                <div><i className="fa-solid fa-dollar-sign"></i><span>Keep more of your earnings</span></div>
              </div>
            </section>

            <section className="pink-section pink-featured">
              <div className="pink-section__heading">
                <h2>Featured Listings</h2>
                <p>Toronto | Montreal | Vancouver | Calgary | Edmonton</p>
              </div>
              <div className="pink-featured-grid">
                {postsLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`featured-loading-${index}`}
                      className="pink-featured-card pink-listing-placeholder"
                      aria-label="Loading featured listing"
                    />
                  ))
                  : featuredListings.map((listing, index) => (
                    <Link key={`${listing.name}-${index}`} className="pink-featured-card" href={openListing(listing)}>
                      <img src={listing.image} alt={`${listing.name} in ${listing.city}`} />
                      <span>
                        <strong>{listing.name}</strong>
                        <small><i className="fa-solid fa-location-dot"></i> {listing.city}</small>
                      </span>
                    </Link>
                  ))}
              </div>
              <Link className="pink-wide-button" href="/search-escorts">Explore All Listings <i className="fa-solid fa-chevron-right"></i></Link>
            </section>

            <section className="pink-section pink-cities">
              <div className="pink-section__heading">
                <i className="fa-solid fa-location-dot pink-heading-icon"></i>
                <h2>Browse Escorts by City in Canada</h2>
                <span className="pink-divider"><i className="fa-solid fa-heart"></i></span>
              </div>
              <div className="pink-city-grid">
                {cityCards.map((item) => (
                  <Link key={item.name} className="pink-city-card" href={`/female-escorts/${slugify(item.name)}`}>
                    <img src={item.image} alt={`${item.name} skyline`} />
                    <strong>{item.name}</strong>
                  </Link>
                ))}
              </div>
              <p className="pink-city-note"><i className="fa-solid fa-users"></i> And many more cities across Canada</p>
            </section>

            <section className="pink-section pink-agency">
              <div className="pink-agency__copy">
                <h2>Agency Advertising <span>Made Simple</span></h2>
                <div className="pink-agency-point"><i className="fa-solid fa-users"></i><div><strong>Promote Multiple Providers</strong><p>Manage and advertise all your providers in one place.</p></div></div>
                <div className="pink-agency-point"><i className="fa-solid fa-chart-line"></i><div><strong>Reach Thousands of Daily Clients</strong><p>Reach clients actively seeking services in your city.</p></div></div>
                <div className="pink-agency-point"><i className="fa-solid fa-gear"></i><div><strong>Simple Ad Management</strong><p>Post, edit, and manage ads in minutes.</p></div></div>
                <p className="pink-agency__statement">Thousands of clients browse <span>Pinkspot</span> every day.</p>
                <Link className="pink-solid-button" href="/adpost">List Your Agency Now <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
              <img className="pink-agency__image" src={bannerImg.src} alt="Pinkspot agency advertising" />
            </section>

            <section className="pink-section pink-about">
              <div className="pink-about-card">
                <img src={sec3Slider.src} alt="Pinkspot verified browsing" />
                <h2>About Pinkspot</h2>
                <span className="pink-divider"><i className="fa-solid fa-heart"></i></span>
                <p>Pinkspot is a platform for browsing verified companion listings across Canada. Explore profiles in major cities like Toronto, Vancouver, and Montreal, and connect quickly and discreetly with providers near you.</p>
              </div>
            </section>

            <section className="pink-section pink-faq">
              <div className="pink-section__heading">
                <span className="pink-pill">FAQ</span>
                <h2>Frequently <span>Asked Questions</span></h2>
                <span className="pink-divider"><i className="fa-solid fa-heart"></i></span>
                <p>Find answers to the most common questions about Pinkspot.</p>
              </div>
              <div className="pink-faq-list">
                {faqs.slice(0, 3).map((item, index) => (
                  <details key={item.question} className="pink-faq-item" open>
                    <summary><span>{index + 1}</span>{item.question}<i className="fa-solid fa-chevron-down"></i></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="pink-section pink-faq pink-faq--part-two">
              <div className="pink-faq-list">
                {faqs.slice(3).map((item, index) => (
                  <details key={item.question} className="pink-faq-item" open>
                    <summary><span>{index + 4}</span>{item.question}<i className="fa-solid fa-chevron-down"></i></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
              <div className="pink-support">
                <img src={logo.src} alt="" />
                <div>
                  <strong>Still have questions?</strong>
                  <p>Our support team is here to help.</p>
                  <a href="mailto:support@pinkspot.cc"><i className="fa-regular fa-envelope"></i> support@pinkspot.cc</a>
                </div>
              </div>
            </section>

            <section className="pink-final-cta">
              <div>
                <h2>Ready to <span>get started?</span></h2>
                <p>Join thousands of providers earning on Pinkspot.</p>
                <div className="pink-cta-actions">
                  <Link className="pink-solid-button" href="/adpost"><i className="fa-solid fa-plus"></i> Post Your Ad</Link>
                  <Link className="pink-outline-button" href="/search-escorts"><i className="fa-solid fa-magnifying-glass"></i> Explore Listings</Link>
                </div>
              </div>
              <img src={m7.src} alt="Pinkspot provider" />
            </section>

            <section className="pink-section pink-popular">
              <div className="pink-section__heading">
                <h2>Popular Cities</h2>
                <span className="pink-divider"><i className="fa-regular fa-heart"></i></span>
              </div>
              <div className="pink-popular-grid">
                {popularCities.map((item) => (
                  <Link key={item} href={`/female-escorts/${slugify(item)}`}>{item} Escorts</Link>
                ))}
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
      <DisclaimerModal />
    </>
  );
}
