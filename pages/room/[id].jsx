import React, { useEffect } from 'react';
import { generateSignature } from '../../lib/api-helpers';
import { all } from '../../middleware';
import roomsDAO from '../../dao/roomsDAO';

const Room = ({
  meetingId, signature, name, email, room,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_ZOOM_API_KEY;
  const meetingNumber = meetingId;
  const leaveUrl = '../dashboard';
  const userName = name;
  const userEmail = email;
  const passWord = room.password;
  useEffect(() => {
    const abortController = new AbortController();

    import('@zoomus/websdk').then((module) => {
      const { ZoomMtg } = module;
      ZoomMtg.setZoomJSLib(`http://${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/node_modules/@zoomus/websdk/dist/lib`, '/av');
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
      ZoomMtg.init({
        leaveUrl,
        isSupportAV: true,
        success: (success) => {
          console.log(success);

          ZoomMtg.join({
            signature,
            meetingNumber,
            userName,
            apiKey,
            userEmail,
            passWord,
            success: (success2) => {
              console.log(success2);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
    return () => { abortController.abort(); };
  });

  return (
    <>
    </>
  );
};

export async function getServerSideProps(ctx) {
  await all.run(ctx.req, ctx.res);
  const { id: roomId, meetingId } = ctx.query;
  const { name } = ctx.req.user;
  const { result: room } = await roomsDAO.findById(roomId);
  return {
    props: {
      meetingId,
      roomId,
      room: JSON.parse(JSON.stringify(room)),
      signature: generateSignature(meetingId, 1),
      name,
      // TODO unhardcode email
      email: 'tage.mehta@gmail.com',
    },
  };
}

export default Room;
