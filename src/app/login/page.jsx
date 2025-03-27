"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../components/header/Header";
import callAPI from "../Common_Method/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [user, setUser] = useState({ email: "", password: "", copassword: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
            toast.error("Please enter a valid email");
            return false;
        }
        if (!user.password || user.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        if (!isLogin) {
            if (!user.phone || !/^\d{10}$/.test(user.phone)) {
                toast.error("Please enter a valid 10-digit mobile number");
                return false;
            }
            if (user.password !== user.copassword) {
                toast.error("Passwords do not match");
                return false;
            }
            if (!agreeTerms) {
                toast.error("Please accept terms & conditions");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        try {
            if (isLogin) {
                const response = await callAPI.post("/users/login", {
                    email: user.email,
                    password: user.password
                });
                if (response.status === 200) {
                    toast.success("Login successful");
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("userid", response.data.userdata._id);
                    router.push("/");
                } else {
                    toast.error("Invalid credentials");
                }
            } else {
                const response = await callAPI.post("/users/register", {
                    email: user.email,
                    password: user.password,
                    phone: user.phone
                });
                if (response.status === 200) {
                    toast.success("Registration successful");
                    sessionStorage.setItem("userid", response.data?.data?._id);
                    setIsLogin(true);
                } else {
                    toast.error("Failed to register. User may already exist");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="container-fluid p-0">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="login-page">
                <Header className="w-100 shadow" />
                <div className="row main-card">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="login-content p-5 p-xl-5">
                            <h1 className="fw-bold text-white">Welcome to <br /><span className="text-4b164c">PINKSPOT</span></h1>
                            <h4 className="text-white">Your trusted platform for advertising</h4>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <section>
                            <div className="box">
                                <div className="card-container">
                                    <div className="form">
                                        <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>
                                        <form onSubmit={handleSubmit}>
                                            {isLogin ? (
                                                <>
                                                    <div className="inputBx">
                                                        <input type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Email" />
                                                    </div>
                                                    <div className="inputBx password">
                                                        <input type="password" name="password" value={user.password} onChange={handleChange} required placeholder="Password" />
                                                    </div>
                                                    <label className="remember mb-3">
                                                        <input type="checkbox" className="me-2" /> Remember
                                                    </label>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="inputBx">
                                                        <input type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Email" />
                                                    </div>
                                                    <div className="inputBx">
                                                        <input type="tel" name="phone" value={user.phone} onChange={handleChange} required placeholder="Mobile Number" />
                                                    </div>
                                                    <div className="inputBx password">
                                                        <input type="password" name="password" value={user.password} onChange={handleChange} required placeholder="Password" />
                                                    </div>
                                                    <div className="inputBx password">
                                                        <input type="password" name="copassword" value={user.copassword} onChange={handleChange} required placeholder="Confirm Password" />
                                                    </div>
                                                    <label className="terms mb-3">
                                                        <input type="checkbox" className="me-2" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
                                                        I agree to the <Link href="#">Terms & Conditions</Link>
                                                    </label>
                                                </>
                                            )}
                                            <div className="inputBx">
                                                <input type="submit" value={loading ? "Processing..." : isLogin ? "Log in" : "Sign up"} disabled={loading} />
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
    );
};

export default Login;
