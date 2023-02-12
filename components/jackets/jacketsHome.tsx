import SHOP_DATA from "utils/shop.data";
import JacketItem from "./jacketItem";

export default function JacketsHome() {
  return (
    <section>
      <h1 className="text-3xl text-center font-semibold mb-8">{SHOP_DATA.jackets.title}</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {SHOP_DATA.jackets.items.map((shop_data_item) => (
          <JacketItem key={shop_data_item.id} shop_data_item={shop_data_item} />
        ))}
      </div>
    </section>
  );
}
