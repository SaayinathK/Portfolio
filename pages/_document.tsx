// filepath: c:\Saayinath\My Projects\portfolio_next.js\pages\_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* High-res icons for modern browsers */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Apple device icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0a2540" />
        {/* Description for SEO */}
        <meta name="description" content="Portfolio of Saayinath Kanesamoorthy" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}