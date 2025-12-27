"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  Phone,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Password validation
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    return { minLength, hasUppercase, hasLowercase };
  };

  const passwordValidation = validatePassword(formData.password);
  const isPasswordValid =
    passwordValidation.minLength &&
    passwordValidation.hasUppercase &&
    passwordValidation.hasLowercase;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Check password validation
    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nid: formData.nid,
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Join CareNest today
          </p>

          {error && (
            <div className="alert alert-error mb-4">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">NID Number</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <CreditCard size={18} className="text-base-content/40" />
                <input
                  type="text"
                  name="nid"
                  placeholder="Enter your NID number"
                  className="grow"
                  value={formData.nid}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <User size={18} className="text-base-content/40" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="grow"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail size={18} className="text-base-content/40" />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="grow"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* Contact */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Phone size={18} className="text-base-content/40" />
                <input
                  type="tel"
                  name="contact"
                  placeholder="01XXXXXXXXX"
                  className="grow"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Lock size={18} className="text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="grow"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-ghost btn-xs btn-circle"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1 text-sm">
                  <div
                    className={`flex items-center gap-2 ${
                      passwordValidation.minLength
                        ? "text-success"
                        : "text-base-content/50"
                    }`}
                  >
                    <CheckCircle size={14} />
                    <span>At least 6 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      passwordValidation.hasUppercase
                        ? "text-success"
                        : "text-base-content/50"
                    }`}
                  >
                    <CheckCircle size={14} />
                    <span>At least 1 uppercase letter</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      passwordValidation.hasLowercase
                        ? "text-success"
                        : "text-base-content/50"
                    }`}
                  >
                    <CheckCircle size={14} />
                    <span>At least 1 lowercase letter</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Lock size={18} className="text-base-content/40" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="grow"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="btn btn-ghost btn-xs btn-circle"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-error text-sm mt-1">Passwords do not match</p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary btn-block ${loading ? "loading" : ""}`}
              disabled={loading || !isPasswordValid}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
