import { userAtom } from "atoms/userAtom";
import { setCart } from "components/redux-toolkit/app/itemSlice";
import { User } from "firebase/auth";
import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { createUserDocFromAuth, onAuthStateChangedListener } from "utils/firebase";
import Navbar from "./Navbar";

declare var localStorage: any;

const Layout: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useRecoilState(userAtom);
  // The setSignedInUser is updating the value but the updated value can only be accessed on the next render. So I have to use a useEffect to see signedInUser.
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (user) {
        createUserDocFromAuth(user);
        localStorage.setItem("active-user", JSON.stringify(user));
      }
      if (user == null) {
        setUserDetails({ displayName: "", email: "", uid: "" });
        localStorage.setItem("active-user", JSON.stringify(null));
        dispatch(setCart({ stateCartItems: [], stateTotalItems: 0, stateTotalPrice: 0 }));
      } else {
        localStorage.setItem(
          "active-user",
          JSON.stringify({ displayName: user.displayName || "", email: user.email || "", uid: user.uid })
        );
        setUserDetails({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
        });
      }
    });
    console.log('localStorage.getItem("active-user"); ', localStorage.getItem("active-user"));
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
};

export default Layout;
