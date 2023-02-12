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
      <table>
        <tr className="text-lg flex space-x-32 border-b-2 border-black/30 pb-3 mb-4">
          <td className="mr-20">Product</td>
          <td>Description</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Remove</td>
        </tr>
        {itemStateArray.map((item) => (
          <tr
            className="text-xl flex space-x-32 border-b-2 border-black/30 items-center pb-3 mb-3"
            key={item.id}
          >
            <td>
              <Image src={item.imageUrl} width={150} height={180} alt={item.name} />
            </td>
            <td className="text-2xl">{item.name}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
            <td>
              <button className="text-2xl">X</button>
            </td>
          </tr>
        ))}
      </table>
    </section>
  );
}
