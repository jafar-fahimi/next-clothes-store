import ProductHome from "components/product/productHome";

import { useRouter } from "next/router";
import React from "react";

export default function HatsPage() {
  const { item } = useRouter().query;

  return (
    <React.Fragment>
      <ProductHome pitem={item} />
    </React.Fragment>
  );
}
