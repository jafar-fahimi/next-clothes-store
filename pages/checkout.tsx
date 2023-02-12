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
      <div className="flex justify-between my-4">
        <span>Product</span>
        <span>Description</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Remove</span>
      </div>
      <hr />
      {itemStateArray.map((item) => (
        <div className="flex justify-between my-4" key={item.id}>
          <span>{item.name}</span>
          <span>{item.name}</span>
          <span>{item.price}</span>
          <span>{item.qty}</span>
          <span>Remove</span>
        </div>
      ))}
    </section>
  );
}
