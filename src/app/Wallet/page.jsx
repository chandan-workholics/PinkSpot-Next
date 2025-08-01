"use client";

import React, { useEffect, useState } from 'react';
import Header from "../components/header/Header";
import WalletImg from "../../../public/images/walletImg.png";
import ProtectedRoute from '../Common_Method/protectedroute';

const userId = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

const Wallet = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(""); // For dynamic input

    const createPayment = async () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("http://206.189.130.102:4000/api/v1/payment/create-invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    order_id: Date.now(),
                    title: "Add Funds"
                }),
            });

            const data = await res.json();
            setLoading(false);
            window.location.href = data.payment_url;
        } catch (error) {
            console.error("Error creating payment:", error);
            setLoading(false);
        }
    };

    const paymentInformation = async () => {
        try {
            const res = await fetch(`http://206.189.130.102:4000/api/v1/payment/info/${userId}`);
            const data = await res.json();
            setPaymentInfo(data);
        } catch (error) {
            console.error("Error fetching payment info:", error);
        }
    };

    useEffect(() => {
        setLoading(false);
        paymentInformation();
    }, []);

    return (
        <div className="container-fluid p-lg-0">
            <div className="wallet-page">
                <Header className="w-100 shadow" />
                <div className="main-card d-flex align-items-center justify-content-center">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-lg-6 d-flex align-items-center justify-content-center px-3 px-lg-0">
                                <div className="login-content p-2 pt-4 p-xl-5" data-aos="fade-up" data-aos-duration="1000">
                                    <h2 className="fw-bold text-white mb-0">Manage Your</h2>
                                    <h1 className="fw-bold"><span className="text-4b164c">Digital Wallet</span></h1>
                                    <h5 className="text-white fw-normal">
                                        Easily track and control your advertising funds.
                                        Secure, simple, and built for your success.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-6 px-3 px-lg-0">
                                <div className="row h-100 d-flex align-items-center">
                                    <div className="col-12 col-md-9 col-lg-8 col-xxl-7 mx-auto pb-5 pt-3 pt-lg-5">
                                        <div className="box" data-aos="fade-down" data-aos-duration="1000">
                                            <div className="card-container">
                                                <div className="wallet-container text-center p-4 rounded-5">
                                                    <h5 className="page-title">My E-wallet</h5>
                                                    <div className="amount-box text-center">
                                                        <img src={WalletImg.src} alt="Wallet" width={200} className="mb-4" />
                                                        <h5>Total Balance</h5>
                                                        <h5 className="amount"> ${paymentInfo?.balance}</h5>
                                                    </div>

                                                    <div className="form-group my-3">
                                                        <input
                                                            type="number"
                                                            className="form-control text-center rounded-pill"
                                                            placeholder="Enter amount $ to add"
                                                            value={amount}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            min="1"
                                                            disabled={loading}
                                                        />
                                                    </div>

                                                    <div className="btn-group text-center mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={createPayment}
                                                            className="btn w-100 shadow btn-login bg-fcf3fa text-4b164c fw-semibold rounded-pill py-2 px-3"
                                                            disabled={loading}
                                                        >
                                                            {loading ? "Processing..." : "Add Money"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProtectedRoute(Wallet);
