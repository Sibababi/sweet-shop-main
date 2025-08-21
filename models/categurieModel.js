const mongoose = require('mongoose');
const categurieSchema = new mongoose.Schema(
  {
    name: {
    ar:{ required: [true, 'يجب ادخال اسم الصنف'],
      type: String},
      en:{
        required: [true, 'must enter name'],
        type: String
      }
    },
    descreption: {
      ar:{
      required: [true, 'يجب ادخال وصف الصنف'],
      type: String},
      en:{required: [true, 'must enter descreption'],
        type: String}
    },
    image: {
      type: String,
      required: [true, "يجب ادخال صورة الصنف"],
    },
  },
  {
    timestamps: true,
  }
);
const Categurie = mongoose.model('Categurie', categurieSchema);
module.exports = Categurie;