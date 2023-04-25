/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

export default function ProductItem(props) {
  const product = props.product;

  const addToCartHandler = async function () {
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < product.quantity) {
      return toast.error(' sorry. product is out of stock ');
    }

    props.onAddToCart({
      slug: product.slug,
      name: product.name,
      quantity: product.quantity,
      price: product.price * product.quantity,
      image: product.image,
    });
  };
  return (
    <div className="card">
      <Link href={`./product/${product.slug}`}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center p-3">
        <Link href={`./product/${product.slug}`}>
          <div>
            <h2 className="text-2xl font-medium  text-sky-400 ">
              {product.name}
            </h2>
          </div>
        </Link>
        <p className="mb-2 mt-1 text-lg">{product.brand}</p>
        <p className=" text-xl mb-1 ">$ {product.price}</p>
        <button
          onClick={() => {
            addToCartHandler();
          }}
          className="primary-button"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
