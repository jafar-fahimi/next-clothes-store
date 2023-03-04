import { productState } from "atoms/productAtom";
import ProductHome from "components/product/productHome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PriceProps, titleTypes } from "utils/types";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { userAtom } from "atoms/userAtom";

type Props = {
  prices: PriceProps[];
};
const HatsPage: NextPage<Props> = () => {
  const router = useRouter();

  const userDetails = useRecoilValue(userAtom);
  useEffect(() => {
    if (userDetails.uid === "") router.push("/signin");
  }, []);

  type dataProps = { item: titleTypes };
  const item: any = router.query.item as unknown as dataProps;
  const mongoDbProducts = useRecoilValue(productState);
  return <ProductHome pitem={item} data={mongoDbProducts || []} />;
};

export default HatsPage;
