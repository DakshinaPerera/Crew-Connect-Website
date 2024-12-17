// src/auth/controller.js
require('dotenv').config();

const pool = require('../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Token creation helper function
const createTokens = (user) => {
    const accessToken = jwt.sign(
        { 
            id: user.admin_id, 
            username: user.admin_username, 
            role: 'admin' 
        },
        JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user.admin_id },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

// Login controller
const adminLoginController = async (req, res) => {
    const { admin_username, admin_password } = req.body;

    if (!admin_username || !admin_password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const result = await pool.query(queries.checkUserQuery, [admin_username, admin_password]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const { accessToken, refreshToken } = createTokens(user);

            // Set HTTP-only cookies
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.admin_id,
                    username: user.admin_username
                }
            });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Refresh token controller
const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        
        // Get user from database
        const result = await pool.query(queries.getUserById, [decoded.id]);
        
        if (!result.rows.length) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = result.rows[0];
        const { accessToken, refreshToken: newRefreshToken } = createTokens(user);

        // Set new cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ message: 'Token refreshed successfully' });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// Logout controller
const logoutController = (req, res) => {
    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
};

// Token verification middleware
const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid access token' });
    }
};

// Protected route example
const getProtectedData = async (req, res) => {
    try {
        res.json({ message: 'Protected data', user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    adminLoginController,
    refreshTokenController,
    logoutController,
    verifyToken,
    getProtectedData
};