const { store } = require('../db/store');
const { validateEmail } = require('../utils/validators');
const { sendOTPEmail } = require('../utils/emailService');

exports.signup = (req, res) => {
  const { email, password, full_name, role } = req.body;
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const existing = store.users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const user = {
    id: `usr-${Date.now()}`,
    email,
    full_name: full_name || 'Warehouse Specialist',
    role: role || 'inventory_manager'
  };
  store.users.push(user);
  res.status(201).json({ token: `jwt_token_${Date.now()}`, user });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || (user.password && user.password !== password)) {
    return res.status(401).json({ error: 'Invalid email or password. Please use valid demo credentials.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    token: `jwt_token_${Date.now()}`,
    user: userWithoutPassword
  });
};

exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  const otp = '123456';
  await sendOTPEmail(email, otp);
  res.json({ message: `OTP sent to ${email} (Mock OTP: 123456)` });
};

exports.verifyOTP = (req, res) => {
  const { email, otp, new_password } = req.body;
  if (otp === '123456' || otp) {
    res.json({ message: 'Password reset successfully', token: `jwt_token_${Date.now()}` });
  } else {
    res.status(400).json({ error: 'Invalid OTP code' });
  }
};
