import ProductHome from "components/product/productHome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import products from "utils/products";
import { PriceProps, ProductProps, titleTypes } from "utils/types";
 
type Props = {
  prices: PriceProps[];
};
const HatsPage: NextPage<Props> = () => {
  const router = useRouter();

  type dataProps = { item: titleTypes };
  const item: any = router.query.item as unknown as dataProps;
  
  return <ProductHome pitem={item} data={products} />;
};

export default HatsPage;
