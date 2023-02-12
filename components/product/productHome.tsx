import SHOP_DATA from "utils/shop.data";
import ProductItem from "./productItem";

type Props = {
  pitem: "jackets" | "hats" | "sneakers" | "men" | "women";
};
export default function ProductHome({ pitem }: Props) {
  //   console.log("pitem is:", pitem, pitem === "hats");
  return (
    <section>
      <h1 className="text-3xl text-center font-semibold mb-8">{SHOP_DATA[pitem].title}</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {SHOP_DATA[pitem].items.map((shop_data_item) => (
          <ProductItem key={shop_data_item.id} shop_data_item={shop_data_item} />
        ))}
      </div>
    </section>
  );
}
