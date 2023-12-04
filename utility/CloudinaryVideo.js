const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dmqu5abqn", //YOUR_CLOUD_NAME
    api_key: "521159663879513", //YOUR_API_KEY
    api_secret: "hQHaYrVEQrB6kqcBc88opqNPxeg", //YOUR_API_SECRET
  });
  
// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for video upload
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      resource_type: 'video',
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
