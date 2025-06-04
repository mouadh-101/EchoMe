const express = require('express');
const multer = require('multer');
const audioController = require('../controllers/audioController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /upload
router.post('/upload', upload.single('audio'), audioController.uploadAudio);

module.exports = router;