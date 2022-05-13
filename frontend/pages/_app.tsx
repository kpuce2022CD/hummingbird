import Head from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '../styles/global-style';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>오더 캔버스</title>
      </Head>
      <GlobalStyle />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
