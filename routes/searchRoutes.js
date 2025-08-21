// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/feature', searchController.search);

module.exports = router;