import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="16x16" href="/pink_logo.png" />
        <title>피치피커</title>
        <script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
