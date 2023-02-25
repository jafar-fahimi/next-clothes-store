import React from "react";
import Catagory from "./catagory";
import { brownHat, rolexwatches, bagCollection, jacket, sneakers } from "public/images";

export default function AllCatagories() {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center w-full flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4 mb-2">
        <Catagory srcProp={brownHat} cat="Hats" />
        <Catagory srcProp={jacket} cat="Jackets" />
        <Catagory srcProp={sneakers} cat="Sneakers" />
      </div>
      <div className="flex flex-col items-center w-full flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4">
        <Catagory srcProp={rolexwatches} cat="watches" />
        <Catagory srcProp={bagCollection} cat="bags" />
      </div>
    </section>
  );
}
