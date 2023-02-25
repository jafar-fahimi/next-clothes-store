// import SHOP_DATA from "utils/shop.data";
import { PriceProps } from "utils/types";
import ProductItem from "./productItem";

type Props = {
  pitem: "jackets" | "hats" | "sneakers" | "bags" | "watches";
  data: PriceProps[];
};
export default function ProductHome({ pitem, data = [] }: Props) {
  // console.log("pitem is:", pitem, pitem === "hats");
  // const pitem2 = pitem; // just to avoid pitem-is-undefined error; exist in initial-load
  // took near 10 hours!

  const itemData: PriceProps[] = data.filter((d) => d.product.description.includes(pitem));
  // console.log(`produtcHome pitem is: ${pitem} ${typeof pitem}, itemData is : ${itemData}`);

  return (
    <section>
      <h1 className="text-3xl text-center font-semibold mb-8">{pitem.toUpperCase()}</h1>
      <div className="flex flex-wrap gap-5 gap-y-9 justify-center">
        {itemData.map((itemD) => (
          <ProductItem
            id={+itemD.product.id}
            key={itemD.product.id}
            name={itemD.product.name}
            price={itemD.unit_amount.toFixed(1)}
            imageUrl={itemD.product.images[0]}
          />
        ))}
      </div>
    </section>
  );
}
