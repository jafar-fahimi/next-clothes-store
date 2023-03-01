import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";
import { connectDatabase, getAllData } from "utils/db-utils";
import { useRecoilState } from "recoil";
import { productState } from "atoms/productAtom";

function HomePage({ res }: { res: { _id: number; document: [] }[] }) {
  const [products, setProducts] = useRecoilState(productState);
  setProducts(res[0].document);

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
export async function getStaticProps() {
  // next-js-typeerror-failed-to-parse-url-from-api-projects // when fetching localhost
  let client;
  try {
    client = await connectDatabase();
  } catch (error: any) {
    console.log("error is ", error.message.response);
  }

  let res;
  try {
    res = await getAllData(client, "products", { _id: -1 });
  } catch (error: any) {
    console.log("error is ", error.message.response);
  }

  return {
    props: { res },
  };
}
