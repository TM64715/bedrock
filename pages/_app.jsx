/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div className="overflow-x-hidden font-sans">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
