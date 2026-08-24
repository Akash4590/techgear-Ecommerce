import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, default: "Cash on Delivery" },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;