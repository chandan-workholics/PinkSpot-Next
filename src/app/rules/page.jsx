"use client"

import React from 'react'
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Link from 'next/link';

const term = () => {
    return (
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
    )
}

export default term