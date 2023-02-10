import Link from "next/link";
import Image from "next/image";

type Props = {
  shop_data_item: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};
export default function HatItem({ shop_data_item }: Props) {
  return (
    <div className="relative" key={shop_data_item.id}>
      <div className="w-64 h-80 -z-10 group">
        <Image
          alt={shop_data_item.name}
          className="w-full h-full"
          width={300}
          height={300}
          src={shop_data_item.imageUrl}
        />
        <div className="absolute invisible group-hover:visible -translate-x-1/2 -translate-y-1/2  bottom-10 left-1/2 text-black bg-white/90 cursor-pointer hover:bg-black hover:text-white text-center">
          <Link href="#" className="block py-2 px-8 font-normal uppercase">
            Add&nbsp;To&nbsp;Cart
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <span>{shop_data_item.name}</span>
        <span>${shop_data_item.price}</span>
      </div>
    </div>
  );
}
