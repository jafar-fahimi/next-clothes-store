import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart, minusFromCart } from "./itemSlice";
type Props = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty?: number;
  countInStock?: number;
};

export function ItemView() {
  const itemStateArray: Props[] = useSelector(
    (state: { item: { cartItems: Props[] } }) => state.item.cartItems
  );
  const iDispatch = useDispatch();
  return (
    <div>
      <h2>
        Item Names are: <br />
        {itemStateArray.map((itm) => (
          <span key={itm.id}>{itm.name}</span>
        ))}
      </h2>
      <button
        className="bg-red-400 m-4"
        onClick={() => {
          console.log("array of item obj is: ", itemStateArray);
          iDispatch(
            addToCart({
              id: 1,
              name: "Brown Brim",
              imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
              price: 25,
            })
          );
        }}
      >
        Order Item
      </button>
    </div>
  );
}
