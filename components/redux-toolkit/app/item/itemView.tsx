import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart, minusFromCart } from "./itemSlice";
type Props = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};
export function ItemView() {
  const itemState = useSelector((state: Props) => {
    return state;
  });
  const iDispatch = useDispatch();
  return (
    <div>
      {/* <h2>Item State is - {itemState}</h2> */}
      <button
        className="bg-red-400 m-4"
        onClick={() =>
          iDispatch(
            addToCart({
              id: 1,
              name: "Brown Brim",
              imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
              price: 25,
            })
          )
        }
      >
        Order Item
      </button>
    </div>
  );
}
