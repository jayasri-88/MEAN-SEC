const express = require('express');
const upload = require('../config/multer');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/upload (protected, generic file)
router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(201).json({
    fileName: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    url: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
