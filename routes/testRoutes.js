const express = require('express');
const router = express.Router();

// ✅ Test controller function
const testAPI = (req, res) => {
  res.json({ success: true, message: 'Test route working fine ✅' });
};

// ✅ Define GET route
router.get('/', testAPI);

module.exports = router;
