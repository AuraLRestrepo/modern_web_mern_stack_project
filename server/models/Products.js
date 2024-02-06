import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductsSchema);
export default Products;