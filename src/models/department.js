const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
  { versionKey: false },
);
departmentSchema.index({ name: 'text' });
module.exports = departmentSchema;
