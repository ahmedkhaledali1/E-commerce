import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout/Layout';
import { cartAcions } from '@/store/cartSlice';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Payment() {
  const router = useRouter();

  const disapatch = useDispatch();
  const shipingAdress = useSelector((state) => state.cart.shipingAdress);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);

  const [selectedPaymentMethod, setselectedPaymentMethod] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('payment method is required');
    }

    disapatch(cartAcions.savePaymentMethod(selectedPaymentMethod));

    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shipingAdress.Adress) {
      return router.push('/shiping');
    }

    setselectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shipingAdress.Adress]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl"> Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setselectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shiping')}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
Payment.auth = true;

export default dynamic(() => Promise.resolve(Payment), { ssr: false });
