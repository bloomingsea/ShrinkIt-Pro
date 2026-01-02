const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');
const UAParser = require('ua-parser-js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const db = new sqlite3.Database('./shrinkit.db', (err) => {
  if (err) console.error('DB Connection Error:', err);
  console.log('Connected to SQLite');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_key TEXT UNIQUE NOT NULL,
    custom_slug TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    clicks_count INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    country TEXT DEFAULT 'Unknown',
    browser TEXT,
    os TEXT,
    referrer TEXT,
    FOREIGN KEY(url_id) REFERENCES urls(id)
  )`);
});

// Routes

app.get('/', (req, res) => {
  res.send('ShrinkIt Pro API is running 🚀');
});

// Create URL
app.post('/urls', (req, res) => {
  const { original_url, custom_slug } = req.body;
  const short_key = custom_slug || shortid.generate();

  const stmt = db.prepare(`INSERT INTO urls (original_url, short_key, custom_slug) VALUES (?, ?, ?)`);
  stmt.run(original_url, short_key, custom_slug, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ detail: 'Slug already taken' });
      }
      return res.status(500).json({ detail: err.message });
    }
    res.json({
      id: this.lastID,
      original_url,
      short_key,
      custom_slug,
      clicks_count: 0,
      is_active: 1
    });
  });
});

// List URLs
app.get('/urls', (req, res) => {
  db.all(`SELECT * FROM urls ORDER BY created_at DESC`, (err, rows) => {
    if (err) return res.status(500).json({ detail: err.message });
    res.json(rows);
  });
});

// Redirect & Analytics
app.get('/:short_key', (req, res) => {
  const { short_key } = req.params;

  db.get(`SELECT * FROM urls WHERE short_key = ? OR custom_slug = ?`, [short_key, short_key], (err, url) => {
    if (err || !url) return res.status(404).send('Not Found');

    // Analytics
    const ua = new UAParser(req.headers['user-agent']).getResult();
    const ip = req.ip || req.connection.remoteAddress;
    const referrer = req.headers['referer'] || 'Direct';

    db.run(`INSERT INTO clicks (url_id, ip_address, browser, os, referrer) VALUES (?, ?, ?, ?, ?)`,
      [url.id, ip, ua.browser.name, ua.os.name, referrer]);
    
    db.run(`UPDATE urls SET clicks_count = clicks_count + 1 WHERE id = ?`, [url.id]);

    res.redirect(url.original_url);
  });
});

// Stats
app.get('/urls/:short_key/stats', (req, res) => {
  const { short_key } = req.params;

  db.get(`SELECT * FROM urls WHERE short_key = ?`, [short_key], (err, url) => {
    if (err || !url) return res.status(404).json({ detail: 'Not Found' });

    db.all(`SELECT * FROM clicks WHERE url_id = ?`, [url.id], (err, clicks) => {
      if (err) return res.status(500).json({ detail: err.message });
      res.json({ ...url, clicks });
    });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
