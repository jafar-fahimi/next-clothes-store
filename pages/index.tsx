import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";
import Catagory from "components/catagory/catagory";

function HomePage() {
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
