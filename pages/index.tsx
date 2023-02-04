import { Fragment, useState } from "react";
import Head from "next/head";
import nextLogo from "public/next.svg";
import { menu, close } from "public/assets";

function HomePage() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>Jafar Ecommerce</title>
        <meta name="description" content="Nextjs Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-600 px-8">
    
      </main>
    </Fragment>
  );
}

export default HomePage;
