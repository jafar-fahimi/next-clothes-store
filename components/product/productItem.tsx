import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "components/redux-toolkit/app/itemSlice";

type Props = {
  shop_data_item: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    total: number;
  };
};
type RealProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | StaticImageData;
  total: number;
};
export default function ProductItem(props: RealProps) {
  const dispatch = useDispatch();
  const shop_data_item = { ...props, qty: 1 };

  return (
    <div className="relative border-slate-100 border-2 shadow-lg" key={shop_data_item.id}>
      <div className="w-64 -z-10 group">
        <Image
          alt={shop_data_item.name}
          className="w-full h-full"
          width={300}
          height={100}
          src={shop_data_item.imageUrl}
        />
        <div className="absolute invisible group-hover:visible -translate-x-1/2 -translate-y-1/2  bottom-10 left-1/2 transition-all duration-200 text-black bg-white/90 cursor-pointer hover:bg-black hover:text-white text-center">
          <Link
            href="#"
            className="block py-2 px-8 font-normal uppercase"
            onClick={() => dispatch(addToCart(shop_data_item))}
          >
            Add&nbsp;To&nbsp;Cart
          </Link>
        </div>
      </div>
      <div className="flex px-2 pb-1 justify-between">
        <span>{shop_data_item.name}</span>
        <span>${shop_data_item.price}</span>
      </div>
    </div>
  );
}
