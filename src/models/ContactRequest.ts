import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactRequest extends Document {
  _id: mongoose.Types.ObjectId;
  land: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "read" | "responded";
  createdAt: Date;
  updatedAt: Date;
}

const ContactRequestSchema = new Schema<IContactRequest>(
  {
    land: {
      type: Schema.Types.ObjectId,
      ref: "Land",
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "read", "responded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

ContactRequestSchema.index({ seller: 1, status: 1 });
ContactRequestSchema.index({ land: 1 });

const ContactRequest: Model<IContactRequest> =
  mongoose.models.ContactRequest ||
  mongoose.model<IContactRequest>("ContactRequest", ContactRequestSchema);

export default ContactRequest;
