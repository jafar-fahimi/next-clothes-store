import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import store from "components/redux-toolkit/app/store";
import { RecoilRoot } from "recoil";

type Props = {
  Component: any;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  return (
    <Provider store={store}>
      <Layout>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </Layout>
    </Provider>
  );
}

export default MyApp;
