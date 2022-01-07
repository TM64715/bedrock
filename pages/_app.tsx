/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }) {
  return (
    <>
      <div className="overflow-x-hidden font-sans">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
