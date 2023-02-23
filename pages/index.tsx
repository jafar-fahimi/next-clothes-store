import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";
import Stripe from "stripe";
import Catagory from "components/catagory/catagory";
import { StaticImageData } from "next/image";

// type ProductProps = {
//   active: boolean;
//   attributes: [];
//   created: number;
//   default_price: string;
//   description: string;
//   id: string;
//   images: string[] | StaticImageData[];
//   livemode: boolean;
//   metadata: {};
//   name: string;
//   object: string;
//   package_dimensions: null | string;
//   shippable: null | string;
//   statement_descriptor: null | string;
//   tax_code: null | string | number;
//   type: string;
//   unit_label: null | string | number;
//   updated: number;
//   url: null | string;
// };
// type PriceProps = {
//   active: boolean;
//   billing_scheme: string;
//   created: 1676975438;
//   currency: string;
//   custom_unit_amount: null | string;
//   id: string;
//   livemode: false;
//   lookup_key: null;
//   metadata: {};
//   nickname: null | string;
//   object: string;
//   product: ProductProps;
//   recurring: null;
//   tax_behavior: string;
//   tiers_mode: null | string;
//   transform_quantity: null | string;
//   type: string;
//   unit_amount: number;
//   unit_amount_decimal: string;
// };

function HomePage() {
  // const productsArray = prices.map((price: PriceProps) => price.product);
  // console.log("product2: ", productsArray);

  return (
    <React.Fragment>
      <Head>
        <title>Jafar Ecommerce</title>
        <meta name="description" content="Nextjs Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full">
        <AllCatagories />
      </section>
    </React.Fragment>
  );
}
export default HomePage;

// export async function getServerSideProps() {
//   const clientStripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});
//   const clientStripedata = await clientStripe;

//   console.log(clientStripedata, "clientStipeData");

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
