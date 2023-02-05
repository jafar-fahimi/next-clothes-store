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
    <div className="relative " key={shop_data_item.id}>
      <div className="w-64 h-80 -z-10 group">
        <Image
          alt={shop_data_item.name}
          className="w-full h-full"
          width={300}
          height={300}
          src={shop_data_item.imageUrl}
        />
        <div className="absolute top-0 bg-white/20 w-full h-full hidden group-hover:block z-10"></div>
        <div className="absolute hidden group-hover:block -translate-x-1/2 -translate-y-1/2 bottom-10 left-1/2 text-black bg-white/90 hover:bg-black hover:text-white py-2 px-8 text-center">
          <Link href="#" className="font-normal inline-block uppercase w-28">
            Add To Cart
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
