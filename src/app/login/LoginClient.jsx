"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// import Head from "next/head";
import Header from "../components/header/Header";
import callAPI from "../Common_Method/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "../components/spinner/Spinner";

const LoginClient = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [user, setUser] = useState({ email: "", password: "", copassword: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!user.password) {
      toast.error("Password is missing");
      return false;
    }
    if (!isLogin) {
      if (!user.phone || !/^(?:\+1\s?)?(?:\d{3}[\s.-]?\d{3}[\s.-]?\d{4})$/.test(user.phone)) {
        toast.error("Please enter a valid  phone number (e.g. +1 416-555-1234)");
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
          router.push("/adpost");
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
          toast.success("OTP sent on registered email. Please verify to continue.");
          sessionStorage.setItem("userid", response.data?.data?._id);
          setIsLogin(true);
          localStorage.setItem("userid", response.data?.data?._id);
          router.push("/otp");
        } else if (response.status === 202) {
          toast.error("User already exists. But not verified. OTP sent on registered email.")
          router.push("/otp");
        } else if (response.status === 400) {
          toast.error(response.data?.message || "Failed to register. User may already exist");
        }
        else {
          toast.error("Failed to register. User may already exist");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  //  const canonicalUrl = "https://pinkspot.cc/login";
  // const seoImage = "https://pinkspot.cc/static/images/pinkspot-login.jpg"; // Replace with actual
  // const seoTitle = "Pinkspot Login – Female Escorts in Canada, Sex in Toronto";
  // const seoDescription =
  //   "Login to Pinkspot – Canada's trusted escort and adult advertising platform. Connect with female escorts in Toronto and across Canada.";
  // const seoKeywords =
  //   "Pinkspot Login, pinkspot.cc login, escort, Female Escorts in Canada, Sex in Toronto, Toronto escorts, adult services Canada";

  return (
    <>
      {/* <Head>
        <link rel="canonical" href={canonicalUrl} />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="PINK SPOT" />
        <meta name="robots" content="index, follow" />

        
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pinkspot" />

       
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": seoTitle,
          "description": seoDescription,
          "url": canonicalUrl,
          "publisher": {
            "@type": "Organization",
            "name": "Pinkspot",
            "logo": {
              "@type": "ImageObject",
              "url": "https://pinkspot.cc/static/images/logo.png"
            }
          }
        })}</script>
      </Head> */}
      <div className="container-fluid p-lg-0">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="login-page">
          <Header className="w-100 shadow" />
          <div className="row main-card">
            <div className="col-lg-6 d-flex align-items-center justify-content-center px-3 px-lg-0">
              <div className="login-content p-2 pt-4 p-xl-5" data-aos="fade-up" data-aos-duration="1000">
                <h1 className="fw-bold text-white mb-0">Welcome to </h1>
                <h2 className="fw-bold"><span className="text-4b164c">PINKSPOT</span></h2>
                <h5 className="text-white fw-normal">
                  Your trusted platform for advertising...
                </h5>
              </div>
            </div>
            <div className="col-lg-6 px-5 px-lg-0">
              <div className="row h-100 d-flex align-items-center">
                <div className="col-12 col-md-7 col-lg-6 col-xxl-5 mx-auto pb-5 pt-3 pt-lg-5">
                  <div className="box" data-aos="fade-down" data-aos-duration="1000">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="card-container">
                      <div className="form">
                        <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="inputBx">
                            <input type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Email" />
                          </div>
                          {!isLogin && (
                            <>
                              <div className="inputBx">
                                <input type="tel" name="phone" value={user.phone} onChange={handleChange} required placeholder="e.g. 416 555 1234" />
                              </div>
                            </>
                          )}
                          <div className="inputBx password">
                            <input type="password" name="password" value={user.password} onChange={handleChange} required placeholder="Password" />
                          </div>
                          {!isLogin && (
                            <>
                              <div className="inputBx password">
                                <input type="password" name="copassword" value={user.copassword} onChange={handleChange} required placeholder="Confirm Password" />
                              </div>
                              <label className="terms mb-3">
                                <input className="bg-white me-2" type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
                                I agree to the <Link href="#">Terms & Conditions</Link>
                              </label>
                            </>
                          )}
                          <div className="inputBx">
                            <input type="submit" value={loading ? "Processing" : isLogin ? "Log in" : "Sign up"} disabled={loading} />
                          </div>
                        </form>
                        {isLogin ? (
                          <>
                            <p>
                              <Link type="button" href="/forgotpassword" className="btn-link p-0 border-0 bg-transparent">
                                Forgot password?
                              </Link>
                            </p>
                            <p>
                              Don't have an account?{" "}
                              <button type="button" onClick={() => setIsLogin(false)} className="btn-link p-0 border-0 bg-transparent">
                                Sign up
                              </button>
                            </p></>
                        ) : (
                          <p>
                            Already have an account?{" "}
                            <button type="button" onClick={() => setIsLogin(true)} className="btn-link p-0 border-0 bg-transparent">
                              Login
                            </button>
                          </p>
                        )}
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

export default LoginClient;
