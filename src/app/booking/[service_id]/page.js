"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getServiceById } from "@/data/services";
import LocationSelector from "@/components/booking/LocationSelector";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function BookingPageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const serviceId = params.service_id;
  const service = getServiceById(serviceId);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form data
  const [duration, setDuration] = useState({
    type: "hours",
    value: 1,
  });

  const [location, setLocation] = useState({
    region: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  // Calculate total cost
  const totalCost =
    duration.type === "hours"
      ? duration.value * (service?.pricePerHour || 0)
      : duration.value * (service?.pricePerDay || 0);

  // Validation for each step
  const isStep1Valid = duration.value >= 1;
  const isStep2Valid =
    location.region &&
    location.district &&
    location.city &&
    location.area &&
    location.address.trim();

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          durationType: duration.type,
          durationValue: duration.value,
          region: location.region,
          district: location.district,
          city: location.city,
          area: location.area,
          address: location.address,
          totalCost,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create booking");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/my-bookings");
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl p-8 text-center">
          <CheckCircle className="text-success mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-base-content/70 mb-4">
            Your booking has been submitted successfully.
          </p>
          <p className="text-sm text-base-content/60">
            Redirecting to My Bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href={`/service/${serviceId}`}
          className="btn btn-ghost btn-sm gap-2 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Service
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Book {service.name}</h1>
          <p className="text-base-content/70 mt-2">
            Complete the form below to book your service
          </p>
        </div>

        {/* Progress Steps */}
        <ul className="steps steps-horizontal w-full max-w-md mx-auto mb-8">
          <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
            Duration
          </li>
          <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
            Location
          </li>
          <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
            Confirm
          </li>
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {error && (
                  <div className="alert alert-error mb-4">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Step 1: Duration */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Clock className="text-primary" />
                      Select Duration
                    </h2>

                    {/* Duration Type */}
                    <div className="form-control mb-6">
                      <label className="label">
                        <span className="label-text font-medium">
                          Duration Type
                        </span>
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="durationType"
                            className="radio radio-primary"
                            checked={duration.type === "hours"}
                            onChange={() =>
                              setDuration({ ...duration, type: "hours", value: 1 })
                            }
                          />
                          <span>Hours</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="durationType"
                            className="radio radio-primary"
                            checked={duration.type === "days"}
                            onChange={() =>
                              setDuration({ ...duration, type: "days", value: 1 })
                            }
                          />
                          <span>Days</span>
                        </label>
                      </div>
                    </div>

                    {/* Duration Value */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Number of {duration.type}
                        </span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={duration.type === "hours" ? 24 : 30}
                        className="input input-bordered w-full"
                        value={duration.value}
                        onChange={(e) =>
                          setDuration({
                            ...duration,
                            value: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">
                          {duration.type === "hours"
                            ? "Max 24 hours per booking"
                            : "Max 30 days per booking"}
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        className="btn btn-primary gap-2"
                        onClick={() => setCurrentStep(2)}
                        disabled={!isStep1Valid}
                      >
                        Next
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <MapPin className="text-primary" />
                      Select Location
                    </h2>

                    <LocationSelector
                      location={location}
                      setLocation={setLocation}
                    />

                    <div className="flex justify-between mt-6">
                      <button
                        className="btn btn-ghost gap-2"
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                      <button
                        className="btn btn-primary gap-2"
                        onClick={() => setCurrentStep(3)}
                        disabled={!isStep2Valid}
                      >
                        Next
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <CheckCircle className="text-primary" />
                      Confirm Booking
                    </h2>

                    <div className="space-y-4">
                      {/* Service */}
                      <div className="bg-base-200 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Service</h3>
                        <p>{service.name}</p>
                      </div>

                      {/* Duration */}
                      <div className="bg-base-200 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Duration</h3>
                        <p>
                          {duration.value} {duration.type}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="bg-base-200 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Location</h3>
                        <p>
                          {location.area}, {location.city}
                        </p>
                        <p className="text-sm text-base-content/70">
                          {location.district}, {location.region}
                        </p>
                        <p className="text-sm text-base-content/70 mt-1">
                          {location.address}
                        </p>
                      </div>

                      {/* Total Cost */}
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Total Cost</h3>
                        <p className="text-2xl font-bold text-primary">
                          {totalCost} BDT
                        </p>
                        <p className="text-sm text-base-content/60">
                          {duration.value} {duration.type} ×{" "}
                          {duration.type === "hours"
                            ? service.pricePerHour
                            : service.pricePerDay}{" "}
                          BDT
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        className="btn btn-ghost gap-2"
                        onClick={() => setCurrentStep(2)}
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                      <button
                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Confirm Booking"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <h3 className="card-title">Order Summary</h3>
                <div className="divider my-2"></div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Service</span>
                    <span className="font-medium">{service.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-base-content/70">Duration</span>
                    <span className="font-medium">
                      {duration.value} {duration.type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-base-content/70">Rate</span>
                    <span className="font-medium">
                      {duration.type === "hours"
                        ? `${service.pricePerHour} BDT/hr`
                        : `${service.pricePerDay} BDT/day`}
                    </span>
                  </div>

                  <div className="divider my-2"></div>

                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">{totalCost} BDT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <ProtectedRoute>
      <BookingPageContent />
    </ProtectedRoute>
  );
}
