import React from "react";
import Catagory from "./catagory";
import { brownHat, men, women, jacket, sneakers } from "public/images";

export default function AllCatagories() {
  return (
    <section className="w-full">
      {/* <div className="grid grid-cols-3 grid-flow-row-dense justify-center gap-x-4 gap-y-4 mb-2"> */}
      <div className="flex flex-col items-center w-full flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4 mb-2">
        <Catagory srcProp={brownHat} cat="Hats" />
        <Catagory srcProp={jacket} cat="Jackets" />
        <Catagory srcProp={sneakers} cat="Sneakers" />
      </div>
      {/* <div className="inline-grid grid-cols-2 grid-flow-row-dense justify-center items-center justify-center gap-x-4 gap-y-4"> */}
      <div className="flex flex-col items-center w-full flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4">
        <Catagory srcProp={women} cat="Women" />
        <Catagory srcProp={men} cat="Men" />
      </div>
    </section>
  );
}
