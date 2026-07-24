"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProtectedRoute from "../Common_Method/protectedroute";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { apiUrl } from "../../config/api";

const ITEMS_PER_PAGE = 10;

const WalletTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = sessionStorage.getItem("userid");
        const token = sessionStorage.getItem("token");

        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await axios.get(apiUrl(`/payment/info/${userId}`), {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const sorted = [...(response.data?.transactions || [])].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setTransactions(sorted);
            } catch (fetchError) {
                console.error("Error fetching wallet transactions:", fetchError);
                setError("We couldn't load your transactions. Please try again shortly.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchTransactions();
    }, []);

    const filteredTransactions = useMemo(() => {
        if (filterType === "all") return transactions;
        return transactions.filter((transaction) => transaction.type === filterType);
    }, [filterType, transactions]);

    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const currentTransactions = filteredTransactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleFilter = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const formatTransactionDate = (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return { date: "—", time: "" };

        return {
            date: date.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
            time: date.toLocaleTimeString("en-CA", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
            }),
        };
    };

    return (
        <div className="wallet-transactions-page">
            <Header />

            <main className="wallet-transactions-main">
                <section className="wallet-transactions-shell" aria-labelledby="transactions-title">
                    <Link href="/Wallet" className="wallet-transactions-back">
                        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        Back to Wallet
                    </Link>

                    <div className="wallet-transactions-card">
                        <header className="wallet-transactions-heading">
                            <div>
                                <h1 id="transactions-title">Wallet Transactions</h1>
                                <p>Review all deposits and wallet deductions.</p>
                            </div>

                            <div className="wallet-transaction-filters" aria-label="Filter transactions">
                                {[
                                    ["all", "All"],
                                    ["debit", "Debit"],
                                    ["credit", "Credit"],
                                ].map(([value, label]) => (
                                    <button
                                        type="button"
                                        key={value}
                                        className={`${filterType === value ? "active" : ""} wallet-filter--${value}`}
                                        aria-pressed={filterType === value}
                                        onClick={() => handleFilter(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </header>

                        <div className="wallet-transactions-list">
                            <div className="wallet-transaction-row wallet-transaction-row--header" aria-hidden="true">
                                <span>Date &amp; Time</span>
                                <span>Description</span>
                                <span>Payment ID</span>
                                <span>Status</span>
                                <span>Amount</span>
                            </div>

                            {loading ? (
                                <div className="wallet-transactions-state">
                                    <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                                    <strong>Loading transactions...</strong>
                                </div>
                            ) : error ? (
                                <div className="wallet-transactions-state wallet-transactions-state--error">
                                    <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                                    <strong>Unable to load transactions</strong>
                                    <p>{error}</p>
                                </div>
                            ) : currentTransactions.length ? (
                                currentTransactions.map((transaction) => {
                                    const formattedDate = formatTransactionDate(transaction.createdAt);
                                    const isDebit = transaction.type === "debit";
                                    const status = transaction.status || "pending";
                                    const amount = Number(transaction.amount || 0).toFixed(2);

                                    return (
                                        <article className="wallet-transaction-row" key={transaction._id || transaction.payment_id}>
                                            <div className="wallet-transaction-date" data-label="Date & Time">
                                                <span className={`wallet-transaction-direction ${isDebit ? "debit" : "credit"}`} aria-hidden="true">
                                                    <i className={`fa-solid ${isDebit ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                                                </span>
                                                <div>
                                                    <strong>{formattedDate.date}</strong>
                                                    <span>{formattedDate.time}</span>
                                                </div>
                                            </div>
                                            <div className="wallet-transaction-description" data-label="Description">
                                                {transaction.description || "Wallet transaction"}
                                            </div>
                                            <div className="wallet-transaction-id" data-label="Payment ID">
                                                {transaction.payment_id || "—"}
                                            </div>
                                            <div data-label="Status">
                                                <span className={`wallet-transaction-status wallet-transaction-status--${status.toLowerCase()}`}>
                                                    {status}
                                                </span>
                                            </div>
                                            <strong className={`wallet-transaction-amount ${isDebit ? "debit" : "credit"}`} data-label="Amount">
                                                {isDebit ? "−" : "+"}${amount}
                                            </strong>
                                        </article>
                                    );
                                })
                            ) : (
                                <div className="wallet-transactions-state">
                                    <span className="wallet-transactions-state__icon" aria-hidden="true">
                                        <i className="fa-solid fa-receipt"></i>
                                    </span>
                                    <strong>No transactions found</strong>
                                    <p>Your {filterType === "all" ? "wallet" : filterType} transactions will appear here.</p>
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <nav className="wallet-transactions-pagination" aria-label="Transaction pages">
                                <button
                                    type="button"
                                    aria-label="Previous page"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                    <button
                                        type="button"
                                        key={page}
                                        className={currentPage === page ? "active" : ""}
                                        aria-current={currentPage === page ? "page" : undefined}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    aria-label="Next page"
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                                </button>
                            </nav>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProtectedRoute(WalletTransactions);
