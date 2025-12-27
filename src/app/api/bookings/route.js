import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getServiceById } from "@/data/services";
import { sendBookingInvoice } from "@/lib/sendEmail";

// GET - Fetch user's bookings
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const bookings = await Booking.find({ userId: session.user.id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new booking
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      serviceId,
      serviceName,
      durationType,
      durationValue,
      region,
      district,
      city,
      area,
      address,
      totalCost,
    } = body;

    // Validate required fields
    if (
      !serviceId ||
      !serviceName ||
      !durationType ||
      !durationValue ||
      !region ||
      !district ||
      !city ||
      !area ||
      !address ||
      !totalCost
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate service exists
    const service = getServiceById(serviceId);
    if (!service) {
      return NextResponse.json(
        { message: "Invalid service" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create booking
    const booking = await Booking.create({
      userId: session.user.id,
      serviceId,
      serviceName,
      durationType,
      durationValue,
      region,
      district,
      city,
      area,
      address,
      totalCost,
      status: "Pending",
    });

    // Send email invoice (non-blocking)
    if (session.user.email) {
      sendBookingInvoice(booking, session.user.email, session.user.name)
        .then((result) => {
          if (result.success) {
            console.log("Invoice email sent successfully");
          } else {
            console.log("Failed to send invoice email:", result.error);
          }
        })
        .catch((err) => {
          console.log("Email error:", err);
        });
    }

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          id: booking._id.toString(),
          serviceName: booking.serviceName,
          status: booking.status,
          totalCost: booking.totalCost,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
