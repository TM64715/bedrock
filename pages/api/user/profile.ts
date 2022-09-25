/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { all } from '../../../middleware';
import UsersDAO from '../../../dao/usersDAO';

const handler = nc();

const upload = multer({ dest: '/tmp' });

handler.use(all);
const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL);
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});
handler.use(upload.single('profilePicture'));
handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    res.status(401).send('Unauthorized');
    return;
  }
  if (typeof +req.body.grade !== 'number') {
    res.status(400).send('Invalid grade');
    return;
  }
  let profilePicURL: string;
  let publicId: string;
  if (req.file) {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      publicId = image.public_id;
      profilePicURL = image.secure_url;
    } catch (e) {
      // console.error(e);
      res.json({ error: e.toString() });
      return;
    }
  }
  const { bio } = req.body;
  const grade = parseInt(req.body.grade, 10);
  if (req.user.image.publicId) {
    await cloudinary.uploader.destroy(req.user.image.publicId);
  }
  const { result, error } = await UsersDAO.updateUser(req.user._id.toHexString(), {
    ...(grade && { grade }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicURL && { image: { publicId, url: profilePicURL } }),
  });
  res.json({ result, error });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
