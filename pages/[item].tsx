import ProductHome from "components/product/productHome";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { PriceProps, ProductProps } from "utils/types";

let myPaths: any = [];

export default function HatsPage({ myPrices = [] }: { myPrices: PriceProps[] }) {
  const router = useRouter();
  // console.log("myPrices in [item] is : ", myPrices); // arr of obj each has product!

  type dataProp = { item: "hats" | "jackets" | "sneakers" | "men" | "women" };
  const item: any = router.query.item as unknown as dataProp;

  for (let p = 0; p < 30; p++) {
    myPaths.push({ params: { item: (p + 1).toString } });
  }

  return <ProductHome pitem={item} data={myPrices} />;
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const clientStripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

  // const clientStripedata = await clientStripe;
  // console.log("clientStipeData: ", clientStripedata);

  const { data: prices } = await clientStripe.prices.list({
    active: true,
    expand: ["data.product"],
  });
  const { prices: myPrices } = { prices };

  return {
    props: {
      myPrices,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: myPaths,
    fallback: true,
  };
}
