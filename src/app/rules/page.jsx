"use client"

import React, { useEffect, useState } from 'react'
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Link from 'next/link';
import Head from "next/head";

const term = () => {
    const [seo, setSeo] = useState({});
  const canonicalUrl = "https://pinkspot.cc/rules/";
  const ogImage = "https://pinkspot.cc/api/v1/uploads/4bcbbf50c52b57fe1dd3fb78c1b4f22c.png";

  const getSeoDetail = () => {
    fetch(`https://pinkspot.cc/api/v1/pages/getPageById/653281cdefe8c2f29fdcecaf`)
      .then((res) => res.json())
      .then((data) => {
        setSeo(data?.data || {});
      })
      .catch((err) => console.error("SEO fetch error:", err));
  };

  useEffect(() => {
    getSeoDetail();
  }, []);
    return (
        <>
         <Head>
        {/* Basic Meta */}
        <title>{seo.seotitle || "Official Rules & Posting Guidelines - PinkSpot"}</title>
        <meta
          name="description"
          content={
            seo.seodescription ||"Read PinkSpot's official rules & posting guidelines to ensure safe and respectful ad posting."
          }
        />
        <meta
          name="keywords"
          content={
            seo.seokeyword || "PinkSpot rules, posting guidelines, ad restrictions, terms, safe posting, PinkSpot ads"
          }
        />
        <meta name="author" content="PINK SPOT" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Preload OG Image for faster preview */}
        <link rel="preload" as="image" href={ogImage} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.seotitle || "Official Rules & Posting Guidelines"} />
        <meta property="og:description" content={seo.seodescription || "Stay informed with PinkSpot's ad posting guidelines and rules."} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="PinkSpot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.seotitle || "Official Rules & Posting Guidelines"} />
        <meta name="twitter:description" content={seo.seodescription || "Safe and respectful ad posting on PinkSpot."} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@pinkspot" />

        {/* Schema.org JSON-LD for SEO Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: seo.seotitle || "Official Rules & Posting Guidelines",
              description:
                seo.seodescription ||"PinkSpot's official rules and posting guidelines to maintain safety and quality.",
              url: canonicalUrl,
              publisher: {
                "@type": "Organization",
                name: "PinkSpot",
                logo: {
                  "@type": "ImageObject",
                  url: ogImage,
                },
              },
              image: ogImage,
            }),
          }}
        />
      </Head>
        <div>
            <div className="container-fluid p-0">
                <div className="terms-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">OFFICIAL RULES & POSTING GUIDELINES</h1>
                                    <h3 className="text-white">
                                        Home <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i>OFFICIAL RULES & POSTING GUIDELINES
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className='container mt-3'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <p className='text-responsive'>
                                        These Official Rules apply to every user or member who posts ads in our website. To post or respond to any ads you must behave in a peaceful, civil, prudent and respectful manner at all times. You hereby acknowledged that we do not review or monitor any post or any respond thereof board. We have provided the following guidelines to make sure our users or members will interact freely and will avoid any harmful or illegal activities.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='container mt-3'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h4>RESTRICTED CONTENT:</h4>
                                    <p className='text-responsive'>
                                        Your ads content including but not limited to any words, pictures, audios, videos, images, etc. should not infringe the intellectual property rights or privacy rights of others and should not contain anything defamatory, fraudulent, deceptive, inaccurate, abusive, threatening, offensive, and obscene or promote any drug-related or illegal activities.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='container mt-3'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h4>AD RULES:</h4>
                                    <p className='text-responsive'>
                                        We are offering one free ads per day. If you want to post more ads you can do so by paying a certain fees each time and to use our services or post any ads in our website you hereby agree to the following rules, including but not limited to
                                    </p>
                                    <ul>
                                        <li>Post you ads in the right category</li>
                                        <li>do not post anything or post as frequently which may looks spam</li>
                                        <li>If you are a free user, don’t create or use more than one account, creating or posting from multiple accounts will terminate or restrict you use of our website and its services.</li>
                                        <li>If you are a paid user, you can have multiple paid accounts.</li>
                                        <li>Do not advertisement or promote any goods or services such as weapons, illegal drugs, used or recalled food and cosmetics; ID cards, counterfeit or pirated items, and child pornography, human trafficking, or the exploitation or endangerment of minors.</li>
                                        <li>Do not Advertise or solicit directly or in any “coded” fashion any illegal service, including an offer to provide sexual services for money or other consideration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='container mt-3'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h4>REPORTING:</h4>
                                    <p className='text-responsive'>
                                        You can report us at support@pinkspot.cc if you suspect or if you have a reasonable belief that any ads content posted or published on our website violate our Terms of Service, gives misleading information, or serves the purpose of harassing or endangering yourself or others or infringe any intellectual property rights or copyrights .If you have a reason to suspect that content distributed might be of suspected criminal activity, please report it immediately to the appropriate law enforcement agency. Once contacted by the proper authorities we will cooperate to the fullest extent possible. We will not act on allegations or suspicions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default term