import { addToCart, deleteFromCart, minusFromCart } from "components/redux-toolkit/app/itemSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ItemPropsType } from "utils/types";

type selectorType = { cartItems: ItemPropsType[]; totalPrice: number };
type stateItemType = { cartItems: ItemPropsType[]; totalPrice: number; totalItems: number };
export default function Checkout() {
  const dispatch = useDispatch();
  const { cartItems: itemStateArray, totalPrice }: selectorType = useSelector(
    (state: { item: stateItemType }) => state.item
  );

  return (
    <section className="max-w-4xl mt-8 mx-auto">
      <table>
        <tr className="text-lg flex space-x-32 border-b-2 border-black/30 pb-3 mb-4">
          <td className="w-36">Product</td>
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
            <td className="w-36">
              <Image src={item.imageUrl} width={150} height={180} alt={item.name} />
            </td>
            <td className="text-2xl w-32">{item.name}</td>
            <td>{item.price}$</td>
            <td className="flex items-end">
              <button
                onClick={() => dispatch(minusFromCart(item))}
                className="font-extrabold text-2xl focus:ring-4"
              >
                &lt;
              </button>
              &nbsp;{item.qty}&nbsp;
              <button
                onClick={() => dispatch(addToCart(item))}
                className="font-extrabold text-2xl focus:ring-4"
              >
                &gt;
              </button>
            </td>
            <td>
              <button className="text-2xl" onClick={() => dispatch(deleteFromCart(item))}>
                X
              </button>
            </td>
          </tr>
        ))}
      </table>
      <div className="flex flex-col items-end">
        <span className="uppercase text-3xl">Total: {totalPrice}$</span>
        <button className="bg-blue-500 px-2 py-1 rounded-lg text-white mt-8 font-semibold">
          Pay with 💳
        </button>
      </div>
    </section>
  );
}
