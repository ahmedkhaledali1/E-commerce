import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout/Layout';
import { cartAcions } from '@/store/cartSlice';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function Shiping() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const disapatch = useDispatch();
  const submitHandler = ({ fullName, Adress, city, PostalCode, country }) => {
    disapatch(
      cartAcions.saveShipingAdress({
        fullName,
        Adress,
        city,
        PostalCode,
        country,
      })
    );

    router.push('/payment');
  };
  const shipingAdress = useSelector((state) => state.cart.shipingAdress);

  useEffect(() => {
    setValue('fullName', shipingAdress.fullName);
    setValue('Adress', shipingAdress.Adress);
    setValue('city', shipingAdress.city);
    setValue('PostalCode', shipingAdress.PostalCode);
    setValue('country', shipingAdress.country);
  }, [setValue, shipingAdress]);

  console.log(shipingAdress);

  return (
    <Layout title="Shiping Adress">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl"> Shiping Adress </h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full text-black"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="Adress">Adress</label>
          <input
            className="w-full text-black"
            id="Adress"
            autoFocus
            {...register('Adress', {
              required: 'please enter Adress',
              minLength: { value: 3, message: 'Adress is more 2 chars' },
            })}
          />
          {errors.Adress && (
            <div className="text-red-500">{errors.Adress.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">city</label>
          <input
            className="w-full text-black"
            id="city"
            autoFocus
            {...register('city', {
              required: 'please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="PostalCode">Postal Code</label>
          <input
            className="w-full text-black"
            id="PostalCode"
            autoFocus
            {...register('PostalCode', {
              required: 'please enter Postal Code',
            })}
          />
          {errors.PostalCode && (
            <div className="text-red-500">{errors.PostalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">country</label>
          <input
            className="w-full text-black"
            id="country"
            autoFocus
            {...register('country', {
              required: 'please enter country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">next</button>
        </div>
      </form>
    </Layout>
  );
}

Shiping.auth = true;

export default dynamic(() => Promise.resolve(Shiping), { ssr: false });
