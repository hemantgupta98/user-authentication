const { Schema, model, mon } = require("mongoose");

const userSchema = new Schema({
  tradeName: {
    required: true,
    type: String,
  },
  legalName: {
    type: String,
  },
  businessType: {
    required: true,
    type: String,
  },

  businessCategory: {
    required: true,
    type: String,
  },
  gstin: {
    type: String,
  },
  pan: {
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  website: {
    type: String,
  },

  startDate: {
    required: true,
    type: String,
  },
  addressLine1: {
    required: true,
    type: String,
  },

  addressLine2: {
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  pincode: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  file: {
    required: true,
    type: String,
  },
});

const User = model("form", userSchema);

module.exports = User;
