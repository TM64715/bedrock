import Head from 'next/head';

function ZoomWrapper({children}) {
  return(
    <>
    <Head>
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.9.5/css/bootstrap.css" />
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.9.5/css/react-select.css" />
    </Head>
    <script src="https://source.zoom.us/1.9.6/lib/vendor/react.min.js"></script>
    <script src="https://source.zoom.us/1.9.6/lib/vendor/react-dom.min.js"></script>
    <script src="https://source.zoom.us/1.9.6/lib/vendor/redux.min.js"></script>
    <script src="https://source.zoom.us/1.9.6/lib/vendor/redux-thunk.min.js"></script>
    <script src="https://source.zoom.us/1.9.6/lib/vendor/lodash.min.js"></script>
    <script src="https://source.zoom.us/zoom-meeting-1.9.6.min.js"></script>
    {children}
    </>
  )
}

export default ZoomWrapper;