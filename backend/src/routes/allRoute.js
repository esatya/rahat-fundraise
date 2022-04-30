const express = require('express');

const router = express.Router();

// @Route   GET api/content/education/
// @desc    Get all educations
// @access  Public
router.get('/', async (req, res) => {
  try {
    return res.json({ message: 'Done!' });
  } catch (err) {
    return res.status(401).json({ msg: 'Could not fetch data' });
  }
});

// Export the routes of person
module.exports = router;
