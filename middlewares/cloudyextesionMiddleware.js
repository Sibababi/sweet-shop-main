const AppError = require("../utils/appError");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier"); // لتحويل buffer لـ stream

// إعداد Multer لتخزين الصورة في الذاكرة مؤقتًا
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware لرفع الصورة على Cloudinary
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return next(new AppError("يجب ادخال الاضافة ", 400));
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "extesion" },
    (error, result) => {
      if (error) return next(error);
      // رابط الصورة النهائي يوصل للـ controller على حقل photo
      req.body.image = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = { upload, uploadToCloudinary };