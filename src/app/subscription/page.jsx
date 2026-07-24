"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useRouter } from 'next/navigation'
import Footer from '../components/footer/Footer'
import { apiUrl } from '../../config/api'

const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [subscriptionDetail, setSubscriptionDetail] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const [selectedPlan, setSelectedPlan] = useState(null); // ✅ store plan
    const [selectedPlanprice, setSelectedPlanprice] = useState(null); // ✅ store plan
    const [showConfirmModal, setShowConfirmModal] = useState(false); // ✅ confirmation modal toggle

    // 👉 Subscribe API Call
    useEffect(() => {
        const plan = new URLSearchParams(window.location.search).get("plan");
        const prices = { silver: "69.99", gold: "99.99" };
        if (prices[plan]) {
            setSelectedPlan(plan);
            setSelectedPlanprice(prices[plan]);
            setShowConfirmModal(true);
        }
    }, []);

    const confirmSubscribe = async () => {
        if (!selectedPlan) return;

        setLoading(true);
        setModalMessage("");
        setShowConfirmModal(false); // close confirmation modal

        try {
            const res = await fetch(
                apiUrl("/subscription/create-subscription"),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, plan: selectedPlan }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                setModalMessage(
                    `🎉 Hurry! Your ${data.subscription.plan} subscription has been activated.`
                );
            } else {
                setModalMessage(`❌ ${data.error || "Something went wrong"}`);
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage("❌ Network error. Please try again.");
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    // 👉 Open confirmation modal first
    const handleSubscribe = (plan, price) => {
        setSelectedPlan(plan);
        setSelectedPlanprice(price)
        setShowConfirmModal(true);
    };

    // 👉 Fetch My Subscription Detail
    const handleShowDetail = async () => {
        try {
            const res = await fetch(
                apiUrl(`/subscription/subscription-detail/${userId}`)
            );
            const data = await res.json();

            if (data.success) {
                setSubscriptionDetail(data.subscription);
            } else {
                setSubscriptionDetail(null);
                setModalMessage(`❌ ${data.error || "No subscription found"}`);
                setShowModal(true);
                return;
            }

            setShowDetailModal(true);
        } catch (err) {
            setModalMessage("❌ Failed to fetch subscription detail.");
            setShowModal(true);
        }
    };

    return (
        <div>
            <div className="subscription-page">
                <Header />
                <section className="h-100 bg-ffdef7 main-content">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <h1 className="text-center text-4b164c mb-2">
                                Unlock Your Excellence With Premium
                            </h1>
                            <h5 className="text-center text-4b164c mb-4 mb-lg-5">
                                Pick the plan that's best for you.
                            </h5>

                            {/* ✅ My Subscription Button */}
                            <div className="text-center mb-5">
                                <button
                                    className="btn bg-4b164c text-white px-4 py-2 rounded-pill"
                                    onClick={handleShowDetail}
                                >
                                    <i className="fa-solid fa-file-lines text-white me-1"></i> My Subscription Detail
                                </button>
                            </div>

                            {/* Basic Plan */}
                            <div className="col-md-4 mb-4">
                                <div className="card pricing-card p-4 h-100">
                                    <h5 className="mb-3">Basic Plan</h5>

                                    <h1 className="price">
                                        $19.99 <span className="fs-6 text-muted">/AD</span>
                                    </h1>
                                    <p className="text-muted">
                                        Get started with our Basic Plan kickstart your AD post
                                        journey
                                    </p>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>✔ No subscription</li>
                                    </ul>

                                    <button onClick={() => router.push("/adpost")} className="btn btn-premium w-100">
                                        Go Basic
                                    </button>
                                </div>
                            </div>

                            {/* Standard Plan */}
                            <div className="col-md-4 mb-4">
                                <div className="card pricing-card highlight p-4 h-100 position-relative">
                                    <span className="popular-badge">Popular</span>
                                    <h5 className="mb-3">Silver Plan</h5>
                                    <h1 className="price">
                                        $69.99 <span className="fs-6 text-muted">/month</span>
                                    </h1>
                                    <p>Post every other day with up to 15 included ads per month.</p>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>✔ Post one AD daily</li>
                                    </ul>
                                    <button
                                        className="btn btn-premium w-100"
                                        onClick={() => handleSubscribe("silver", "69.99")}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Get Silver"}
                                    </button>
                                </div>
                            </div>

                            {/* Premium Plan */}
                            <div className="col-md-4 mb-4">
                                <div className="card pricing-card p-4 h-100">
                                    <h5 className="mb-3">Gold Plan</h5>
                                    <h1 className="price">
                                        $99.99 <span className="fs-6 text-muted">/month</span>
                                    </h1>
                                    <p className="text-muted">
                                        Post daily with up to 30 included ads per month.
                                    </p>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>✔ Post two ADs daily</li>
                                    </ul>
                                    <button
                                        className="btn btn-premium w-100"
                                        onClick={() => handleSubscribe("gold", "99.99")}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Get Gold"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ✅ Confirmation Modal */}
                {showConfirmModal && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-warning">
                                    <h5 className="modal-title">Confirm Subscription</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowConfirmModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">
                                    <h5 className="mb-2">
                                        <strong>{selectedPlan?.toUpperCase()} PLAN</strong>{" "}
                                    </h5>
                                    <h5 className="mb-2">Cost: ${selectedPlanprice?.toUpperCase()} (deducted from wallet)</h5>
                                    <h5 className="mb-2">Validity: 30 days</h5>
                                    <p className="">Click confirm to continue.</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowConfirmModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={confirmSubscribe}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Yes, Confirm"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ Subscription Status Modal */}
                {showModal && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title">Subscription Status</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-light"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ Subscription Detail Modal */}
                {showDetailModal && subscriptionDetail && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title">My Subscription Detail</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowDetailModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table border mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-end w-50">Plan</th>
                                                <td>{subscriptionDetail.plan}</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row" className="border-end">Start Date</th>
                                                <td>{" "}
                                                    {new Date(
                                                        subscriptionDetail.startDate
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-end">End Date</th>
                                                <td>{" "}
                                                    {new Date(
                                                        subscriptionDetail.endDate
                                                    ).toLocaleDateString()}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-end">Days Left</th>
                                                <td>{subscriptionDetail.daysLeft}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-end">Ads Posted Today</th>
                                                <td>{" "}
                                                    {subscriptionDetail.adsPostedToday}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-pill px-4"
                                        onClick={() => setShowDetailModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Backdrops */}
                {(showModal || showDetailModal || showConfirmModal) && (
                    <div className="modal-backdrop fade show"></div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Page;
