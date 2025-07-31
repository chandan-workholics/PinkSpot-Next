"use client";
import { useState, useEffect } from "react";

export default function MyWallet() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState(20); // default $20
    const [invoice, setInvoice] = useState(null);
    const [polling, setPolling] = useState(false);
    const userId = "user-123"; // Replace with dynamic user ID if using auth

    const fetchWalletInfo = async () => {
        const res = await fetch(`/api/wallet/info/${userId}`);
        const data = await res.json();
        setBalance(data.balance);
        setTransactions(data.transactions);
    };

    useEffect(() => {
        fetchWalletInfo();
    }, []);

    const handleCreateInvoice = async () => {
        const res = await fetch("/api/wallet/create-invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, amount }),
        });

        const data = await res.json();
        setInvoice(data);
        setPolling(true);
    };

    useEffect(() => {
        if (!polling || !invoice?.payment_id) return;

        const interval = setInterval(async () => {
            const res = await fetch(`/api/wallet/info/${userId}`);
            const data = await res.json();

            setBalance(data.balance);
            setTransactions(data.transactions);

            const confirmed = data.transactions.find(
                (t) => t.payment_id === invoice.payment_id && t.status === "confirmed"
            );

            if (confirmed) {
                setPolling(false);
                setInvoice(null);
                setShowModal(false);
                alert("Payment confirmed! Wallet updated.");
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [polling, invoice, userId]);

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Wallet</h1>
            <p className="mb-4">Current Balance: <strong>${balance.toFixed(2)}</strong></p>

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Funds
            </button>

            <h2 className="mt-8 text-xl font-semibold">Transaction History</h2>
            <ul className="mt-2 space-y-2">
                {transactions.map((tx) => (
                    <li key={tx._id} className="border p-2 rounded">
                        <div>${tx.amount_usd} | {tx.crypto_currency.toUpperCase()}</div>
                        <div>Status: <strong>{tx.status}</strong></div>
                        <div>{new Date(tx.createdAt).toLocaleString()}</div>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Add Funds</h2>

                        {!invoice ? (
                            <>
                                <label className="block mb-2">Select Amount:</label>
                                <select
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full mb-4 border px-3 py-2 rounded"
                                >
                                    <option value={10}>$10</option>
                                    <option value={20}>$20</option>
                                    <option value={50}>$50</option>
                                </select>

                                <button
                                    onClick={handleCreateInvoice}
                                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                                >
                                    Generate QR Code
                                </button>
                            </>
                        ) : (
                            <div className="text-center">
                                <img src={invoice.qrcode_url} alt="QR Code" className="mx-auto my-4" />
                                <p className="mb-2">Send exactly <strong>{invoice.pay_amount} LTC</strong> to:</p>
                                <p className="font-mono break-all">{invoice.pay_address}</p>
                                <p className="mt-4 text-sm text-yellow-600">
                                    Waiting for payment confirmation. Your wallet will update automatically.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowModal(false);
                                setInvoice(null);
                                setPolling(false);
                            }}
                            className="mt-6 w-full border px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
