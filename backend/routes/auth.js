const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const userAuth = require('../middleware/userAuth');
require('../config/passport');

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts, please try again after 15 minutes' }
});

// ─── Validation helper ────────────────────────────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// ─── Sign Up ──────────────────────────────────────────────────────────────────
router.post('/signup',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: 'Email already registered' });
      const hash = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hash });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Sign In ──────────────────────────────────────────────────────────────────
router.post('/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Get Profile ──────────────────────────────────────────────────────────────
router.get('/profile', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetToken -resetTokenExpiry');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Update Profile ───────────────────────────────────────────────────────────
router.put('/profile',
  userAuth,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, phone } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, phone },
        { new: true }
      ).select('-password -resetToken -resetTokenExpiry');
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Forgot Password ──────────────────────────────────────────────────────────
router.post('/forgot-password',
  authLimiter,
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const token = crypto.randomBytes(32).toString('hex');
      user.resetToken = token;
      user.resetTokenExpiry = Date.now() + 3600000;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Dhaneshwari - Password Reset',
        html: `<p>Click the link to reset your password. This link expires in 1 hour.</p>
               <a href="${resetLink}">Reset Password</a>`
      });

      res.json({ message: 'Reset link sent to your email' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Reset Password ───────────────────────────────────────────────────────────
router.post('/reset-password/:token',
  [body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')],
  validate,
  async (req, res) => {
    try {
      const { password } = req.body;
      const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExpiry: { $gt: Date.now() }
      });
      if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

      user.password = await bcrypt.hash(password, 10);
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();

      res.json({ message: 'Password reset successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Google OAuth ─────────────────────────────────────────────────────────────
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, email: req.user.email, name: req.user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.redirect(`${process.env.FRONTEND_URL}/auth/google/success?token=${token}`);
});

module.exports = router;