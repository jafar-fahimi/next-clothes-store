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
  console.log(itemStateArray);
  const iDispatch = useDispatch();
  return (
    <div>
      <h2>
        Item Names are: <br />
        {itemStateArray.map((itm) => (
          <p key={itm.id}>{itm.name}</p>
        ))}
      </h2>
      <button
        className="bg-red-400 m-4"
        onClick={() => {
          iDispatch(
            addToCart({
              id: 10,
              name: "Brown Brim",
              imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
              price: 25,
            })
          );
          console.log("array of item obj is: ", itemStateArray);
        }}
      >
        Order Item
      </button>
    </div>
  );
}
