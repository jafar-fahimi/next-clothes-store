import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="top-0 left-0 w-full -translate-x-1/2">
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
