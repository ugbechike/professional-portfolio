import { Html, Head, Main, NextScript } from 'next/document';
const Document = () => (
  <Html lang="en" data-theme="light" data-scroll-behavior="smooth">
    <Head>
      <meta name="theme-color" content="#F2EFE8" />
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('portfolio-theme')==='dark'?'dark':'light';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#F2EFE8':'#1B1D1C')}catch(e){}`,
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
