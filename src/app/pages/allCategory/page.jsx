import React from 'react'
import Link from 'next/link'
import Footer from '@/app/components/footer/page'
import Header from '@/app/components/header/page'

const AllCategory = () => {
    return (
        <>
            <div className="container-fluid p-0">
                <div className="category-page">
                    <div className='home-banner'>
                        <Header className="position-absolute w-100" />
                        <div className="container">
                            <div className="banner-content text-start">
                                <div className="">
                                    <h1 className="text-white">Single Profile</h1>
                                    <h3 className="text-white">
                                        Home
                                        <i className="fa-solid fa-angle-right text-white mx-2 fs-6"></i>
                                        All Category
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container d-grid">
                        <div className="page-content">
                            <div className="card">
                            <img src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400&fit=max" alt="Mountain View"/>
                                <div className="content">
                                    <h2 className="title">Mountain View</h2>
                                    <p className="copy">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p>
                                    <button className="btn">View Trips</button>
                                </div>
                            </div>
                            <div className="card">
                            <img src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400&fit=max" alt="Mountain View"/>
                                <div className="content">
                                    <h2 className="title">To The Beach</h2>
                                    <p className="copy">Plan your next beach trip with these fabulous destinations</p>
                                    <button className="btn">View Trips</button>
                                </div>
                            </div>
                            <div className="card">
                            <img src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400&fit=max" alt="Mountain View"/>
                                <div className="content">
                                    <h2 className="title">Desert Destinations</h2>
                                    <p className="copy">It's the desert you've always dreamed of</p>
                                    <button className="btn">Book Now</button>
                                </div>
                            </div>
                            <div className="card">
                            <img src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=400&fit=max" alt="Mountain View"/>
                                <div className="content">
                                    <h2 className="title">Explore The Galaxy</h2>
                                    <p className="copy">Seriously, straight up, just blast off into outer space today</p>
                                    <button className="btn">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AllCategory