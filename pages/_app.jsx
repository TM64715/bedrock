/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      </Head>
      <div className="overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
