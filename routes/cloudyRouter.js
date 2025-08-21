const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudy"); 
const cloudinary = require("../config/cloudinary");

// هون استبدلنا app بـ router
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// تصدير الراوتر
module.exports = router;