import crypto from 'crypto';
const sensitiveFields = ['email', 'hash', '_id'];
export function extractUser(user) {
  if (!user) return null;
  const obj = {};
  Object.keys(user).forEach((key) => {
    if (!sensitiveFields.includes(key)) obj[key] = user[key];
  });
  return obj;
}

export function generateSignature( meetingNumber, role) {

  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(process.env.NEXT_PUBLIC_ZOOM_API_KEY + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', process.env.ZOOM_API_SECRET).update(msg).digest('base64')
  const signature = Buffer.from(`${process.env.NEXT_PUBLIC_ZOOM_API_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}