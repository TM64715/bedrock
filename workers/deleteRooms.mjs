import axios from 'axios';

const password = '83ce0173e37e4330c6d42a5baa3a41c12fb15cc5605f8db48354a813608bd2af';
let list;
axios.get('https://api.daily.co/v1/rooms', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${password}`,
  },
}).then((e) => {
  list = e.data.data;

  list.forEach((room) => {
    axios.delete(`https://api.daily.co/v1/rooms/${room.name}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${password}`,
      },
    });
  });
});
