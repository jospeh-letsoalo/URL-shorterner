const express = require('express');
const router = express.Router();
const { getUrlStats } = require('../models/url');


// Get URL Statistics
router.get('/shorten/:shortCode/stats', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const stats = await getUrlStats(shortCode);
    //console.log(stats)

    if (!stats) {
      // Return 404 if the short URL does not exist or has expired
      return res.status(404).send({ error: 'Short URL not found or expired' });
    }

    // Return the click count
    res.send({ click_count: stats.click_count });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;