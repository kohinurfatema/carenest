"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  XCircle,
  Eye,
  Package,
} from "lucide-react";

function MyBookingsContent() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();

        if (res.ok) {
          setBookings(data.bookings);
        } else {
          setError(data.message || "Failed to fetch bookings");
        }
      } catch (err) {
        setError("An error occurred while fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking
  const handleCancel = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancellingId(bookingId);

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      const data = await res.json();

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "Cancelled" } : b
          )
        );
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      alert("An error occurred");
    } finally {
      setCancellingId(null);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      Pending: "badge-warning",
      Confirmed: "badge-info",
      Completed: "badge-success",
      Cancelled: "badge-error",
    };

    return <span className={`badge ${styles[status]}`}>{status}</span>;
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center py-16">
              <Package size={64} className="text-base-content/30 mb-4" />
              <h2 className="text-xl font-semibold">No Bookings Yet</h2>
              <p className="text-base-content/60 mb-4">
                You haven&apos;t made any bookings yet.
              </p>
              <Link href="/#services" className="btn btn-primary">
                Browse Services
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg">{booking.serviceName}</h2>
                    <StatusBadge status={booking.status} />
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>
                        {booking.durationValue} {booking.durationType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>
                        {booking.area}, {booking.district}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>{formatDate(booking.createdAt)}</span>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="bg-base-200 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Total Cost</span>
                      <span className="text-xl font-bold text-primary">
                        {booking.totalCost} BDT
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-sm btn-ghost gap-1"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Eye size={14} />
                      Details
                    </button>

                    {booking.status === "Pending" && (
                      <button
                        className={`btn btn-sm btn-error btn-outline gap-1 ${
                          cancellingId === booking._id ? "loading" : ""
                        }`}
                        onClick={() => handleCancel(booking._id)}
                        disabled={cancellingId === booking._id}
                      >
                        <XCircle size={14} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Booking Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-base-content/70">Booking ID</span>
                  <span className="font-mono text-sm">{selectedBooking._id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base-content/70">Service</span>
                  <span className="font-medium">{selectedBooking.serviceName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base-content/70">Status</span>
                  <StatusBadge status={selectedBooking.status} />
                </div>

                <div className="flex justify-between">
                  <span className="text-base-content/70">Duration</span>
                  <span>
                    {selectedBooking.durationValue} {selectedBooking.durationType}
                  </span>
                </div>

                <div className="divider my-2"></div>

                <div>
                  <span className="text-base-content/70 block mb-1">Location</span>
                  <p className="font-medium">
                    {selectedBooking.area}, {selectedBooking.city}
                  </p>
                  <p className="text-sm text-base-content/60">
                    {selectedBooking.district}, {selectedBooking.region}
                  </p>
                </div>

                <div>
                  <span className="text-base-content/70 block mb-1">Address</span>
                  <p className="text-sm">{selectedBooking.address}</p>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between">
                  <span className="text-base-content/70">Total Cost</span>
                  <span className="text-xl font-bold text-primary">
                    {selectedBooking.totalCost} BDT
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base-content/70">Booked On</span>
                  <span className="text-sm">
                    {formatDate(selectedBooking.createdAt)}
                  </span>
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setSelectedBooking(null)}>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <MyBookingsContent />
    </ProtectedRoute>
  );
}
