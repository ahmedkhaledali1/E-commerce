import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout/Layout';
import { cartAcions } from '@/store/cartSlice';
import { getError } from '@/store/error';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function PlaceOrderScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const shippingAddress = useSelector((state) => state.cart.shipingAdress);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);

  const disapatch = useDispatch();

  const cartItemsPrices = [];

  for (let i = 0; i < cartItems.length; i++) {
    cartItemsPrices.push(+cartItems[i].price * +cartItems[i].quantity);
    console.log(+cartItemsPrices[i] + +cartItemsPrices[i]);
  }

  var totalPrice = 0;
  if (cartItems.length > 0) {
    totalPrice = cartItemsPrices.reduce((a, c) => a + c);
  }
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const taxPrice = round2(totalPrice * 0.15);
  const shippingPrice = totalPrice > 200 ? 0 : 15;
  const theTotal = totalPrice + taxPrice + shippingPrice;

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/theorders', {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: theTotal,
      });
      setLoading(false);
      console.log(data);

      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }

    disapatch(cartAcions.cartClearItems());
  };

  console.log(shippingAddress.PostalCode);
  console.log(shippingAddress.city);
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          {' '}
          cart is empty <Link href="/">Go Shopping</Link>{' '}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.Adress},{' '}
                {shippingAddress.city}, {shippingAddress.PostalCode},{' '}
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shiping">Edit</Link>
              </div>
            </div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className=" p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <div className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </div>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>

          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${theTotal}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? 'Loading...' : 'Place Order'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
