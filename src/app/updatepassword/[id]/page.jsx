"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import logo from '../../../../public/images/pink-logo.png'

const page = () => {
    const { id } = useParams(); // reset token from URL
    const router = useRouter();
    const [data, setData] = useState({ password: "", copassword: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.copassword) {
            setMessage({ type: "danger", text: "Passwords do not match" });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch(`http://206.189.130.102:4000/api/v1/users/updatepassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: data.password, resettoken: id }),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: "Password updated successfully!" });
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setMessage({ type: "danger", text: result.message || "Error updating password" });
            }
        } catch (error) {
            setMessage({ type: "danger", text: "Something went wrong" });
        }

        setLoading(false);
    };

    return (
        <div className="container-fluid bg-ffdef7 vh-100">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card rounded-4 shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="text-center mb-4">
                    <img
                        src={logo.src}
                        alt="Logo"
                        style={{ width: "160px" }}
                        className="mb-3"
                    />
                    <h4 className="fw-bold">Update Password</h4>
                    <p className="text-muted">Enter your new password below</p>
                </div>

                {message.text && (
                    <div className={`alert alert-${message.type}`} role="alert">
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={data.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="copassword"
                            className="form-control"
                            value={data.copassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn bg-4b164c text-white w-100"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default page;
