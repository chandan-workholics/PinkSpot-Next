"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '../Common_Method/protectedroute';
import Header from "../components/header/Header";
const userId = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

const walletTransaction = () => {

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterType, setFilterType] = useState('all'); // 'all', 'credit', 'debit'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://206.189.130.102:4000/api/v1/payment/info/${userId}`);
                const sortedData = response.data.transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTransactions(sortedData);
                setFilteredTransactions(sortedData);
            } catch (error) {
                console.error('Error fetching wallet transactions:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleFilter = (type) => {
        setFilterType(type);
        if (type === 'all') {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter((tx) => tx.type === type);
            setFilteredTransactions(filtered);
        }
    };

    const formatDate = (isoDate) => new Date(isoDate).toLocaleString();


    return (
        <div className="container-fluid p-0">
            <div className="wallet-page">
                <Header className="w-100 shadow" />
                <div className="main-card d-flex justify-content-center">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-12 px-3 px-lg-0">
                                <div className="row">
                                    <div className="col-12 col-lg-11 col-xxl-10 mx-auto pb-5 pt-3 pt-lg-5">
                                        <div className="box" data-aos="fade-down" data-aos-duration="1000">
                                            <div className="card-container">
                                                <div className="wallet-container text-center p-4 rounded-5">
                                                    <div className="d-lg-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="page-title mb-3 mb-lg-0">Wallet Transactions</h5>
                                                        <div className="btn-group gap-2 justify-content-end">
                                                            <button
                                                                className="btn shadow btn-secondary text-white fw-semibold rounded-pill py-2 px-4"
                                                                onClick={() => handleFilter('all')}
                                                            >
                                                                All
                                                            </button>
                                                            <button
                                                                className={`btn shadow btn-login ${filterType === 'debit' ? 'bg-danger' : 'bg-ff0000'} text-white fw-semibold rounded-pill py-2 px-3`}
                                                                onClick={() => handleFilter('debit')}
                                                            >
                                                                Debit
                                                            </button>
                                                            <button
                                                                className={`btn shadow btn-login ${filterType === 'credit' ? 'bg-success' : 'bg-04c904'} text-white fw-semibold rounded-pill py-2 px-3`}
                                                                onClick={() => handleFilter('credit')}
                                                            >
                                                                Credit
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="transaction-table">
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" style={{ minWidth: '160px', maxWidth: '170px' }}>Date & Time</th>
                                                                        <th scope="col" style={{ minWidth: '170px', maxWidth: '200px' }} className='text-start'>Description</th>
                                                                        <th scope="col" style={{ minWidth: '120px', maxWidth: '130px' }}>Payment ID</th>
                                                                        <th scope="col" style={{ minWidth: '120px', maxWidth: '130px' }}>Status</th>
                                                                        <th scope="col" style={{ minWidth: '120px', maxWidth: 'fit-content' }}>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {filteredTransactions.length > 0 ? (
                                                                        filteredTransactions.map((tx) => (
                                                                            <tr key={tx._id}>
                                                                                <td className='text-start'>
                                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                                        {tx.type === 'debit' ? (
                                                                                            <i className="fas fa-arrow-up me-3" style={{ color: "#ff0000", transform: "rotateZ(30deg)" }}></i>
                                                                                        ) : (
                                                                                            <i className="fas fa-arrow-up me-3" style={{ color: "#00ff00", transform: "rotateZ(-150deg)" }}></i>
                                                                                        )}
                                                                                        {formatDate(tx.createdAt)}
                                                                                    </div>
                                                                                </td>
                                                                                <td className='text-start'>{tx.description}</td>
                                                                                <td>{tx.payment_id}</td>
                                                                                <td className='text-capitalize'>
                                                                                    {tx.status === 'confirmed' ? (
                                                                                        <span className="text-success">{tx.status}</span>
                                                                                    ) : (
                                                                                        <span className="text-warning">{tx.status}</span>
                                                                                    )}
                                                                                </td>
                                                                                <td className={tx.type === 'debit' ? 'text-danger' : 'text-success'}>
                                                                                    {tx.type === 'debit' ? '-' : '+'} ${tx.amount.toFixed(2)}
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="4" className="text-center">No transactions found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
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
        </div>
    )
}

export default ProtectedRoute(walletTransaction);