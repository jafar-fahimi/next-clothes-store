import React from "react";
import Catagory from "./catagory";
import { brownHat, men, women, jacket, sneakers } from "/public/images/";

export default function AllCatagories() {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col flex-wrap sm:flex-row justify-evenly gap-y-2">
        {/* <Catagory srcProp={INITIAL_STATE.sections[0].imageUrl} cat="Hat" /> */}
        <Catagory srcProp={brownHat} cat="Hat" />
        <Catagory srcProp={jacket} cat="Hat" />
        <Catagory srcProp={sneakers} cat="Hat" />
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-evenly ">
        <Catagory srcProp={women} cat="Hat" />
        <Catagory srcProp={men} cat="Hat" />
      </div>
    </section>
  );
}
