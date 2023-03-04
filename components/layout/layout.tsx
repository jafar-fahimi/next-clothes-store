import { userAtom } from "atoms/userAtom";
import { setCart } from "components/redux-toolkit/app/itemSlice";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { createUserDocFromAuth, onAuthStateChangedListener } from "utils/firebase";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useRecoilState(userAtom);
  // The setSignedInUser is updating the value but the updated value can only be accessed on the next render. So I have to use a useEffect to see signedInUser.
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (user) createUserDocFromAuth(user);
      if (user == null) {
        setUserDetails({ displayName: "", email: "", uid: "" });
        dispatch(setCart({ stateCartItems: [], stateTotalItems: 0, stateTotalPrice: 0 }));
      } else
        setUserDetails({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
        });
    });
    return unsubscribe;
  }, []);

  // here after window is load(useEffect),we set checkout page's data from localStorage if any
  useEffect(() => {
    const parsedLocalState = JSON.parse(localStorage.getItem("state") as string);
    const localStorageCartItems = parsedLocalState?.cartItems;
    const localStorageTotalPriceValue = parsedLocalState?.totalPrice;
    const localStorageTotalItemsValue = parsedLocalState?.totalItems;
    const stateCartItems = localStorageCartItems != undefined ? localStorageCartItems : [];
    const stateTotalItems = localStorageTotalItemsValue != undefined ? localStorageTotalItemsValue : 0;
    const stateTotalPrice = localStorageTotalPriceValue != undefined ? localStorageTotalPriceValue : 0;
    dispatch(setCart({ stateCartItems, stateTotalItems, stateTotalPrice }));
  }, []);

  return (
    <section className="min-h-screen px-3 sm:px-8 pb-8">
      <Navbar />
      {children}
    </section>
  );
}
