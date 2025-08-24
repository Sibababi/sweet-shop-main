// const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");
// const streamifier = require("streamifier"); // لتحويل buffer لـ stream

// // إعداد Multer لتخزين الصورة في الذاكرة مؤقتًا (memory storage)
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Not an image! Please upload only images."), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// // Middleware لرفع الصورة على Cloudinary
// const uploadToCloudinary = (req, res, next) => {
//   if (!req.file) {
//     return next(new AppError("يجب ادخال صورة الصنف", 400));
//   }

//   const stream = cloudinary.uploader.upload_stream(
//     { folder: "photome" },
//     (error, result) => {
//       if (error) return next(error);
//       // رابط الصورة النهائي يوصل للـ controller
//       req.body.photo = result.secure_url;
//       next();
//     }
//   );

//   streamifier.createReadStream(req.file.buffer).pipe(stream);
   
// };

// module.exports = { upload, uploadToCloudinary };
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

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
// const uploadToCloudinary = (req, res, next) => {
//   if (!req.file) {
//     // إذا ما في صورة مرفوعة → خزن صورة افتراضية
//     req.body.photo =
//       "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"; // ← غيرها برابط صورتك الافتراضية
//     return next();
//   }

//   const stream = cloudinary.uploader.upload_stream(
//     { folder: "photome" },
//     (error, result) => {
//       if (error) return next(error);

//       // رابط الصورة النهائي يوصل للـ controller
//       req.body.photo = result.secure_url;
//       next();
//     }
//   );

//   streamifier.createReadStream(req.file.buffer).pipe(stream);
// };
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    // ما تعمل شي، خليه يروح على الكونترولر
    // والمودل لحالو يحط الصورة الافتراضية
    return next();
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "photome" },
    (error, result) => {
      if (error) return next(error);

      req.body.photo = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = { upload, uploadToCloudinary };