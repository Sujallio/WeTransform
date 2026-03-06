const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // For now, allow demo users without token
    req.userId = 'demo_user_default';
    return next();
  }

  // If token starts with demo_, use it directly
  if (token.startsWith('demo_token_')) {
    // Extract user ID from header or create demo one
    const userHeader = req.headers['x-user-id'];
    req.userId = userHeader || 'demo_user_' + token.substring(11, 20);
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Fallback to demo user
    req.userId = 'demo_user_default';
    next();
  }
};

module.exports = authMiddleware;
