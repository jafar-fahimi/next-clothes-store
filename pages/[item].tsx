import { productState } from "atoms/productAtom";
import ProductHome from "components/product/productHome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import products from "utils/products";
import { PriceProps, titleTypes } from "utils/types";
import { useRecoilValue } from "recoil";

type Props = {
  prices: PriceProps[];
};
const HatsPage: NextPage<Props> = () => {
  const router = useRouter();

  type dataProps = { item: titleTypes };
  const item: any = router.query.item as unknown as dataProps;
  const mongoDbProducts = useRecoilValue(productState);
  // console.log("mongodb products", mongoDbProducts);
  return <ProductHome pitem={item} data={mongoDbProducts || []} />;
};

export default HatsPage;
