import ProductHome from "components/product/productHome";
import { NextPageContext } from "next";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { PriceProps, ProductProps } from "utils/types";

export default function HatsPage({ myPrices }: { myPrices: PriceProps[] }) {
  const router = useRouter();
  console.log("prices is : ", myPrices); // arr of obj each has product!

  // console.log("[item] prices is ", prices);
  // console.log(
  //   "[item] prices product are: ",
  //   prices.map((p) => p.product)
  // );

  type dataProp = { item: "hats" | "jackets" | "sneakers" | "men" | "women" };
  const item: any = router.query.item as unknown as dataProp;
  // const { item }: dataProp = data;

  return <ProductHome pitem={item} data={myPrices} />;
}

// export async function getServerSideProps() {
//   const clientStripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});
//   const clientStripedata = await clientStripe;

//   console.log("clientStipeData: ", clientStripedata);

//   const { data: prices } = await clientStripe.prices.list({
//     active: true,
//     expand: ["data.product"],
//   });
//   return {
//     props: {
//       prices,
//     },
//   };
// }

export async function getStaticProps(context: any) {
  const { params } = context;
  console.log(`Generating page for /products/${params.item}`);

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
    paths: [{ params: { item: "1" } }],
    fallback: true,
  };
}
