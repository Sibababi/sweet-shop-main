const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drm0dfbp5",   // بتجيبه من Cloudinary Dashboard
  api_key: "544283799533725",             // بتلاقيه مع الكلاود نيم
  api_secret: "DFCusJztygVxVH0e8Sv_HimU-eE"        // كمان من Cloudinary
});

module.exports = cloudinary;