// controllers/authController.js
const bcrypt = require('bcryptjs');
const db = require('../models/db');

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Error hashing password');
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err) => {
      if (err) return res.status(500).send('Signup failed');
      res.status(200).send('Signup successful');
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Invalid credentials');
    bcrypt.compare(password, results[0].password, (err, match) => {
      if (match) {
        req.session.user = results[0];
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });
};
