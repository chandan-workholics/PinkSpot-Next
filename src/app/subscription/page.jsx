"use client";

import React, { useState } from "react";
import Header from "../components/header/Header";

const userId =
  typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [subscriptionDetail, setSubscriptionDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 👉 Subscribe Function
  const handleSubscribe = async (plan) => {
    setLoading(true);
    setModalMessage("");

    try {
      const res = await fetch(
        "https://pinkspot.cc/api/v1/subscription/create-subscription",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, plan }),
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

  // 👉 Fetch My Subscription Detail
  const handleShowDetail = async () => {
    try {
      const res = await fetch(
        `https://pinkspot.cc/api/v1/subscription/subscription-detail/${userId}`
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
                  className="btn btn-outline-dark px-4 py-2"
                  onClick={handleShowDetail}
                >
                  📋 My Subscription Detail
                </button>
              </div>

              {/* Basic Plan */}
              <div className="col-md-4 mb-4">
                <div className="card pricing-card p-4 h-100">
                  <h5 className="mb-3">Basic Plan</h5>
                  <h1 className="price">
                    $20.00 <span className="fs-6 text-muted">/AD</span>
                  </h1>
                  <p className="text-muted">
                    Get started with our Basic Plan kickstart your AD post
                    journey
                  </p>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>✔ No subscription</li>
                  </ul>
                  <button className="btn bg-4b164c text-white w-100">
                    Current Plan
                  </button>
                </div>
              </div>

              {/* Standard Plan */}
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
                  <button
                    className="btn btn-premium w-100"
                    onClick={() => handleSubscribe("standard")}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Go Standard"}
                  </button>
                </div>
              </div>

              {/* Premium Plan */}
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
                  <button
                    className="btn btn-premium w-100"
                    onClick={() => handleSubscribe("premium")}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Go Premium"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Subscription Confirmation Modal */}
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
                    className="btn-close"
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
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Plan:</strong> {subscriptionDetail.plan}
                    </li>
                    <li className="list-group-item">
                      <strong>Start Date:</strong>{" "}
                      {new Date(
                        subscriptionDetail.startDate
                      ).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <strong>End Date:</strong>{" "}
                      {new Date(
                        subscriptionDetail.endDate
                      ).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <strong>Days Left:</strong> {subscriptionDetail.daysLeft}
                    </li>
                    <li className="list-group-item">
                      <strong>Ads Posted Today:</strong>{" "}
                      {subscriptionDetail.adsPostedToday}
                    </li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
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
        {(showModal || showDetailModal) && (
          <div className="modal-backdrop fade show"></div>
        )}
      </div>
    </div>
  );
};

export default Page;
