import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        /> */}
        {/* <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta> */}
        <link rel="icon" type="image/png" sizes="16x16" href="/pink_logo.png" />
        <title>피치피커</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
