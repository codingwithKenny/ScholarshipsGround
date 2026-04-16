"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, message: "All fields are required" };
  }

  try {
    await resend.emails.send({
      from: "ScholarshipGround <onboarding@resend.dev>",
      to: "groundscholarship@gmail.com", // 👉 CHANGE THIS TO YOUR EMAIL
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send message" };
  }
}