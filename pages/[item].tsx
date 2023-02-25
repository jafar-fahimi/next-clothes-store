import ProductHome from "components/product/productHome";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { PriceProps, ProductProps, titleTypes } from "utils/types";

let myPaths: any = [];
type Props = {
  prices: PriceProps[];
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { params } = context;
  // const clientStripe = new Stripe( apiKey: process.env.STRIPE_SECRET_KEY ?? "", config: {apiVersion:"2020-08-27"} );
  const clientStripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

  const { data: prices } = await clientStripe.prices.list({
    active: true, // ignore archive products!
    limit: 20,
    expand: ["data.product"],
  });
  const { prices: myPrices } = { prices };
  console.log("prices are : ", prices);

  return {
    props: {
      prices: myPrices,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  return {
    paths: myPaths,
    fallback: true,
  };
}

// export default function HatsPage({ myPrices = [] }: { myPrices: PriceProps[] }) {
const HatsPage: NextPage<Props> = ({ prices }: Props) => {
  const router = useRouter();
  // console.log("myPrices in [item] is : ", myPrices); // arr of obj each has product!

  type dataProps = { item: titleTypes };
  const item: any = router.query.item as unknown as dataProps;

  for (let p = 0; p < 30; p++) {
    myPaths.push({ params: { item: (p + 1).toString } });
  }
  console.log("prices is : ", prices);
  return <ProductHome pitem={item} data={prices} />;
};

export default HatsPage;
