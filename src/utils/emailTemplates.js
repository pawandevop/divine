// Registration email template
export function registrationEmailTemplate({ email, baseUrl }) {
  return `
    <div style="max-width:520px;margin:0 auto;background:#fff6ea;border-radius:16px;padding:32px 24px;font-family:'Poppins',Arial,sans-serif;box-shadow:0 4px 24px #0001;">
      <div style="text-align:center;margin-bottom:24px;">
        <img src='${baseUrl}/img/logo-backend.png' alt='Divine Elite Wellness Logo' width='80' height='80' style='border-radius:50%;background:transparent;box-shadow:0 2px 8px #ef9b0f22;margin-bottom:12px;' />
        <h2 style="color:#EF9B0F;font-family:'Raleway',Arial,sans-serif;font-size:2rem;margin:0 0 8px 0;">Welcome to Divine Elite Wellness!</h2>
      </div>
      <p style="font-size:1.1rem;color:#7a6a53;margin-bottom:18px;">Your registration was successful. You can now log in to your account and start your wellness journey with us.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${baseUrl}/login" style="display:inline-block;padding:14px 32px;background:#EF9B0F;color:#fff;font-weight:700;font-size:1.1rem;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px #ef9b0f22;margin-bottom:12px;">Login to Your Account</a>
      </div>
      <hr style="border:none;border-top:1px solid #f3e7d9;margin:24px 0;" />
      <p style="font-size:0.95rem;color:#b97a3a;text-align:center;">Thank you for joining us!<br/>Divine Elite Wellness Team</p>
    </div>
  `;
}

// Password reset email template
export function passwordResetEmailTemplate({ resetUrl, baseUrl }) {
  return `
    <div style="max-width:520px;margin:0 auto;background:#fff6ea;border-radius:16px;padding:32px 24px;font-family:'Poppins',Arial,sans-serif;box-shadow:0 4px 24px #0001;">
      <div style="text-align:center;margin-bottom:24px;">
        <img src='${baseUrl}/img/logo-backend.png' alt='Divine Elite Wellness Logo' width='80' height='80' style='border-radius:50%;background:transparent;box-shadow:0 2px 8px #ef9b0f22;margin-bottom:12px;' />
        <h2 style="color:#EF9B0F;font-family:'Raleway',Arial,sans-serif;font-size:2rem;margin:0 0 8px 0;">Password Reset Request</h2>
      </div>
      <p style="font-size:1.1rem;color:#7a6a53;margin-bottom:18px;">We received a request to reset your password for your Divine Elite Wellness account.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#EF9B0F;color:#fff;font-weight:700;font-size:1.1rem;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px #ef9b0f22;margin-bottom:12px;">Reset Your Password</a>
      </div>
      <p style="font-size:1rem;color:#7a6a53;margin-bottom:10px;">This link will expire in 30 minutes and can only be used once.</p>
      <hr style="border:none;border-top:1px solid #f3e7d9;margin:24px 0;" />
      <p style="font-size:0.95rem;color:#b97a3a;text-align:center;">If you did not request this, you can safely ignore this email.<br/>Divine Elite Wellness Team</p>
    </div>
  `;
} 