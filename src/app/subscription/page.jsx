import React from 'react'
import Header from "../components/header/Header";

const page = () => {
    return (
        <div>
            <div className="subscription-page">
                {/* Header */}
                <Header />
                {/* Contact Section */}
                <section className="h-100 bg-ffdef7 main-content">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <h1 className="text-center text-4b164c mb-2">Unlock Your Excellence With Premium</h1>
                            <h5 className="text-center text-4b164c mb-4 mb-lg-5">Pick the plan that's best for you.</h5>
                            {/* Basic Plan */}
                            <div className="col-md-4 mb-4">
                                <div className="card pricing-card p-4 h-100">
                                    <h5 className="mb-3">Basic Plan</h5>
                                    <h1 className="price">
                                        $120.00 <span className="fs-6 text-muted">/AD</span>
                                    </h1>
                                    <p className="text-muted">
                                        Get started with our Basic Plan kickstart your AD post journey
                                    </p>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>✔ No subscription</li>
                                    </ul>
                                    <button className="btn bg-4b164c text-white w-100">Current Plan</button>
                                </div>
                            </div>

                            {/* Premium Plan */}
                            <div className="col-md-4 mb-4">
                                <div className="card pricing-card highlight p-4 h-100 position-relative">
                                    <span className="popular-badge">Popular</span>
                                    <h5 className="mb-3">Standard Plan</h5>
                                    <h1 className="price">
                                        $100.00 <span className="fs-6 text-muted">/month</span>
                                    </h1>
                                    <p>Premium Plan for a comprehensive experience.</p>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>✔ Post one AD daily</li>
                                    </ul>
                                    <button className="btn btn-premium w-100">Go Premium</button>
                                </div>
                            </div>

                            {/* VIP Plan */}
                            <div className="col-md-4 mb-4">
                                <div className="card pricing-card p-4 h-100">
                                    <h5 className="mb-3">Premium Plan</h5>
                                    <h1 className="price">
                                        $150.00 <span className="fs-6 text-muted">/month</span>
                                    </h1>
                                    <p className="text-muted">
                                        Go Pro and take your experience to the next level.
                                    </p>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>✔ Post two ADs daily</li>
                                    </ul>
                                    <button className="btn btn-premium w-100">Go Premium</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default page