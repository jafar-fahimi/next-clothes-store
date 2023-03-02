import { setCart } from "components/redux-toolkit/app/itemSlice";
import { hatsCollection } from "public/images";
import React from "react";
import { useDispatch } from "react-redux";
import { ItemPropsType } from "utils/types";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const initialItems: ItemPropsType[] = [];
  const totalItemsValue = initialItems.reduce((acc, cur) => acc + cur.qty, 0);
  const totalPriceValue = initialItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
  React.useEffect(() => {
    const localStorageCartItems = JSON.parse(localStorage.getItem("state") as string)?.cartItems;
    const localStorageTotalPriceValue = JSON.parse(localStorage.getItem("state") as string)?.totalPrice;
    const localStorageTotalItemsValue = JSON.parse(localStorage.getItem("state") as string)?.totalItems;
    const stateCartItems = localStorageCartItems != undefined ? localStorageCartItems : initialItems;
    const stateTotalItems =
      localStorageTotalItemsValue != undefined ? localStorageTotalItemsValue : totalItemsValue;
    const stateTotalPrice =
      localStorageTotalPriceValue != undefined ? localStorageTotalPriceValue : totalPriceValue;
    dispatch(setCart({ stateCartItems, stateTotalItems, stateTotalPrice }));
  }, []);

  return (
    <section className="min-h-screen px-3 sm:px-8 pb-8">
      <Navbar />
      {children}
    </section>
  );
}
