const dateFormat = require("../utils/dateFormat");
const { Schema, model } = require("mongoose");

const contactSchema = new Schema({

  email: {
    type: String,
    required: true,
  } , 
  contactBody: {
    type: String,
    required: [true, "please add a message"],
    minLength: [6, "add more than 6 six characters"],
    maxLength: [280, "you have exceeded the limit"],
  },
  userId: {
    type: String,
    required: [true, "please add your username"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const ContactUs = model("ContactUs", contactSchema);
module.exports = ContactUs;
