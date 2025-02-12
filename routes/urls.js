const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToLongUrl } = require('../models/url');
const rateLimiter = require('../middleware/rateLimiter');

// Shorten URL
router.post('/shorten', async (req, res) => {
  try {
    const { long_url } = req.body;
    if (!long_url) return res.status(400).send({ error: 'Long URL is required' });

    const shortUrl = await shortenUrl(long_url);
    res.send({ short_url: `http://localhost:8000/api/shorten/${shortUrl}` });
  } catch (error) {
    res.status(500).send({ error: 'Failed to shorten URL' });
  }
});

// Redirect to Long URL
router.get('/shorten/:shortCode', rateLimiter, async (req, res) => {
  const { shortCode } = req.params;
  //console.log('here***',req.params)

  try {
    
    const result = await redirectToLongUrl(shortCode);
    //console.log('did we get something', result)
   
    if (!result) return res.status(404).send({ error: 'Short URL not found' });

    //console.log('we have return value', result)
    res.redirect(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to redirect something here' });
  }
});


module.exports = router;