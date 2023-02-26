import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "components/redux-toolkit/app/itemSlice";

type Props = {
  shop_data_item: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};
type RealProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | StaticImageData;
};
export default function ProductItem(props: RealProps) {
  // console.log("props in productItem: ", props);
  const dispatch = useDispatch();
  const itemStateArray: Props[] = useSelector(
    (state: { item: { cartItems: Props[] } }) => state.item.cartItems
  );
  const shop_data_item = { ...props, qty: 1 };
  // console.log("shop-data-item in productItme is ; ", shop_data_item);

  return (
    <div className="relative" key={shop_data_item.id}>
      <div className="w-64 -z-10 group">
        <Image
          alt={shop_data_item.name}
          className="w-full"
          width={300}
          height={100}
          src={shop_data_item.imageUrl}
        />
        <div className="absolute invisible group-hover:visible -translate-x-1/2 -translate-y-1/2  bottom-10 left-1/2 transition-all duration-200 text-black bg-white/90 cursor-pointer hover:bg-black hover:text-white text-center">
          <Link
            href="#"
            className="block py-2 px-8 font-normal uppercase"
            onClick={() => {
              console.log(itemStateArray);
              return dispatch(addToCart(shop_data_item));
            }}
          >
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
