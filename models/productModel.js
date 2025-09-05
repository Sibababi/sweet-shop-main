const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    
    categurie: {
      type: mongoose.Schema.ObjectId,
      ref: "Categurie",
      trim: true,
      required: [true, "يجب ادخال الصنف"],},
    
    name: {ar:{
      type: String,
      trim: true,
      required: [true, "يجب ادخال اسم المنتج"]},
      en:{
        type: String,
        trim: true,
        required: [true,"must be entered product name"]}
    },
    image: {
      type: String,
      required: [true, "يجب ادخال صورة المنتج"],
      default:"/public/img/users/user-1730800656373.png"
    },
    model: {
      type: String,
       default:"/public/img/users/user-1730800656373.png"

    },
    description: {
      ar:{
        type: String,
        trim: true,
        required: [true, "يجب ادخال وصف المنتج"]},
        en:{
          type: String,
          trim: true,
          required: [true,"must be entered product description"]}
    },
    size: [{
      ar:{
        type: String,
        trim: true,
        required: [true, "يجب ادخال حجم المنتج"]
        ,enum:["كبير", "وسط", "صغير"]},
        
        en:{
          type: String,
          trim: true,
          required: [true,"must be entered product size"],
          enum:["large", "medium", "small"]}, 
          price:{type:Number,required:[true,"يجب ادخال سعر كل حجم"]},
           weight:{type:Number,required:[true,"يجب ادخال وزن كل حجم"]}
    }],
    shape: {
      ar:{
        type: String,
        trim: true,
      } ,       en:{
          type: String,
          trim: true,
        }
    },
    flavor: {
      ar:{
        type: String,
        trim: true,
        required: [true, "يجب ادخال نكهة المنتج"]},
        en:{
          type: String,
          trim: true,
          required: [true,"must be entered product flavor"]}
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      // set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
