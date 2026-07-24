"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ProtectedRoute from "../Common_Method/protectedroute";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import { apiUrl } from "../../config/api";

const Wallet = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [staticWallet, setStaticWallet] = useState(null);
    const [walletLoading, setWalletLoading] = useState(true);
    const [walletError, setWalletError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem("userid");
        const token = sessionStorage.getItem("token");

        const loadWallet = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [balanceResponse, addressResponse] = await Promise.all([
                    fetch(apiUrl(`/payment/info/${userId}`), { headers }),
                    fetch(apiUrl(`/payment/trybit/static-wallet/${userId}`), {
                        method: "POST",
                        headers,
                    }),
                ]);
                const balanceData = await balanceResponse.json();
                const addressData = await addressResponse.json();

                if (balanceResponse.ok) setPaymentInfo(balanceData);
                if (addressResponse.ok) {
                    setStaticWallet(addressData.data);
                } else {
                    setWalletError(addressData.message || "Litecoin wallet is temporarily unavailable.");
                }
            } catch (error) {
                console.error("Error fetching payment info:", error);
                setWalletError("Litecoin wallet is temporarily unavailable.");
            } finally {
                setWalletLoading(false);
            }
        };

        if (userId) loadWallet();
    }, []);

    const balance = Number(paymentInfo?.balance || 0).toFixed(2);
    const copyAddress = async () => {
        if (!staticWallet?.address) return;
        await navigator.clipboard.writeText(staticWallet.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="wallet-page wallet-redesign">
            <Header />

            <main className="wallet-redesign__main">
                <section className="wallet-redesign__shell" aria-labelledby="wallet-title">
                    <header className="wallet-redesign__heading">
                        <h1 id="wallet-title">My Wallet</h1>
                        <p>Add funds to your Pinkspot wallet using Litecoin.</p>
                    </header>

                    <article className="wallet-deposit-card">
                        <div className="wallet-deposit-card__title">
                            <span aria-hidden="true"><i className="fa-solid fa-litecoin-sign"></i></span>
                            <h2>Deposit Litecoin</h2>
                        </div>
                        <p>Scan the QR code or send Litecoin to the address below.</p>

                        <div className="wallet-qr-placeholder" aria-label="Litecoin QR code will be provided by the payment partner"></div>

                        <div className="wallet-address">
                            <span>Your Litecoin Address</span>
                            <div>
                                <code>
                                    {walletLoading
                                        ? "Creating your wallet..."
                                        : staticWallet?.address || "—"}
                                </code>
                                <button
                                    type="button"
                                    aria-label="Copy Litecoin address"
                                    disabled={!staticWallet?.address}
                                    onClick={copyAddress}
                                >
                                    <i className="fa-regular fa-copy" aria-hidden="true"></i>
                                </button>
                            </div>
                            {copied && <small>Address copied</small>}
                            {walletError && <small role="alert">{walletError}</small>}
                        </div>

                        <div className="wallet-deposit-notice">
                            <span aria-hidden="true"><i className="fa-solid fa-clock-rotate-left"></i></span>
                            <div>
                                <strong>Payment will show after blockchain confirmation.</strong>
                                <p>After sending LTC, your deposit is processing. Your CAD balance and transaction history will update automatically once the payment is confirmed.</p>
                            </div>
                        </div>

                        <div className="wallet-deposit-status">
                            <div>
                                <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                <span>Send LTC</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-spinner" aria-hidden="true"></i>
                                <span>Processing</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                                <span>Balance credited</span>
                            </div>
                        </div>

                        <p className="wallet-deposit-warning">
                            Send only Litecoin (LTC) on the supported network. If you sent a payment and it does not appear after confirmation, please contact support with your transaction hash.
                        </p>
                    </article>

                    <article className="wallet-balance-card">
                        <div className="wallet-balance-card__icon" aria-hidden="true">
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                        <div className="wallet-balance-card__amount">
                            <span>Wallet Balance</span>
                            <strong>${balance} <small>CAD</small></strong>
                            <p>Available to use</p>
                        </div>
                        <Link href="/wallet-transactions">
                            <i className="fa-solid fa-receipt" aria-hidden="true"></i>
                            View Transactions
                        </Link>
                    </article>

                    <aside className="wallet-help-card">
                        <span aria-hidden="true">?</span>
                        <div>
                            <strong>Need help?</strong>
                            <p>If you have any questions about deposits or your wallet, contact our support team.</p>
                            <Link href="mailto:support@pinkspot.cc">
                                <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                                support@pinkspot.cc
                            </Link>
                        </div>
                    </aside>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProtectedRoute(Wallet);
