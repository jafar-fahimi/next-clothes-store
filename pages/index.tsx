import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";
import { connectDatabase, getAllData } from "utils/db-utils";
import { useRecoilState } from "recoil";
import { productState } from "atoms/productAtom";
import { useDispatch } from "react-redux";
import { setAllData } from "components/redux-toolkit/app/itemSlice";
import { GetStaticProps, NextPage } from "next";
import { MongoClient } from "mongodb";

type Props = {
  res: { _id: number; document: [] }[];
  err: string | null;
};
const HomePage: NextPage<Props> = ({ res, err = null }) => {
  const [products, setProducts] = useRecoilState(productState);
  setProducts(res[0].document);
  // by setAllData; define state.allExistingCarts!
  const dispatch = useDispatch();
  dispatch(setAllData(products));

  if (err) return <h2 className="text-center text-3xl">{err}</h2>;

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
};
export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  // next-js-typeerror-failed-to-parse-url-from-api-projects // when fetching localhost
  // You should not call an internal API route inside getStatic*. Instead, you can safely use your API logic directly in getStaticProps/getStaticPaths.
  // API routes are not available during build-time, as the server has not been started at that point.
  // when fetching from mongodb: error:Failed to parse URL from /api/mongodb is because u must use absolute path for getStaticProps api calling
  let err = null; // undefined can't be serialized as json use null or omit!

  let client;
  try {
    client = await connectDatabase(process.env.MONGODB_URI_STRING as string);
  } catch (error: any) {
    console.log("Failed in Connecting Database! ", error.message);
    err = "Failed in Connecting Database! " + error.message;
  }

  let res;
  try {
    res = await getAllData(client as MongoClient, "products", { _id: -1 });
  } catch (error: any) {
    console.log("Failed in Fetching Data! ", error.message);
    err = "Failed in Fetching Data! " + error.message;
  }

  return {
    props: { res, err },
    revalidate: 1,
  };
};
