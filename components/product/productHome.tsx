import React from "react"; // 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead
import { StaticImageData } from "next/image";
import { FunctionComponent } from "react";
import { titleTypes } from "utils/types";
import ProductItem from "./productItem";

type myProductsType = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string | StaticImageData;
  total: number;
};

type Props = {
  pitem: titleTypes;
  data: myProductsType[];
};
const ProductHome: FunctionComponent<Props> = ({ pitem, data = [] }) => {
  const pitem2 = pitem || "items"; // just to avoid pitem-is-undefined error; exist in initial-load
  // took near 10 hours!

  const itemData: myProductsType[] = data.filter((d) => d.description.includes(pitem));

  return (
    <section>
      <h1 className="text-3xl text-center font-semibold mb-8">{pitem2.toUpperCase()}</h1>
      <div className="flex flex-wrap gap-5 gap-y-9 justify-center">
        {itemData.map((itemD) => (
          <ProductItem
            id={itemD.id}
            key={itemD.id}
            name={itemD.name}
            price={+itemD.price}
            imageUrl={itemD.image}
            total={itemD.total}
          />
        ))}
      </div>
    </section>
  );
};
export default ProductHome;
