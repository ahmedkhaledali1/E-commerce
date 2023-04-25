import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout/Layout';
import { cartAcions } from '@/store/cartSlice';
import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import data from '../../store/data';
import db from '@/store/db';
import Product from '@/models/Product';
// import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
  const product = props.myproduct;
  // // const val = t.t;
  // // console.log(val);

  // console.log(product);
  const dispatch = useDispatch();

  // const { query } = useRouter();
  // const { slug } = query;
  // const product = data.product.find((x) => x.slug === slug);
  if (!product) {
    return <div>Produt Not Found</div>;
  }

  // const quantity = +product.quantity;
  // const price = +product.price;

  const addToCartHandler = async function () {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < product.quantity) {
      return toast.error(' sorry. product is out of stock ');
    }
    dispatch(
      cartAcions.AddItemToCart({
        slug: product.slug,
        name: product.name,
        quantity: product.quantity,
        price: product.price * product.quantity,
        image: product.image,
      })
    );
  };
  return (
    <Layout title={product.name}>
      <div className=" flex justify-between f">
        <div className=" mb-12 rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responseve"
          ></Image>
        </div>
        <div className="flex flex-col w-1/2 h-[85%] items-center justify-between mb-14 ">
          <div className="text-3xl">
            <ul>
              <li className="my-4">
                <h1>{product.name}</h1>
              </li>
              <li className="my-4">category: {product.catigory}</li>
              <li className="my-4">brand: {product.brand}</li>
              <li className="my-4">
                rating: {product.rating} of {product.numReviews} people
              </li>
              <li> Descripion: {product.descripion}</li>
            </ul>
          </div>
          <div className="mt-14 w-[40%] text-xl">
            <div className="card p-5">
              <div className="mb-6 flex justify-between">
                <div>price</div>
                <div>{product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const myproduct = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      myproduct: myproduct ? db.convertDocToObj(myproduct) : null,
    },
  };
}
