const { logInfo } = require('./logger');

async function sendOTPEmail(email, otp) {
  logInfo(`[SMTP Mock] OTP Code ${otp} generated for ${email}`);
  return { success: true, message: `OTP sent to ${email}` };
}

module.exports = { sendOTPEmail };
