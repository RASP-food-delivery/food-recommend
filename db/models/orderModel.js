const mongoose = require("mongoose");
// ofMixed: [Schema.Types.Mixed],


// Orders schema

const OrderSchema = new mongoose.Schema({
  //userID  
  userID: {
      type: String,
      required: [true, "User ID is required"],
      unique: false
  },
  //menu items
  items: [{
    orderid: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  // instructions field
  instruction: {
    type: String,
    required : false,
    unique: false,
  },
  
  // payement type field
    paymentMode: {
      type: String,
      required: [true, "No payment mode specified."],
      unique: false,
    },
    
  // rest ID field
  restID: {
    type: String,
    required: [true, "restaurant ID is required"],
    unique: false,
  },

  //status
  status : {
    type : String,
    required : [[true, "status is required(pending, confirm, denied, completed)"]],
    unique : false,
  }
  ,
  phone: {
    type: String,
    required: [true, "Please provide a Phone No.!"],
    unique: false,
  },
  fullName: {
    type: String,
    required: [true, "Please provide a name!"],
    unique: false,
  },
  address: {
    type: String,
    required: [true, "Please provide an address!"],
    unique: false,
  },
  
});

// export OrderSchema
module.exports = mongoose.model.Orders || mongoose.model("Orders", OrderSchema);
