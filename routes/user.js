const express = require('express');
const router = express.Router();

const { currentUser } = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.route("/me").get(protect, currentUser);

module.exports = router;