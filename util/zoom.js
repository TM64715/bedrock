import axios from 'axios';
import ZoomDAO from '../dao/zoomDAO';

export async function updateAccessToken(id, refreshToken) {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  try {
  const {data: {access_token: accessToken, refresh_token, expires_in: expiresIn, }} = await axios.post('https://zoom.us/oauth/token', params, {
    auth: {
      username: process.env.ZOOM_CLIENT_SECRET,
      password: process.env.ZOOM_CLIENT_ID
    }
  })
  await ZoomDAO.updateTokens({userId: id, accessToken, refreshToken: refresh_token});
  setTimeout(() => {
    updateAccessToken(id, refreshToken)
    return accessToken;
  }, expiresIn * 1000)
} catch (e) {
  console.warn(e.stack);
  console.warn(e.toString());
  return e;
}

};  
