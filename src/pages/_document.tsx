import { Html, Head, Main, NextScript } from 'next/document';
const Document = () => (
  <Html lang="en" data-theme="dark" data-scroll-behavior="smooth">
    <Head>
      <meta name="theme-color" content="#1B1D1C" />
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('portfolio-theme')==='light'?'light':'dark';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#F3F2EC':'#1B1D1C')}catch(e){}`,
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
