import React from "react";
import Catagory from "./catagory";
import { brownHat, men, women, jacket, sneakers } from "/public/images/";

export default function AllCatagories() {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4">
        <Catagory srcProp={brownHat} cat="Hat" />
        <Catagory srcProp={jacket} cat="Hat" />
        <Catagory srcProp={sneakers} cat="Hat" />
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4">
        <Catagory srcProp={women} cat="Hat" />
        <Catagory srcProp={men} cat="Hat" />
      </div>
    </section>
  );
}
