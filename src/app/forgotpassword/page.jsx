"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header/Header";
import emailSentGif from "../../../public/images/emailsent.gif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://pinkspot.cc/api/v1/users/forgetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let result;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        // Fallback if it's HTML or something else
        const text = await response.text();
        console.error("Non-JSON response:", text);
        toast.error("Server returned unexpected data");
        setLoading(false);
        return;
      }

      if (response.ok) {
        setSuccess(true);
      } else {
        toast.error(result?.message || "Invalid credentials");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="container-fluid p-lg-0">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="login-page">
          <Header className="w-100 shadow" />
          <div className="row main-card">
            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center px-3 px-lg-0">
              <div
                className="login-content p-2 pt-4 p-xl-5"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h1 className="fw-bold text-white mb-0">Forgot Your</h1>
                <h2 className="fw-bold">
                  <span className="text-4b164c">Password?</span>
                </h2>
                {/* <h5 className="text-white fw-normal">
                  Enter your email to reset your password.
                </h5> */}
              </div>
            </div>
            <div className="col-lg-6 px-5 px-lg-0">
              <div className="row h-100 d-flex align-items-center">
                <div className="col-12 col-md-7 col-lg-6 col-xxl-5 mx-auto pb-5 pt-3 pt-lg-5">
                  <div
                    className="box"
                    data-aos="fade-down"
                    data-aos-duration="1000"
                  >
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="card-container">
                      {success ? (
                        <div className="p-lg-5 text-center">
                          <div className="d-flex justify-content-center">
                            <div className="mb-4 d-flex justify-content-center align-items-center shadow rounded-circle bg-white p-3"
                              style={{
                                width: "120px",
                                height: "120px",
                              }}
                            >
                              <img
                                src={emailSentGif.src}
                                alt="Email Sent"
                                className="w-100 h-100 object-contain"
                              />
                            </div>
                          </div>
                          <h3 className="text-4b164c fw-bold">
                            Check Your Email
                          </h3>
                          <h6 className="text-white fw-normal">
                            We’ve sent you a password reset link. Please check your inbox or spam folder.
                          </h6>

                          <button
                            className="btn bg-4b164c text-white mt-3 px-4 py-2 fw-semibold"
                            style={{ borderRadius: "50px", fontSize: "15px" }}
                            onClick={() => router.push("/login")}
                          >
                            Go to Login
                          </button>
                        </div>
                      ) : (
                        <div className="form">
                          <h2>FORGOT PASSWORD</h2>
                          <form onSubmit={handleSubmit}>
                            <div className="inputBx">
                              <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="inputBx">
                              <input
                                type="submit"
                                value={loading ? "Processing..." : "Forgot Password"}
                                disabled={loading}
                                style={{ maxWidth: "100%" }}
                              />
                            </div>
                          </form>
                          <p>
                            Remembered your password?{" "}
                            <Link href="/login" className="btn-link p-0 border-0 bg-transparent">
                              Login
                            </Link>
                          </p>
                        </div>
                      )}
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

export default ForgotPassword;
