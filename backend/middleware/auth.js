const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAuthMiddleware = (allowedRoles = ['admin']) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }

    req.auth = { id: user.id, role: user.role, email: user.email };
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

function auth(req, res, next) {
  if (typeof req === 'object' && req !== null && 'headers' in req) {
    return createAuthMiddleware(['admin'])(req, res, next);
  }
  const roles = Array.isArray(req) ? req : ['admin'];
  return createAuthMiddleware(roles);
}

module.exports = auth;