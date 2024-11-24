import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY)
const domain = 'http://localhost:3000'
const from = process.env.EMAIL || "onboarding@resend.dev"

export const sendVerificationEmail = async (email:string, token:string) => {
    const confirmationLink = `${domain}/verify?token=${token}`
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification - Mindscape</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .content p {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #4CAF50;
      text-decoration: none;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Mindscape!</h1>
    </div>
    <div class="content">
      <h1>Verify Your Email</h1>
      <p>Thank you for signing up for Mindscape. Please confirm your email address to get started.</p>
      <a href="${confirmationLink}" class="btn">Verify Email</a>
      <p>If you didn’t sign up for Mindscape, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>Mindscape © ${new Date().getFullYear()}</p>
    </div>
  </div>
</body>
</html>
`;

    await resend.emails.send({
        from,
        to:email,
        subject:"Verify your Email",
        html
    })
}