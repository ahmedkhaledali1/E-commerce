import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    catigory: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    descripion: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    banner: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
