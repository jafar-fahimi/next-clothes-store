import React, { useEffect } from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";
import { connectDatabase, getAllData } from "utils/db-utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState } from "atoms/productAtom";
import { useDispatch } from "react-redux";
import { setAllData } from "components/redux-toolkit/app/itemSlice";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { userAtom } from "atoms/userAtom";
import { MongoClient } from "mongodb";

type Props = {
  res: { _id: number; document: [] }[];
};
const HomePage: NextPage<Props> = ({ res }) => {
  const router = useRouter(); // if user is not signed-in go to signin page
  const userDetails = useRecoilValue(userAtom);
  useEffect(() => {
    if (userDetails.uid === "") router.push("/signin");
  }, []);

  const [products, setProducts] = useRecoilState(productState);
  setProducts(res[0].document);
  // by setAllData; define state.allExistingCarts!
  const dispatch = useDispatch();
  dispatch(setAllData(products));
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
  let client;
  try {
    client = await connectDatabase();
  } catch (error: any) {
    console.log("error is ", error.message.response);
  }

  let res;
  try {
    res = await getAllData(client as MongoClient, "products", { _id: -1 });
  } catch (error: any) {
    console.log("error is ", error.message.response);
  }

  return {
    props: { res },
    revalidate: 1,
  };
};
