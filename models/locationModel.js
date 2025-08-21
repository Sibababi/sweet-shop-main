const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  Longitude: {
    
    type: Number,
    required: [true, "يجب ادخال خط طول للموقع"]},
    
  Latitude: {
  
    type: Number,
    required: [true, "يجب ادخال خط عرض للموقع"]},
   
  
});
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
