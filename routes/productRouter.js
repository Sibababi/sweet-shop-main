const { upload, uploadToCloudinary } = require("../middlewares/cloudyproductMiddleware");
const express = require("express");
const router = express.Router();
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const imgproductMiddlewers = require("../middlewares/imgprodectMiddlewar");
const productController = require("../controllers/productController");
router
  .route("/categurie")
  .get(authMiddlewers.protect, productController.getAllProductCategory);
   router.get('/count-product', productController.getcountProduct);
     router.get('/search', productController.searchProduct);
router
  .route("/")
  .get(
    authMiddlewers.protect,
    productController.getAllProduct
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    upload.single("image"),           // multer يقرأ الصورة من الفورم
    uploadToCloudinary,               
    productController.createProduct
  );
 
router
  .route("/:id")
  .get(authMiddlewers.protect,  
    // authMiddlewers.restrictTo("admin"),
     productController.getProduct)
    .patch(
      authMiddlewers.protect,
      authMiddlewers.restrictTo("admin"),
      imgproductMiddlewers.uploadProdectPhoto,
      dynamicMiddleware.setPathImginBodys("prodects","image","model"),
      productController.updateProduct
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("admin"),
    productController.deleteProduct
  );
module.exports = router;
