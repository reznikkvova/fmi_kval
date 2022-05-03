const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();
const config = require('config');

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password should contains minimum 6 symbols').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrent data',
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User is already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User was created!' });
    } catch (e) {
      res.status(500).json({ message: 'Error, try again' });
    }
  },
);
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter corrent email').normalizeEmail().isEmail(),
    check('password', 'Password doesnt exist').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrent data',
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User doesnt find' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password, try again !' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Error, try again' });
    }
  },
);

module.exports = router;
