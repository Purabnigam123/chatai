import express from 'express';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { generateToken } from '../utils/auth.js';
import { sendPasswordResetEmail } from '../utils/email.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  console.log('📝 Signup request received');
  console.log('📧 Request body:', req.body);
  
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    console.log('🔍 Checking if user exists:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    console.log('👤 Creating new user...');
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('✅ User saved to database:', { email: user.email, name: user.name, _id: user._id });

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    
    const responseData = {
      message: 'Login successful',
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  console.log('🔔 Forgot password request received');
  console.log('📧 Request body:', req.body);
  
  try {
    const { email } = req.body;

    if (!email) {
      console.log('❌ No email provided');
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('🔍 Looking for user with email:', email);
    const user = await User.findOne({ email });

    if (user) {
      console.log('✅ User found:', user.email);
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save();
      console.log('💾 Reset token saved to database');

      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
      
      console.log('🔑 Password Reset Link (for development):', resetLink);
      console.log('📋 Copy this link and open it in your browser');
      
      try {
        console.log('📤 Attempting to send email...');
        await sendPasswordResetEmail(user.email, resetLink, user.name);
        console.log('✅ Email sent successfully');
        return res.json({
          message: 'Password reset email has been sent. Check your email or terminal for the link.',
          devLink: process.env.NODE_ENV === 'development' ? resetLink : undefined
        });
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError.message);
        console.log('⚠️ Email failed, but you can use this link:', resetLink);
        // Return success with dev link if email fails in development
        if (process.env.NODE_ENV === 'development') {
          return res.json({ 
            message: 'Email service unavailable. Use the reset link from terminal.',
            devLink: resetLink 
          });
        }
        return res.status(500).json({ message: 'Failed to send reset email. Please try again.' });
      }
    }

    console.log('⚠️ User not found, but responding generically');
    return res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();
    await user.save();

    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
