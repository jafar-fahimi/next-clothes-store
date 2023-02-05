import React from "react";
import Head from "next/head";
import AllCatagories from "components/catagory/allCatagories";

import { Provider } from "react-redux"; // provider use useContext
import store from "components/redux-toolkit/app/store";
import { IcecreamView } from "components/redux-toolkit/app/icecream/IcecreamView";

function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Jafar Ecommerce</title>
        <meta name="description" content="Nextjs Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-8">
        <Provider store={store}>
          <AllCatagories />
          <IcecreamView />
        </Provider>
      </main>
    </React.Fragment>
  );
}
export default HomePage;
