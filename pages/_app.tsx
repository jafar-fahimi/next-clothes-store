import React from "react";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import store from "store";

type Props = {
  Component: any;
  pageProps: any;
};

const MyApp = ({ Component, pageProps }: Props) => {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </Provider>
  );
};

export default MyApp;
