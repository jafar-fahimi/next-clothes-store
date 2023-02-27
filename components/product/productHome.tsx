// import SHOP_DATA from "utils/shop.data";
import { StaticImageData } from "next/image";
import { titleTypes } from "utils/types";
import ProductItem from "./productItem";

type myProductsType = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string | StaticImageData;
};

type Props = {
  pitem: titleTypes;
  // data: PriceProps[];
  data: myProductsType[];
};
export default function ProductHome({ pitem, data = [] }: Props) {
  // console.log("pitem is:", pitem, pitem === "hats");
  const pitem2 = pitem || "items"; // just to avoid pitem-is-undefined error; exist in initial-load
  // took near 10 hours!

  const itemData: myProductsType[] = data.filter((d) => d.description.includes(pitem));
  // console.log(`produtcHome pitem is: ${pitem} ${typeof pitem}, itemData is : ${itemData}`);

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
          />
        ))}
      </div>
    </section>
  );
}
