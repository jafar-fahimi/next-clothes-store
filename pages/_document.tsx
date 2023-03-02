import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="absolute top-0 left-1/2 w-screen overflow-x-auto md:overflow-x-hidden -translate-x-1/2">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="store"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
