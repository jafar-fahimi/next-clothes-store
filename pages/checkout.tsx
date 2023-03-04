import { addToCart, deleteFromCart, minusFromCart, setCart } from "components/redux-toolkit/app/itemSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import getStripe from "utils/get-stripe";
import { ItemPropsType } from "utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { productState } from "atoms/productAtom";
import { userAtom } from "atoms/userAtom";
import { useRouter } from "next/router";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render. // don't need; we have getStripe

type selectorType = { cartItems: ItemPropsType[]; totalPrice: number };
type stateItemType = { cartItems: ItemPropsType[]; totalPrice: number; totalItems: number };

export default function Checkout() {
  const dispatch = useDispatch();
  const [stripeIsLoading, setStripeIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const { cartItems: itemStateArray, totalPrice }: selectorType = useSelector(
    (state: { item: stateItemType }) => state.item
  );
  const preExistData = useRecoilValue(productState);

  const router = useRouter();
  const userDetails = useRecoilValue(userAtom); // if user is not signed-in go to signin page

  useEffect(() => {
    const userInfo =
      localStorage.getItem("userData") !== "undefined"
        ? JSON.parse(localStorage.getItem("userData") as string)
        : null;
    if (userDetails?.uid === "" && userInfo?.uid === "") router.push("/signin");
  }, []);

  const redirectToCheckout = async () => {
    try {
      setStripeIsLoading(true);
      const stripe = await getStripe();
      const { data } = await axios.post("/api/checkout_sessions", {
        items: itemStateArray,
        preExistData,
        userDetails,
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
    <section className="w-full scale-[80%] md:scale-100 mt-4 sm:mt-8">
      <div className="max-w-4xl flex flex-col mx-auto items-center">
        <table>
          <tbody>
            <tr className="text-lg flex space-x-12 md:space-x-20 lg:space-x-32 border-b-2 justify-evenly border-black/30 pb-3 mb-4">
              <td className="sm:w-40">Product</td>
              <td className="sm:w-28">Description</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Total</td>
              <td>Remove</td>
            </tr>
            {itemStateArray.map((item) => (
              <tr
                className="text-lg flex space-x-0 md:space-x-20 lg:space-x-32 border-b-2 border-black/30 items-center justify-evenly pb-3 mb-3"
                key={item.id}
              >
                <td className="md:w-28 w-12 sm:w-[20%]">
                  <Image src={item.imageUrl} width={150} height={180} alt={item.name} />
                </td>
                <td className="text-xl md:w-28 w-14 sm:bg-white sm:w-20">
                  {item.name
                    .split(" ")
                    .map((n) => n[0].toUpperCase() + n.slice(1))
                    .join(" ")}
                </td>
                <td>{item.price}$</td>
                <td className="flex items-end">
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
                </td>
                <td>{item.total}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col mt-10 items-end self-end">
          <span className="uppercase text-3xl">Total: {totalPrice.toFixed(2)}$</span>
          <button
            onClick={redirectToCheckout}
            className={`bg-blue-500 px-3 py-2 rounded-md text-white mt-8 font-semibold ${
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
}
