import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Menu } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from '../DropdownLink';
import { cartAcions } from '@/store/cartSlice';
import dynamic from 'next/dynamic';
import { AiOutlineShop } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';

function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const disapatch = useDispatch();

  const logoutHandler = () => {
    disapatch(cartAcions.cartReset());
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + '- AKShop' : 'AKShop'}</title>
        <meta name="description" content="Ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-16 items-center px-2 justify-between shadow-md mb-10 bg-slate-200">
            <Link href="/" className="flex items-center">
              <h2 className="text-3xl pl-6 text-sky-700 font-bold">AKShop</h2>
              <AiOutlineShop
                color="white"
                size={50}
                className="cursor-pointer
                        hover:opacity-70
                        transition
                        "
              />
            </Link>
            <div className="flex items-center">
              <Link href="/cart">
                <div className="p-6 text-xl flex items-center font-semibold text-sky-700 ">
                  <FaShoppingCart
                    color="sky-700"
                    size={35}
                    className="cursor-pointer
                        hover:opacity-90
                        transition
                        "
                  />
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {totalQuantity}
                  </span>
                </div>
              </Link>
              <div className="p-6 text-xl font-semibold text-sky-700 ">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-sky-700">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <div className="p-2">Login</div>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-20 bg-slate-400 font-semibold px-8 justify-between items-center shadow-inner">
          <p>
            {' '}
            Have a nice day, Habibi{' '}
            <span className="text-red-500 text-2xl px-1">&#9825;</span>{' '}
          </p>
          <h2 className="text-xl  text-sky-700 font-bold flex items-center">
            AKShop
            <AiOutlineShop
              color="white"
              size={25}
              className="cursor-pointer
                        hover:opacity-70
                        transition
                        "
            />
          </h2>
          <p>contact: 01278093760</p>
        </footer>
      </div>
    </>
  );
}
export default dynamic(() => Promise.resolve(Layout), { ssr: false });
