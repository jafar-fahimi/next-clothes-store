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
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
