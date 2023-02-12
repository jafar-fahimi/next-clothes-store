import HatsHomePage from "components/hats/hatsHomePage";
import JacketsHome from "components/jackets/jacketsHome";

import { useRouter } from "next/router";
import React from "react";

export default function HatsPage() {
  const { item } = useRouter().query;
  // console.log("item is :", item);
  return (
    <React.Fragment>
      {item == "hats" && <HatsHomePage />}
      {item == "jackets" && <JacketsHome />}
      {item == "sneakers" && <HatsHomePage />}
    </React.Fragment>
  );
}
