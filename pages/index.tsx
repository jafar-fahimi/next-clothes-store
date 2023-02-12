import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";

import { ItemView } from "components/redux-toolkit/app/item/itemView";
import HatsHomePage from "components/hats/hatsHomePage";

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
        <ItemView />
      </main>
    </React.Fragment>
  );
}
export default HomePage;
