import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { cartAcions } from '@/store/cartSlice';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function CartScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItemsPrices = [];
  const router = useRouter();

  for (let i = 0; i < cartItems.length; i++) {
    cartItemsPrices.push(+cartItems[i].price * cartItems[i].quantity);
    console.log(cartItemsPrices[i] + cartItemsPrices[i]);
  }

  var totalPrice = 0;
  if (cartItems.length > 0) {
    totalPrice = cartItemsPrices.reduce((a, c) => a + c);
  }

  const disapatch = useDispatch();

  const removeItemHandler = (slug) => {
    disapatch(cartAcions.RemoveItemFromCart(slug));
  };
  const addToCartHandler = (item) => {
    disapatch(cartAcions.AddItemToCart(item));
  };
  return (
    <Layout>
      <h1 className=" text-3xl font-bold">shopping cart</h1>
      {cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div className=" grid md:grid-cols-4 md:gap-5 ">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">price</th>
                  <th className="p-5">Remove</th>
                  <th className="p-5">Add</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={50}
                            width={50}
                          ></Image>
                          &nbsp;
                          <h3 className="text-red-100 text-xl pl-4">
                            {item.name}
                          </h3>
                        </div>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">
                      ${item.price * item.quantity}
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item.slug)}>
                        -1
                      </button>{' '}
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() =>
                          addToCartHandler({
                            slug: item.slug,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                          })
                        }
                      >
                        +1
                      </button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 max-h-40">
            <ul>
              <li>
                <div className="pb-3 text-xl mb-8">
                  subtotal({totalQuantity}) : ${totalPrice}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shiping')}
                  className="primary-button w-full"
                >
                  Check out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
