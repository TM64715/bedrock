import React, { useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import axios from 'axios';
import roomsDAO from '../../dao/roomsDAO';

const Room = ({ room: { url, _id } }) => {
  const iframeRef = useRef();
  const dailyRef = useRef();
  const joinedRef = useRef();
  const markArchive = (val) => {
    axios.put('/api/rooms/archive', {
      roomId: _id,
      archived: val,
    }).then((res) => {
      console.log(res);
    });
  };

  React.useEffect(() => {
    dailyRef.current = DailyIframe.wrap(iframeRef.current, {
      showLeaveButton: true,
    });
    dailyRef.current.on('left-meeting', () => {
      console.log('left-meeting');
      joinedRef.current = false;
      markArchive(true);
    });
    dailyRef.current.on('joining-meeting', () => {
      console.log('joining-meeting');
      joinedRef.current = true;
      markArchive(false);
    });
    console.log('mounted');
    return () => {
      dailyRef.current.destroy();
      console.log('unmount');
      markArchive(true);
    };
  }, []);
  React.useEffect(() => {
    (async () => {
      if (joinedRef.current) {
        // This is needed due to it never returning
        // if there wasn't a meeting joined first...
        await dailyRef.current.leave();
      }
      await dailyRef.current.join({ url });
    })();
  }, [url]);
  return (
    <iframe
      style={{ width: '100%', height: '100vh', border: 0 }}
      title="video call iframe"
      ref={iframeRef}
      allow="camera; microphone; fullscreen"
    />
  );
};

export async function getServerSideProps(context) {
  const { query: { id } } = context;
  const { error, result } = await roomsDAO.findById(id);
  if (error) {
    console.warn(error);
    return {
      props: {
        room: {
          error: error.toString(),
        },
      },
    };
  }
  return {
    props: {
      room: JSON.parse(JSON.stringify(result)),
    },
  };
}
export default Room;
