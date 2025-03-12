"use client";

import { useState } from "react";
import Link from 'next/link'
import Header from '@/app/components/header/page'

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(false);

    return (
        <>
            <div className="container-fluid p-0">
                <div className="login-page">
                    <Header className="w-100 shadow" />
                    <div className="row main-card">
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <div className="login-content p-5 p-xl-5">
                                <h1 className="fw-bold text-white">Welcome to <br />
                                    <span className="text-4b164c">PINKSPOT</span></h1>
                                <h4 className="text-white">Lorem ipsum dolor sit amet consectetur, <br /> adipisicing elit. Sed hic, eius facere veritatis ut earum!</h4>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <section className=''>
                                <div className="box">
                                    <div className="square"></div>
                                    <div className="square"></div>
                                    <div className="square"></div>
                                    <div className="square"></div>
                                    <div className="square"></div>
                                    <div className="square"></div>

                                    <div className="card-container">
                                        <div className="form">
                                            <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>
                                            <form action="">
                                                {isLogin && (
                                                    <div className="inputBx">
                                                        <input type="text" required placeholder="User Name" />
                                                        <i className="fas fa-user-circle"></i>
                                                    </div>
                                                )}

                                                {!isLogin && (
                                                    <>
                                                        <div className="inputBx">
                                                            <input type="email" required placeholder="Email" />
                                                            <i className="fas fa-envelope"></i>
                                                        </div>

                                                        <div className="inputBx">
                                                            <input type="tel" required placeholder="Mobile Number" />
                                                            <i className="fas fa-phone"></i>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="inputBx password">
                                                    <input type="password" required placeholder="Password" />
                                                    <i className="fas fa-key"></i>
                                                </div>

                                                {!isLogin && (
                                                    <div className="inputBx password">
                                                        <input type="password" required placeholder="Confirm Password" />
                                                        <i className="fas fa-lock"></i>
                                                    </div>
                                                )}

                                                {isLogin && (
                                                    <label className="remember mb-3">
                                                        <input type="checkbox" className="me-2" /> Remember
                                                    </label>
                                                )}

                                                {!isLogin && (
                                                    <label className="terms mb-3">
                                                        <input
                                                            type="checkbox"
                                                            className="me-2"
                                                            checked={agreeTerms}
                                                            onChange={() => setAgreeTerms(!agreeTerms)}
                                                        />
                                                        I agree to the <Link href="#">Terms & Conditions</Link>
                                                    </label>
                                                )}

                                                <div className="inputBx">
                                                    <input type="submit" value={isLogin ? "Log in" : "Sign up"} disabled={!isLogin && !agreeTerms} />
                                                </div>
                                            </form>

                                            {isLogin ? (
                                                <>
                                                    <p>Forgot password? <Link href="#">Click Here</Link></p>
                                                    <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up</span></p>
                                                </>
                                            ) : (
                                                <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login