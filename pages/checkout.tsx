import { addToCart, deleteFromCart, minusFromCart, setCart } from "components/redux-toolkit/app/itemSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import getStripe from "utils/get-stripe";
import { selectorType, stateItemType } from "utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState } from "atoms/productAtom";
import { userAtom, userWantsPayment } from "atoms/userAtom";
import { useRouter } from "next/router";
import { NextPage } from "next";

declare var alert: any;
declare var window: any;
declare var localStorage: any;

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render. // don't need; we have getStripe

const Checkout: NextPage = () => {
  const dispatch = useDispatch();
  const [stripeIsLoading, setStripeIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // userWantsStripePayment tracked in signin; if true, user after signin directly will have stripe payment.
  const [userWantsStripePayment, setUserWantsStripePayment] = useRecoilState(userWantsPayment);
  const { cartItems: itemStateArray, totalPrice }: selectorType = useSelector(
    (state: { item: stateItemType }) => state.item
  );
  const preExistData = useRecoilValue(productState);
  const router = useRouter();
  // let userInfo;
  // if user is signed in setIsUserSignedIn(true), then by that we decide if user is signed in he can have stripe payment. else he must to go to signin page first.
  const userDetailsFromRecoilAtom = useRecoilValue(userAtom);
  React.useEffect(() => {
    const activeUserLocalStorage = JSON.parse(localStorage.getItem("active-user") as string);
    if (
      userDetailsFromRecoilAtom.uid === "" &&
      (activeUserLocalStorage === null || activeUserLocalStorage?.uid === "")
    )
      setIsUserSignedIn(false);
    else setIsUserSignedIn(true);
  }, [userDetailsFromRecoilAtom]);

  const redirectToStripeCheckout = async () => {
    if (!isUserSignedIn) {
      setUserWantsStripePayment(true);
      router.push("/signin");
      return;
    }
    // if user is not signed in go to signin page else go to stripe payment.
    try {
      setStripeIsLoading(true);
      const stripe = await getStripe();
      // make sure it is '/api/checkout_sessions/ to work in vercel!
      const { data } = await axios.post("/api/checkout_sessions", {
        items: itemStateArray,
        preExistData,
        userDetails: userDetailsFromRecoilAtom,
      });

      // after successfully payment, make cart empty:
      dispatch(setCart({ stateCartItems: [], stateTotalItems: 0, stateTotalPrice: 0 }));
      localStorage.setItem("state", JSON.stringify([]));
      stripe?.redirectToCheckout({ sessionId: data.session.id });
      setStripeIsLoading(false);
    } catch (err: any) {
      alert("Error occured while proceeding your payment: " + err.message);
      setStripeError(err.message);
    }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, []);

  if (stripeError) {
    alert(`Stripe Error: ${stripeError}`);
    setStripeIsLoading(false);
    setStripeError(null);
  }
  return (
    // scale-75 or smaller makes the content very down on smaller screens; so add -mt
    <section className="overflow-auto w-full mt-4 sm:mt-8">
      <div className="max-w-4xl h-auto flex flex-col mx-auto items-center justify-start">
        <section className="scale-50 xsm:scale-75 md:scale-100">
          <div>
            <div className="text-lg w-full flex space-x-12 md:space-x-20 lg:space-x-32 border-b-2 justify-evenly border-black/30 pb-3 mb-4">
              <span>Product</span>
              <span>Description</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Remove</span>
            </div>
            {itemStateArray.map((item) => (
              <div
                className="text-lg flex space-x-0 md:space-x-20 lg:space-x-32 border-b-2 border-black/30 ml-4 xsm:ml-0 items-center justify-evenly pb-3 mb-3"
                key={item.id}
              >
                <span className="md:w-28 w-12 xsm:w-[20%] sm:w-auto -ml-12 lg:-ml-0">
                  <Image src={item.imageUrl} width={150} height={180} alt={item.name} />
                </span>
                <span className="text-xl md:w-28 w-14 sm:bg-white sm:w-20">
                  {item.name
                    .split(" ")
                    .map((n) => n[0].toUpperCase() + n.slice(1))
                    .join(" ")}
                </span>
                <span>{item.price}$</span>
                <span className="flex items-end">
                  <button
                    onClick={() => dispatch(minusFromCart(item))}
                    className="font-extrabold text-2xl focus:ring-4"
                  >
                    <svg
                      fill="none"
                      stroke="#000"
                      className="w-6 h-6"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      ></path>
                    </svg>
                  </button>
                  &nbsp;{item.qty}&nbsp;
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="font-extrabold text-2xl focus:ring-4"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                    </svg>
                  </button>
                </span>
                <span>{item.total}</span>
                <span>
                  <button className="text-2xl" onClick={() => dispatch(deleteFromCart(item))}>
                    <svg
                      fill="none"
                      stroke="#000"
                      strokeWidth={2}
                      color="#000"
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              </div>
            ))}
          </div>
        </section>
        <div className="flex flex-col mt-10 items-end self-end">
          <span className="uppercase text-xl sm:text-2xl md:text-3xl">Total: {totalPrice.toFixed(2)}$</span>
          <button
            onClick={redirectToStripeCheckout}
            className={`bg-blue-500 scale-75 sm:scale-100 px-3 py-2 rounded-md text-white mt-8 font-semibold ${
              stripeIsLoading && "opacity-70"
            }`}
            // disabled={stripeError}
          >
            {stripeIsLoading ? "Loading..." : "Pay with 💳"}
          </button>
        </div>
      </div>
    </section>
  );
};
export default Checkout;
