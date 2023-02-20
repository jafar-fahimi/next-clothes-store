import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";

function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Jafar Ecommerce</title>
        <meta name="description" content="Nextjs Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="absolute -translate-x-6 sm:relative px-4">
        <AllCatagories />
      </main>
    </React.Fragment>
  );
}
export default HomePage;
