import React, { useState, useEffect, FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import nextLogo from "public/next.svg";
import { menu, close, bagIcon2 } from "public/assets/";
import OneItem from "./oneItem";
import { useSelector } from "react-redux";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Popover } from "@mui/material";
// sign out modal
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty?: number;
};

type selectorType = { cartItems: Props[]; totalPrice: number; totalItems: number };
type stateItemType = { cartItems: Props[]; totalPrice: number; totalItems: number };
const Navbar: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const {
    cartItems: itemStateArray,
    totalPrice,
    totalItems,
  }: selectorType = useSelector((state: { item: stateItemType }) => state.item);

  const [toggle, setToggle] = useState(false);
  const [cartOverview, setCartOverview] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setCartOverview(false);
  }, []);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar ">
      <Image src={nextLogo} className="w-20 sm:w-24 md:w-28" alt="hoobank" width={100} height={50} />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 text-sm border-box md:text-lg lg:text-xl">
        <li className="cursor-pointer mx-4  font-normal text-black hover:text-slate-500 focus:font-semibold">
          <Link href="/">Shop</Link>
        </li>
        <li className="cursor-pointer mx-4 font-normal text-black hover:text-slate-500 focus:font-semibold">
          <Link href="contact">Contact</Link>
        </li>
        <li className="cursor-pointer mx-4 font-normal text-black hover:text-slate-500 focus:font-semibold">
          {!user ? (
            <a href="signin">Sign In</a>
          ) : (
            <button onClick={() => setOpenModal(true)}>Sign out</button>
          )}
        </li>
        <li className="relative mx-4 font-normal focus:font-semibold">
          <div
            onClick={() => setCartOverview(!cartOverview)}
            className="hover:cursor-pointer  text-black hover:text-slate-500 relative"
          >
            <Image src={bagIcon2} alt="shopping Cart" className="-z-10" width={25} />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2 text-sm">
              {totalItems}
            </span>
          </div>
          <Popover
            className="absolute flex flex-col justify-between top-14 w-full z-10 bg-transparent p-4"
            open={cartOverview}
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={() => setCartOverview(false)}
          >
            <div className="w-full bg-transparent z-10 p-3">
              <div className="space-y-4 mb-8 overflow-y-auto">
                {itemStateArray.map((item) => (
                  <OneItem
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    qty={item.qty}
                    price={item.price}
                  />
                ))}
              </div>
              <Link
                href="/checkout"
                className="block uppercase px-8 w-full border-2 border-black py-4 hover:bg-black hover:text-white active:ring-4 text-center"
              >
                go to checkout
              </Link>
            </div>
          </Popover>
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div className="sm:hidden relative box-border px-4 font-normal focus:font-semibold">
          <div
            onClick={() => setCartOverview(!cartOverview)}
            className="hover:cursor-pointer text-black hover:text-slate-500 relative"
          >
            <Image src={bagIcon2} alt="shopping Cart" className="-z-10" width={25} />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2 text-sm">
              {totalItems}
            </span>
          </div>
          <Popover
            className="absolute flex flex-col justify-between top-14 w-full z-10 bg-transparent p-4"
            open={cartOverview}
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={() => setCartOverview(false)}
          >
            <div className="w-full z-10 bg-white p-3">
              <div className="space-y-4 mb-8 overflow-y-auto">
                {itemStateArray.map((item) => (
                  <OneItem
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    qty={item.qty}
                    price={item.price}
                  />
                ))}
              </div>
              <Link
                href="/checkout"
                className="block uppercase px-8 w-full border-2 border-black py-4 hover:bg-black hover:text-white active:ring-4 text-center"
              >
                go to checkout
              </Link>
            </div>
          </Popover>
        </div>
        <Image
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex z-10"
          } p-6 bg-black-gradient absolute top-10 right-0 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex items-start justify-center py-4 px-4 bg-white/90 flex-1 flex-col gap-4 border-2 border-black">
            <li className="cursor-pointer box-border px-4 font-normal text-black hover:text-slate-500 focus:font-semibold">
              <Link href="/">Shop</Link>
            </li>
            <li className="cursor-pointer box-border px-4 font-normal text-black hover:text-slate-500 focus:font-semibold">
              <Link href="contact">Contact</Link>
            </li>
            <li className="cursor-pointer box-border px-4 font-normal text-black hover:text-slate-500 focus:font-semibold">
              {!user ? (
                <a href="signin">Sign In</a>
              ) : (
                <button onClick={() => setOpenModal(true)}>Sign out</button>
              )}
            </li>
          </ul>
        </div>
        {/* sign out popop modal */}
        <Transition.Root show={openModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Sign Out
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to sign out your account? <br />
                              This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          setOpenModal(false);
                          auth.signOut();
                        }}
                      >
                        Sign Out
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpenModal(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </nav>
  );
};
export default Navbar;
