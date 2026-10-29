import { Html, Head, Main, NextScript } from 'next/document';
const Document = () => (
  <Html lang="en" data-theme="dark">
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch(e){}`,
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
export default Document;
