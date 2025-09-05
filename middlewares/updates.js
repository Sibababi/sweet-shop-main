const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadToCloudinaryForUpdate = (req, res, next) => {
  // إذا المستخدم ما رفع صورة جديدة → نكمل بدون تغيير الصورة
  if (!req.file) {
    return next();
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "photos" },
    (error, result) => {
      if (error) return next(error);

      // إذا رفع صورة جديدة → نحدّث الرابط
      req.body.image = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = uploadToCloudinaryForUpdate;
