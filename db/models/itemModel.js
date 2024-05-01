const mongoose = require("mongoose");
require('dotenv').config()

const root = process.env.FIREBASE_URL_MENU;

// the schema for menu items

const MenuSchema = new mongoose.Schema({
  resId: {
      type: String,
      required: [true, "Please provide a Restaurant ID!"],
      unique: false
  },
  name: {
      type: String,
      required : [true, "Please provide a name for the item!"],
      unique: false
  },
  price: {
      type: Number,
      min: 0,
      required: [true, "Please provide a price for the item!"],
      unique: false
  },
  description: {
      type: String,
      required: false,
      unique: false
  },
  availability: {
      type: Boolean,
      required: true,
      unique: false
  },
  category: {
      type: String,
      required: true,
      unique: false,
      set: v => v.toLowerCase()
  },
  img: {
    type: String,
    get: v => `${root}${v}`,
    default: "unavailable.jpg?alt=media&token=b336c0cf-c575-4c99-b60b-c8d078dab2be"
  }
},
{
    toObject : {getters: true},
    toJSON : {getters: true}
});

MenuSchema.index({resId: 1, name: 1}, { unique: true });

// export UserSchema
module.exports = mongoose.model.Menu || mongoose.model("Menu", MenuSchema);