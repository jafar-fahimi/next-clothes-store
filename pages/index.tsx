import { Fragment, useState } from "react";
import AllCatagories from "components/catagory/allCatagories";
import Head from "next/head";
function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Jafar Ecommerce</title>
        <meta name="description" content="Nextjs Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-8">
        <section>
          <AllCatagories />
        </section>
      </main>
    </Fragment>
  );
}

export default HomePage;
