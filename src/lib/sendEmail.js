import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingInvoice = async (booking, userEmail, userName) => {
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .invoice-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .row:last-child { border-bottom: none; }
        .label { color: #6b7280; }
        .value { font-weight: 600; }
        .total { background: #6366f1; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 15px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 20px; background: #fef3c7; color: #92400e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>CareNest</h1>
          <p>Booking Confirmation</p>
        </div>

        <div class="content">
          <p>Dear ${userName},</p>
          <p>Thank you for your booking! Here are your booking details:</p>

          <div class="invoice-details">
            <div class="row">
              <span class="label">Booking ID</span>
              <span class="value">${booking._id || booking.id}</span>
            </div>
            <div class="row">
              <span class="label">Service</span>
              <span class="value">${booking.serviceName}</span>
            </div>
            <div class="row">
              <span class="label">Duration</span>
              <span class="value">${booking.durationValue} ${booking.durationType}</span>
            </div>
            <div class="row">
              <span class="label">Location</span>
              <span class="value">${booking.area}, ${booking.city}, ${booking.district}</span>
            </div>
            <div class="row">
              <span class="label">Address</span>
              <span class="value">${booking.address}</span>
            </div>
            <div class="row">
              <span class="label">Status</span>
              <span class="status">${booking.status}</span>
            </div>
          </div>

          <div class="total">
            <p style="margin: 0; font-size: 14px;">Total Amount</p>
            <p style="margin: 5px 0 0; font-size: 28px; font-weight: bold;">${booking.totalCost} BDT</p>
          </div>

          <p style="margin-top: 20px;">
            We will contact you shortly to confirm your booking. If you have any questions,
            please don't hesitate to reach out to us.
          </p>
        </div>

        <div class="footer">
          <p>CareNest - Trusted Care Services for Your Family</p>
          <p>Email: support@carenest.com | Phone: +880 1234-567890</p>
          <p>&copy; ${new Date().getFullYear()} CareNest. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"CareNest" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Booking Confirmation - ${booking.serviceName} | CareNest`,
    html: invoiceHTML,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
