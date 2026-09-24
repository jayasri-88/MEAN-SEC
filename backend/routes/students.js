const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

const router = express.Router();

// Public: list
router.get('/', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

router.get('/:id', async (req, res) => {
  try {
    const s = await Student.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Student not found' });
    res.json(s);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Protected CRUD
router.post('/', auth, async (req, res) => {
  try {
    const s = await Student.create(req.body);
    res.status(201).json(s);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: 'Email already exists' });
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!s) return res.status(404).json({ message: 'Student not found' });
    res.json(s);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const s = await Student.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: 'Student not found' });
    res.json(s);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// File upload (protected) — Exp9
router.post('/:id/avatar', auth, upload.single('file'), async (req, res) => {
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
