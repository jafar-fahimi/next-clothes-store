import SHOP_DATA from "utils/shop.data";
import ProductItem from "./productItem";

type Props = {
  pitem: "jackets" | "hats" | "sneakers" | "men" | "women";
};
export default function ProductHome({ pitem }: Props) {
  // console.log("pitem is:", pitem, pitem === "hats");
  const pitem2 = pitem || "hats"; // just to avoid pitem-is-undefined error; exist in initial-load
  // took near 10 hours!

  return (
    <section>
      <h1 className="text-3xl text-center font-semibold mb-8">{SHOP_DATA[pitem2].title}</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {SHOP_DATA[pitem2].items.map((shop_data_item) => (
          <ProductItem key={shop_data_item.id} shop_data_item={shop_data_item} />
        ))}
      </div>
    </section>
  );
}
