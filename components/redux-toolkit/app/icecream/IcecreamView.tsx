import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

export function IcecreamView() {
  const numIcecream = useSelector((state: any) => {
    console.log(state);
    return state.icecream.numIcecream;
  });
  const iDispatch = useDispatch();
  return (
    <div>
      <h2>Icecreams number - {numIcecream}</h2>
      <button onClick={() => iDispatch(ordered())}>Order Icecream</button>
      <button onClick={() => iDispatch(restocked(5))}>Restock Icecream</button>
    </div>
  );
}
