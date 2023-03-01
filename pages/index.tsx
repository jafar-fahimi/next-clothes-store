import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";
import { connectDatabase, getAllData } from "utils/db-utils";
import { useRecoilState } from "recoil";
import { productState } from "atoms/productAtom";

function HomePage() {
  // here in home page we fetch products from mongodb, then put them on RecoilState
  // const fetchProductsFromMongodb = async () => {
  //   const client = await connectDatabase();
  //   const mongodbProducts = await getAllData(client, "products", { id: -1 });
  //   return mongodbProducts;
  // };
  // const data = await fetchProductsFromMongodb();
  // const [productsFromMongo, setProductsFromMongo] = useRecoilState(productState);
  // console.log("data is :", data);
  // setProductsFromMongo(data);
  // React.useEffect(() => {
  //   // fetchProductsFromMongodb().then((data) => {});
  // }, []);

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
