"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = Array.from({ length: 6 }, () => useRef(null));
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("userid");
    if (storedId) {
      setUserId(storedId);
    } else {
      toast.error("User ID not found.");
    }
  }, []);

  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedOtp = otp.join("");

    try {
      const res = await fetch(
        `https://pinkspot.cc/api/v1/users/verifyemailotp/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: combinedOtp }),
        }
      );

      if (res.status === 200) {
        toast.success("OTP Verified Successfully!");
        localStorage.removeItem("userid");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error("Invalid OTP. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  // ✅ Resend OTP
  const handleResendOtp = async () => {
    if (!userId) {
      toast.error("User ID missing. Please try again.");
      return;
    }

    try {
      const res = await fetch("https://pinkspot.cc/api/v1/users/resendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP resent to your email.");
      } else {
        toast.error(data?.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error("Something went wrong while resending OTP.");
    }
  };

  return (
    <>
      <div className="container-fluid p-lg-0">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="login-page">
          <Header className="w-100 shadow" />
          <div className="row main-card">
            <div className="col-lg-6 d-flex align-items-center justify-content-center px-3 px-lg-0">
              <div
                className="login-content p-2 pt-4 p-xl-5"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h1 className="fw-bold text-white mb-0">Welcome to </h1>
                <h2 className="fw-bold">
                  <span className="text-4b164c">PINKSPOT</span>
                </h2>
                <h5 className="text-white fw-normal">
                  Your trusted platform for advertising...
                </h5>
              </div>
            </div>
            <div className="col-lg-6 px-3 px-lg-0">
              <div className="row h-100 d-flex align-items-center">
                <div className="col-12 col-md-7 col-lg-6 col-xxl-5 mx-auto pb-5 pt-3 pt-lg-5">
                  <div className="box" data-aos="fade-down" data-aos-duration="1000">
                    <div className="card-container">
                      <div className="card bg-transparent border-0">
                        <div className="card-body p-0 bg-transparent">
                          <h5 className="card-title text-white">Verify OTP</h5>
                          <p className="card-text text-white">
                            Enter the 6-digit code sent to your email
                          </p>
                          <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between mb-4">
                              {otp.map((digit, index) => (
                                <input
                                  key={index}
                                  type="text"
                                  className="form-control text-center mx-1 border-0 shadow-none text-dark"
                                  style={{
                                    width: "40px",
                                    height: "45px",
                                    fontSize: "20px",
                                  }}
                                  maxLength="1"
                                  value={digit}
                                  onChange={(e) =>
                                    handleChange(index, e.target.value)
                                  }
                                  ref={otpRefs[index]}
                                />
                              ))}
                            </div>
                            <button
                              className="btn btn-login bg-4b164c text-white fw-semibold rounded-pill me-3 py-2 px-3 w-100"
                              type="submit"
                            >
                              Submit
                            </button>
                            <div className="text-center mt-3">
                              <button
                                type="button"
                                className="bg-transparent border-0 btn-link text-white p-0"
                                onClick={handleResendOtp}
                              >
                                Resend OTP
                              </button>
                            </div>
                          </form>
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
    </>
  );
};

export default Otp;
