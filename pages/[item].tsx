import ProductHome from "components/product/productHome";
import { useRouter } from "next/router";

export default function HatsPage() {
  const router = useRouter();
  // console.log("router is ", router.query);
  type dataProp = { item: "hats" | "jackets" | "sneakers" | "men" | "women" };
  const item: any = router.query.item as unknown as dataProp;
  // const { item }: dataProp = data;

  return <ProductHome pitem={item} />;
}
