const Categurie = require("../models/categurieModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getcategurie = handlerFactory.getOne(Categurie);
exports.createcategurie = handlerFactory.createOne(Categurie);
exports.updatecategurie = handlerFactory.updateOne(Categurie);
exports.deletecategurie = handlerFactory.deleteOne(Categurie);
exports.getAllcategurie = handlerFactory.getAll(Categurie);
exports.defult = catchAsync(async (req, res, next) => {
  //write your code here
  const doc = []
  if(!doc){
    return (new AppError("Message Error",400))
    }
  res.status(200).json({
    status: "success",
    doc,
  });
});
exports.searchCatrgurie = async (req, res) => {
    const { name } = req.query; // الحصول على اسم المنتج من استعلام GET

    if (!name) {
        return res.status(400).json({ message: 'يرجى تقديم اسم الصنف للبحث' });
    }

    try {
        // البحث عن المنتج باستخدام الاسم باللغة العربية أو الإنجليزية
        const categuries = await Categurie.find({
            $or: [
                { 'name.ar': { $regex: name, $options: 'i' } }, // البحث باللغة العربية
                { 'name.en': { $regex: name, $options: 'i' } }  // البحث باللغة الإنجليزية
            ]
        });

        res.status(200).json(categuries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء البحث عن المنتجات' });
    }
};
