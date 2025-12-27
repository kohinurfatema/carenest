import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
