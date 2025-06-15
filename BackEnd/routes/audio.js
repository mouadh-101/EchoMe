const express = require('express');
const multer = require('multer');
const audioController = require('../controllers/audioController');
const { verifyToken } = require('../middleware/authMiddleware');
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
router.post('/upload', upload.single('file'), audioController.uploadAudio);
// POST /create
router.post('/create',verifyToken, upload.single('audio'), audioController.createAudio);
// GET /
router.get('/',verifyToken, audioController.fetchAudioByUser);
// GET /stats
router.get('/stats', verifyToken, audioController.fetchStatestics);
// GET /audById/:id
router.get('/audById/:id', verifyToken, audioController.fetchAudioById);
// to be deleted later 
router.post('/transcribe', audioController.audioTranscribe);
router.post('/tagging-title', audioController.audioTaggingTitle);
router.put('/process',audioController.processPendingAudios);

module.exports = router;