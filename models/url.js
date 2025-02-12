const db = require('../database');
const { intervalToDuration } = require('date-fns');

// Generate a unique short code
function generateShortCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortCode = '';
  for (let i = 0; i < 6; i++) {
    shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortCode;
}

// Shorten URL
async function shortenUrl(longUrl) {
  const shortCode = generateShortCode();
  const query = 'INSERT INTO urls (long_url, short_code, click_count) VALUES ($1, $2, 0) RETURNING short_code';
  const result = await db.query(query, [longUrl, shortCode]);
  return result.rows[0].short_code;
}

async function redirectToLongUrl(shortCode) {
  console.log(shortCode)
  const query = 'SELECT long_url, created_at FROM urls WHERE short_code = $1';
  const result = await db.query(query, [shortCode]);

  if (result.rowCount === 0) {
    // Short URL not found
    return null;
  }

  const { long_url, created_at } = result.rows[0];
  const createdAt = new Date(created_at)

  // Check if the short URL has expired (older than 24 hours) add the current time with 2 hours to match the one in the database
  const currentDate = new Date();

// Add 2 hours to the current date
currentDate.setHours(currentDate.getHours() + 2);

  const duration = intervalToDuration({ start: createdAt, end: currentDate });
  //console.log('expired testing here**********',duration)
  if (duration.days >= 1) {
    // URL has expired
    return null;
  }

  // Update click count
  await db.query('UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1', [shortCode]);

  return long_url;
}

// Get URL Statistics
async function getUrlStats(shortCode) {
  const query = 'SELECT click_count FROM urls WHERE short_code = $1';
  const result = await db.query(query, [shortCode]);
  return result.rowCount > 0 ? result.rows[0] : null;
}

module.exports = { shortenUrl, redirectToLongUrl, getUrlStats };