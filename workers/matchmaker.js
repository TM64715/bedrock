/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import roomsDAO from '../dao/roomsDAO';
import queueDAO from '../dao/queueDAO';

let active = false;
let iterations;
async function worker() {
  if (iterations > 50) {
    console.warn('infinite loop detected');
    process.exit(1);
  }
  const { error, result } = await queueDAO.all();
  // An error occured getting the documents so stop running the function and try again next time;
  if (error) {
    active = false;
    console.warn(error);
    return;
  } if (result.length === 0) {
    active = false;
    console.debug('Found no documents');
    return;
  }
  let pairs = [];
  result.forEach((qUser, i) => {
    // if it's even push new index
    if (i % 2 === 0) pairs.push([qUser]);
    // else update an existing index
    else {
      pairs[(pairs.length - 1) / 2][1] = qUser;
    }
  });
  pairs = pairs.filter((room) => room.length === 2);
  for (const room of pairs) {
    const { data: { url, id, name } } = await axios.post(`${process.env.VIDEO_API_URL}/rooms`, {}, {
      headers: {
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
    });
    await roomsDAO.create({
      users: [room[0].userId, room[1].userId], meetingId: id, url, name,
    });
    await queueDAO.remove(room[0].userId);

    await queueDAO.remove(room[1].userId);
  }
  return worker();
}

async function makeMatch() {
  iterations = 0;
  if (active) return 'Already running';
  active = true;
  return worker();
}

export default makeMatch;
