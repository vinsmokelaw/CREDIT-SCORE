import { supabaseAdmin } from '../config/supabase.js';
import { UserService } from '../services/userService.js';
import { BankProfileService } from '../services/bankProfileService.js';

export class AuthController {
  constructor() {
    this.userService = new UserService();
    this.bankProfileService = new BankProfileService();
  }

  register = async (req, res) => {
    const { email, password, fullName, userType = 'client', bankName, bankCode } = req.body;

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          user_type: userType,
          bank_name: bankName
        }
      });

      if (authError) {
        return res.status(400).json({ 
          error: 'Registration failed', 
          message: authError.message 
        });
      }

      // Create appropriate profile based on user type
      if (userType === 'bank') {
        await this.bankProfileService.createBankProfile(authData.user.id, {
          bank_name: bankName,
          bank_code: bankCode,
          email
        });
      } else {
        await this.userService.createUserProfile(authData.user.id, {
          full_name: fullName,
          email
        });
      }

      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          fullName,
          userType,
          bankName
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        error: 'Registration failed', 
        message: 'Internal server error' 
      });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(401).json({ 
          error: 'Login failed', 
          message: error.message 
        });
      }

      // Get user profile based on user type
      const userType = data.user.user_metadata?.user_type || 'client';
      let profile;
      
      if (userType === 'bank') {
        profile = await this.bankProfileService.getBankProfile(data.user.id);
      } else {
        profile = await this.userService.getUserProfile(data.user.id);
      }

      res.json({
        message: 'Login successful',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: profile?.full_name || profile?.bank_name,
          userType,
          bank: profile?.bank_name
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: 'Login failed', 
        message: 'Internal server error' 
      });
    }
  };

  logout = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (token) {
        await supabaseAdmin.auth.admin.signOut(token);
      }

      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ 
        error: 'Logout failed', 
        message: 'Internal server error' 
      });
    }
  };

  refreshToken = async (req, res) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    try {
      const { data, error } = await supabaseAdmin.auth.refreshSession({
        refresh_token
      });

      if (error) {
        return res.status(401).json({ 
          error: 'Token refresh failed', 
          message: error.message 
        });
      }

      res.json({
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at
        }
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(500).json({ 
        error: 'Token refresh failed', 
        message: 'Internal server error' 
      });
    }
  };

  forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
      const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`
      });

      if (error) {
        return res.status(400).json({ 
          error: 'Password reset failed', 
          message: error.message 
        });
      }

      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ 
        error: 'Password reset failed', 
        message: 'Internal server error' 
      });
    }
  };

  resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(token, {
        password
      });

      if (error) {
        return res.status(400).json({ 
          error: 'Password reset failed', 
          message: error.message 
        });
      }

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ 
        error: 'Password reset failed', 
        message: 'Internal server error' 
      });
    }
  };
}