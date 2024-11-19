import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, guests, meta_title } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const messageToAdmin = `
      Name: ${name}\r\n
      Email: ${email}\r\n
      Phone: ${phone}\r\n
      Guests: ${guests}\r\n
      Meta Title: ${meta_title}\r\n
    `;

    const dataToAdmin = {
      to: process.env.EMAIL_TO as string,
      from: process.env.FROM_EMAIL as string,
      subject: "New Reservation Request",
      text: messageToAdmin,
      html: `
        <h3>Name: <strong>${name}</strong></h3>
        <h3>Email: <strong>${email}</strong></h3>
        <h3>Phone: <strong>${phone}</strong></h3>
        <h3>Guests: <strong>${guests}</strong></h3>
        <h3>Meta Title: <strong>${meta_title}</strong></h3>
      `,
    };

    // Email to client for confirmation
    const messageToClient = `
      Hi ${name},\r\n
      Thank you for your reservation request for ${meta_title}.\r\n
      We will get back to you shortly with more details.\r\n
      Here are the details you provided:\r\n
      Phone: ${phone}\r\n
      Guests: ${guests}\r\n
      Thank you!
    `;

    const dataToClient = {
      to: email, // Client's email
      from: process.env.FROM_EMAIL as string,
      subject: "Reservation Confirmation",
      text: messageToClient,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your reservation request for <strong>${meta_title}</strong>.</p>
        <p>We will get back to you shortly with more details.</p>
        <p><strong>Here are the details you provided:</strong></p>
        <p>Phone: ${phone}</p>
        <p>Guests: ${guests}</p>
        <p>Thank you!</p>
      `,
    };

    // Send both emails
    await sgMail.send(dataToAdmin); // Send email to the admin
    await sgMail.send(dataToClient); // Send confirmation email to the client

    console.log("Emails sent successfully!");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
