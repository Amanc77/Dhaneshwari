const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const createAuthMiddleware = (allowedRoles = ['admin']) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (user) {
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      }
      req.auth = { id: user.id, role: user.role, email: user.email };
      req.user = user;
      return next();
    }

    if (decoded.role === 'admin') {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (admin && allowedRoles.includes('admin')) {
        req.auth = { id: admin.id, role: 'admin', email: admin.email };
        req.user = { ...admin.toObject(), role: 'admin' };
        return next();
      }
    }

    return res.status(401).json({ error: 'User not found' });
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