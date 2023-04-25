import Layout from '@/components/Layout/Layout';
import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import { cartAcions } from '@/store/cartSlice';
import db from '@/store/db';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Home = (products) => {
  const Product = products.products;

  const disapatch = useDispatch();

  const addToCartHandler = async (item) => {
    disapatch(cartAcions.AddItemToCart(item));

    toast.success('added to the cart');
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3  lg:grid-cols-4">
        {Product.map((product) => (
          <ProductItem
            onAddToCart={addToCartHandler}
            key={product.slug}
            product={product}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
};
export default dynamic(() => Promise.resolve(Home), { ssr: false });

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
