const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access Denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Inject user payload to request
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
