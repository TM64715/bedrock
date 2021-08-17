import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { all } from '../../../middleware';
import UsersDAO from "../../../dao/usersDAO";

const upload = multer({ dest: '/tmp' });
const handler = nc<NextApiRequest, NextApiResponse>();

/* eslint-disable camelcase */
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

handler.use(all);

handler.get(async (req, res) => {
  // Filter out password
  if (!req.user) return res.json({ user: null });
  const { password, ...u } = req.user;
  res.json({ user: u });
});

handler.patch(upload.single('profilePicture'), async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  let profilePicture;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill',
    });
    profilePicture = { url: image.secure_url, publicId: image.public_id };
  }
  const { grade, bio } = req.body;

  const { result: user } = await UsersDAO.updateUser(req.user._id.toHexString(), {
    ...(grade && { grade }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { ...profilePicture  }),
  });

  res.json({ user: user });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;