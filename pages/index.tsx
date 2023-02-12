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
      <main className="px-8">
        <AllCatagories />
      </main>
    </React.Fragment>
  );
}
export default HomePage;
