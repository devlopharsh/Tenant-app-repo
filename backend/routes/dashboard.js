// routes/dashboard.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // your auth check middleware

router.get('/', authMiddleware, (req, res) => {
  // Example response
  res.json({ message: `Welcome to the dashboard, user ${req.user.userId}` });
});

module.exports = router;
