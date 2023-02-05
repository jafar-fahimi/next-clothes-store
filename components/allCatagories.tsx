import { StaticImageData } from "next/image";
import React from "react";
import Catagory from "./catagory";

import {
  bag1,
  bag2,
  bag3,
  bag4,
  bag5,
  full1,
  full2,
  full3,
  jacket1,
  jacket2,
  jacket3,
  transparent1,
  transparent2,
  transparent3,
  transparent4,
  transparent5,
} from "/public/images/";

export default function AllCatagories() {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col flex-wrap sm:flex-row justify-evenly gap-y-2">
        <Catagory srcProp={bag1} cat="Hat" />
        <Catagory srcProp={bag2} cat="Hat" />
        <Catagory srcProp={bag3} cat="Hat" />
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-evenly ">
        <Catagory srcProp={bag4} cat="Hat" />
        <Catagory srcProp={bag5} cat="Hat" />
      </div>
    </section>
  );
}