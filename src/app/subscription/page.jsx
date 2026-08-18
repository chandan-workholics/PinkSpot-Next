"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useRouter } from "next/navigation";
import Footer from "../components/footer/Footer";
import { apiUrl } from "../../config/api";

const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-GB") : "-";

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [subscriptionDetail, setSubscriptionDetail] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedPlanprice, setSelectedPlanprice] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
        setShowConfirmModal(false);

        try {
            const res = await fetch(apiUrl("/subscription/create-subscription"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, plan: selectedPlan }),
            });

            const data = await res.json();

            if (res.ok) {
                setModalMessage(`Hurry! Your ${data.subscription.plan} subscription has been activated.`);
            } else {
                setModalMessage(data.error || "Something went wrong");
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage("Network error. Please try again.");
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = (plan, price) => {
        setSelectedPlan(plan);
        setSelectedPlanprice(price);
        setShowConfirmModal(true);
    };

    const handleShowDetail = async () => {
        try {
            const res = await fetch(apiUrl(`/subscription/subscription-detail/${userId}`));
            const data = await res.json();

            if (data.success) {
                setSubscriptionDetail(data.subscription);
            } else {
                setSubscriptionDetail(null);
                setModalMessage(data.error || "No subscription found");
                setShowModal(true);
                return;
            }

            setShowDetailModal(true);
        } catch (err) {
            setModalMessage("Failed to fetch subscription detail.");
            setShowModal(true);
        }
    };

    return (
        <div>
            <div className="subscription-page">
                <Header />
                <section className="h-100 bg-ffdef7 main-content subscription-main">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <h1 className="text-center text-4b164c mb-2">
                                Unlock Your Excellence With Premium
                            </h1>
                            <h5 className="text-center text-4b164c mb-4 mb-lg-5">
                                Pick the plan that's best for you.
                            </h5>

                            <div className="text-center mb-5">
                                <button
                                    className="btn bg-4b164c text-white px-4 py-2 rounded-pill"
                                    onClick={handleShowDetail}
                                >
                                    <i className="fa-solid fa-file-lines text-white me-1"></i> My Subscription Detail
                                </button>
                            </div>

                            <div className="col-12">
                                <div className="pink-pricing-list subscription-pricing-list">
                                    <article className="pink-pricing-plan subscription-pricing-plan">
                                        <div className="pink-pricing-plan__top">
                                            <div className="pink-pricing-plan__identity">
                                                <div className="pink-pricing-plan__icon" aria-hidden="true">
                                                    <i className="fa-solid fa-tag"></i>
                                                </div>
                                                <div>
                                                    <h2>Single Ad</h2>
                                                    <p>Valid for 30 days.</p>
                                                </div>
                                            </div>
                                            <span className="pink-pricing-plan__badge">Pay As You Go</span>
                                        </div>

                                        <div className="pink-pricing-plan__purchase">
                                            <div className="pink-pricing-plan__price">
                                                <strong>$19.99</strong>
                                                <span>/ per ad</span>
                                            </div>
                                            <button onClick={() => router.push("/adpost")} className="pink-pricing-plan__button" type="button">
                                                Get Started
                                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <ul className="pink-pricing-plan__features">
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Up to 12 Photos</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Standard Listing</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>No verification badge</span></li>
                                        </ul>
                                    </article>

                                    <article className="pink-pricing-plan pink-pricing-plan--featured subscription-pricing-plan">
                                        <div className="pink-pricing-plan__top">
                                            <div className="pink-pricing-plan__identity">
                                                <div className="pink-pricing-plan__icon" aria-hidden="true">
                                                    <i className="fa-solid fa-medal"></i>
                                                </div>
                                                <div>
                                                    <h2>Silver Plan</h2>
                                                    <p>Valid for 30 days.</p>
                                                </div>
                                            </div>
                                            <span className="pink-pricing-plan__badge">Most Popular</span>
                                        </div>

                                        <div className="pink-pricing-plan__purchase">
                                            <div className="pink-pricing-plan__price">
                                                <strong>$69.99</strong>
                                                <span>/ month</span>
                                            </div>
                                            <button
                                                className="pink-pricing-plan__button"
                                                onClick={() => handleSubscribe("silver", "69.99")}
                                                disabled={loading}
                                                type="button"
                                            >
                                                {loading ? "Processing..." : "Get Silver"}
                                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <ul className="pink-pricing-plan__features">
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Verification Badge</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Up to 12 Photos</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>15 Ads (Post Anytime)</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Save over $229/month</span></li>
                                        </ul>
                                    </article>

                                    <article className="pink-pricing-plan pink-pricing-plan--featured pink-pricing-plan--gold subscription-pricing-plan">
                                        <div className="pink-pricing-plan__top">
                                            <div className="pink-pricing-plan__identity">
                                                <div className="pink-pricing-plan__icon" aria-hidden="true">
                                                    <i className="fa-solid fa-crown"></i>
                                                </div>
                                                <div>
                                                    <h2>Gold Plan</h2>
                                                    <p>Valid for 30 days.</p>
                                                </div>
                                            </div>
                                            <span className="pink-pricing-plan__badge">Best Value</span>
                                        </div>

                                        <div className="pink-pricing-plan__purchase">
                                            <div className="pink-pricing-plan__price">
                                                <strong>$99.99</strong>
                                                <span>/ month</span>
                                            </div>
                                            <button
                                                className="pink-pricing-plan__button"
                                                onClick={() => handleSubscribe("gold", "99.99")}
                                                disabled={loading}
                                                type="button"
                                            >
                                                {loading ? "Processing..." : "Get Gold"}
                                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <ul className="pink-pricing-plan__features">
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Verification Badge</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Up to 12 Photos</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>30 Ads (Post Anytime)</span></li>
                                            <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Save over $499/month</span></li>
                                        </ul>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {showConfirmModal && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-warning">
                                    <h5 className="modal-title">Confirm Subscription</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                                </div>
                                <div className="modal-body text-center">
                                    <h5 className="mb-2">
                                        <strong>{selectedPlan?.toUpperCase()} PLAN</strong>
                                    </h5>
                                    <h5 className="mb-2">Cost: ${selectedPlanprice?.toUpperCase()} (deducted from wallet)</h5>
                                    <h5 className="mb-2">Validity: 30 days</h5>
                                    <p>Click confirm to continue.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={confirmSubscribe} disabled={loading}>
                                        {loading ? "Processing..." : "Yes, Confirm"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title">Subscription Status</h5>
                                    <button type="button" className="btn-close btn-light" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showDetailModal && subscriptionDetail && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title">My Subscription Detail</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
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
                                                <td>{formatDate(subscriptionDetail.startDate)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-end">End Date</th>
                                                <td>{formatDate(subscriptionDetail.endDate)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-end">Days Left</th>
                                                <td>{subscriptionDetail.daysLeft}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-end">Ads Remaining</th>
                                                <td>{subscriptionDetail.adsRemaining ?? 0}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowDetailModal(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(showModal || showDetailModal || showConfirmModal) && (
                    <div className="modal-backdrop fade show"></div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Page;
