import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty?: number;
};

export default function Checkout() {
  const dispatch = useDispatch();
  const itemStateArray: Props[] = useSelector(
    (state: { item: { cartItems: Props[] } }) => state.item.cartItems
  );

  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex justify-between my-4 text-lg">
        <span>Product</span>
        <span>Description</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Remove</span>
      </div>
      <hr />
      {itemStateArray.map((item) => (
        <div className="flex justify-between my-4 items-center text-xl" key={item.id}>
          <Image src={item.imageUrl} width={150} height={180} alt={item.name} />
          <span>{item.name}</span>
          <span>{item.price}</span>
          <span>{item.qty}</span>
          <button className="text-2xl">X</button>
        </div>
      ))}
    </section>
  );
}
