import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-neutral-50 text-neutral-900 dark:text-neutral-50 dark:bg-neutral-900 transition-colors duration-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
