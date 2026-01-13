import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILand extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  area: number; // in square feet
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  images: string[];
  landType: "residential" | "commercial" | "agricultural" | "industrial";
  features: string[];
  owner: mongoose.Types.ObjectId;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LandSchema = new Schema<ILand>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description must be at least 20 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    area: {
      type: Number,
      required: [true, "Area is required"],
      min: [1, "Area must be at least 1 sq ft"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      pincode: {
        type: String,
        required: [true, "Pincode is required"],
        match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
      },
    },
    images: {
      type: [String],
      default: [],
    },
    landType: {
      type: String,
      enum: ["residential", "commercial", "agricultural", "industrial"],
      required: [true, "Land type is required"],
    },
    features: {
      type: [String],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
LandSchema.index({ "location.city": 1, "location.state": 1 });
LandSchema.index({ price: 1 });
LandSchema.index({ area: 1 });
LandSchema.index({ landType: 1 });

const Land: Model<ILand> =
  mongoose.models.Land || mongoose.model<ILand>("Land", LandSchema);

export default Land;
