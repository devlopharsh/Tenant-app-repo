// middleware/roleMiddleware.js

// rolesAllowed: array of strings, e.g. ['Admin', 'Manager']
const roleMiddleware = (rolesAllowed) => {
  return (req, res, next) => {
    try {
      // User info should already be on req.user by authMiddleware
      const userRole = req.user.role;

      if (!rolesAllowed.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      return res.status(500).json({ message: 'Server error in role middleware' });
    }
  };
};

module.exports = roleMiddleware;
