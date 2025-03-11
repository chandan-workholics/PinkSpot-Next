import React from 'react'
import Link from 'next/link'
import logo from '../../../../public/images/pink-logo.png'

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="bg-faedf8">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <h2 className="text-center fw-bold text-4b164c mb-4">Top Searches In</h2>
                                <p className="searchCitySection text-center">
                                    <span className="cityBadge">Manitoba</span>
                                    <span className="cityBadge">Trois Rivieres</span>
                                    <span className="cityBadge">Sarnia</span>
                                    <span className="cityBadge">Drummondville</span>
                                    <span className="cityBadge">Niagra Region</span>
                                    <span className="cityBadge">Granby</span>
                                    <span className="cityBadge">Windsor</span>
                                    <span className="cityBadge">London</span>
                                    <span className="cityBadge">Barrie</span>
                                    <span className="cityBadge">Saskatoon</span>
                                    <span className="cityBadge">Regina</span>
                                    <span className="cityBadge">Sherbrooke</span>
                                    <span className="cityBadge">Hamilton</span>
                                    <span className="cityBadge">Mississuaga</span>
                                    <span className="cityBadge">Brampton</span>
                                    <span className="cityBadge">Halifax</span>
                                    <span className="cityBadge">Quebec</span>
                                    <span className="cityBadge">Vancouver</span>
                                    <span className="cityBadge">Montreal</span>
                                    <span className="cityBadge">Winnipeg</span>
                                    <span className="cityBadge">Ottawa</span>
                                    <span className="cityBadge">City Of Toronto</span>
                                    <span className="cityBadge">Calgary</span>
                                    <span className="cityBadge">Edmonton</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-4b164c">
                    <div className="container">
                        <footer className="py-5">
                            <div className="row">
                                {/* Newsletter Section */}
                                <div className="col-md-5 mb-3">
                                    <form>
                                        <div className="footer-logo">
                                            <img src={logo.src} alt="" className="w-100" />
                                        </div>
                                        <h5 className='text-white'>Subscribe to our newsletter</h5>
                                        <p className='text-white'>Monthly digest of what's new and exciting from us.</p>
                                        <ul className="list-unstyled d-flex">
                                            <li className="me-3">
                                                <Link href="#" className="link-body-emphasis">
                                                    <i className="fa-brands fa-facebook text-dd88cf fs-3"></i>
                                                </Link>
                                            </li>
                                            <li className="me-3">
                                                <Link href="#" className="link-body-emphasis">
                                                    <i className="fa-brands fa-square-x-twitter text-dd88cf fs-3"></i>
                                                </Link>
                                            </li>
                                            <li className="me-3">
                                                <Link href="#" className="link-body-emphasis">
                                                    <i className="fa-brands fa-linkedin text-dd88cf fs-3"></i>
                                                </Link>
                                            </li>
                                            <li className="me-3">
                                                <Link href="#" className="link-body-emphasis">
                                                    <i className="fa-brands fa-square-instagram text-dd88cf fs-3"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                                {/* Footer Links Section */}
                                <div className="col-md-7 mb-3">
                                    <h5 className='text-white'>Section</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">
                                            <Link href="#" className="nav-link p-0 text-white">
                                                The content on this site is user generated and in no way reflects the views nor is endorsed by the owners of this site. You agree that the owner of this website is released of all liabilities. If you are offended by any material posted on this site you should exit immediately. This entire www.pinkspot.cc website, including its code, images, logos, and names are protected by copyright, and any infringement of said copyright will be prosecuted to the fullest extent of the law. By entering the website you acknowledge and agree to the above and agree to our terms & conditions, rules, and privacy policy. All with links that will navigate to upon clicking the terms & conditions, rules, and privacy policy.
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Copyright & Social Icons */}
                            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                                <p className='text-white'>© 2024 Company, Inc. All rights reserved.</p>

                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer