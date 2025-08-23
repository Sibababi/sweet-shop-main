const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
//const extesion=require("./extesionRouter");
const { checkOwner } = require("../middlewares/checkMiddleware");
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const orderController = require("../controllers/orderController");
const extesionRouter = require("./extesionRouter");

router.use("/:orderId/extensions", extesionRouter);
router.use(authMiddlewers.protect);
router
  .route("/agguser/:year/:month") //جلب احصائات متعلقة بمستخدم مثل اجمالي  عدد الطلبات وكلفتها خلال شهر او عام
  .get(
    authMiddlewers.restrictTo("admin"),
    orderController.statisticsWithLinkUser
  );
router.get("/total-orders-value", orderController.getTotalOrdersValue);
router.get("/count-order", orderController.getcountOrder);
router.get("/daily-orders-count", orderController.getDailyOrdersCount);
router.get("/top-products", orderController.getTopProducts);
router
  .route("/work_me") ///روت خاص لاظهار لعامل التوصيل الطلب الذي يجب ان يوصله
  .get(
    authMiddlewers.restrictTo("delivery"),
    dynamicMiddleware.addQuery("delivery", "userId"),
    dynamicMiddleware.addQuery("status.ar", "توصيل"),
    orderController.getAllOrder
  );
router
  .route("/need_work") ///روت خاص لاظهار للمدير  الطلبات الذي يجب ان يتم تحضيرها ضمن فرعه
  .get(
    authMiddlewers.restrictTo("admin"),
    dynamicMiddleware.addQuery("status.ar", "تحضير"),
    orderController.getAllOrder
  );
router
  .route("/need_delivery") //جلب جميع الطلبات التي تحتاج لتوصيل ولم يتم تعيين لها عامل ضمن فرع الخاص بالمدير
  .get(
    authMiddlewers.restrictTo("admin"),
    dynamicMiddleware.addQuery("status.ar", "تحضير"),
    dynamicMiddleware.addQuery("withDelivery", "true"),
    orderController.getAllOrder
  );
router
  .route("/all") //جلب كل طلبات الفرع الخاص بمدير
  .get(authMiddlewers.restrictTo("admin"), orderController.getAllOrder);
router
  .route("/") //جلب كل الطلبات من كل الافرع
  .get(
    // authMiddlewers.restrictTo("admin"),
    orderController.getAllOrder
  )
  .post(
    authMiddlewers.restrictTo("admin", "user"),
    dynamicMiddleware.addVarBody("user", "userId"),
    orderController.createOrder
  );

router
  .route("/me")
  .get(
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addQuery("user", "userId"),
    orderController.getAllOrder
  );
// جلب الطلبات التي يجب أن يسلّمها عامل توصيل معيّن
router
  .route("/delivery/:deliveryId")
  .get(
    authMiddlewers.restrictTo("admin"),
    orderController.getOrdersForDelivery
  );
router
.route("/deliveries-with-orders")
.get(
  authMiddlewers.restrictTo("admin"), // أو احذفها حسب حاجتك
  orderController.getAllDeliveriesWithOrders
);
router
  .route("/:id") //جلب طلب حسب رقمه الخاص
  .get(orderController.getOrder)
  .patch(
    //روت لتعين عمل توصيل وتغير حالة الطلب الى قيد التوصيل يجب ارسال قيمة حالة التوصيل وعامل التوصيل بالبودي
    //وايضا من اجل تعيين تغير حالة الدفع في حال كانت نقدي وبدون توصيل
    authMiddlewers.restrictTo("admin"),
    orderController.updateOrder
  )
  .delete(orderController.deleteOrder);

router
  .route("/:id/paid") //من اجل تاكيد توصيل الطلب وستلام المبلغ من المستخدم في حال التوصيل
  .patch(
    authMiddlewers.restrictTo("delivery"),
    checkOwner(Order, "delivery","id"),
    dynamicMiddleware.addVarBody("paid", "true"),
    dynamicMiddleware.addVarBody("status.ar", "مكتمل"),
      dynamicMiddleware.addVarBody("status.en", "Completed"),
    orderController.updateOrder
  );
router
  .route("/:id/err") //من اجل تعديل الطلب في حال خطء ولاكن خلال  10 دقائق وان لم يكن قد دفع المبلغ مسبقا
  .patch(
    authMiddlewers.restrictTo("user"),
    orderController.chekOrder,
    orderController.updateOrderErr
  );
// router.use("/:orderId/extesions",extesion);
module.exports = router;
