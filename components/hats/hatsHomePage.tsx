import SHOP_DATA from "utils/shop.data";
import HatItem from "./hatItem";
export default function HatsHomePage() {
  return (
    <section>
      <h1 className="text-3xl text-center font-semibold mb-8">{SHOP_DATA.hats.title}</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {SHOP_DATA.hats.items.map((shop_data_item) => (
          <HatItem key={shop_data_item.id} shop_data_item={shop_data_item} />
        ))}
      </div>
    </section>
  );
}
