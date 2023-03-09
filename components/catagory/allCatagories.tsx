import { rolexwatches, bagCollection, jacket, sneakers, hatsCollection } from "public/images";
import React, { FunctionComponent } from "react";
import Catagory from "./catagory";

const AllCatagories: FunctionComponent = function () {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center w-full flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4 mb-2">
        <Catagory srcProp={hatsCollection} cat="hats" />
        <Catagory srcProp={jacket} cat="jackets" />
        <Catagory srcProp={sneakers} cat="sneakers" />
        <Catagory srcProp={rolexwatches} cat="watches" />
        <Catagory srcProp={bagCollection} cat="bags" />
      </div>
    </section>
  );
};
export default AllCatagories;
