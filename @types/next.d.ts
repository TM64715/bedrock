import { IncomingMessage } from 'http';
import { ObjectId } from 'mongodb';

interface UserDoc {
  _id: ObjectId;
  name: string,
  password: string,
  email: string,
  image?: {
      url: string
      publicId: string,
  }
  grade?: number,
  bio?: string,
}
declare module 'next' {
  export interface NextApiRequest extends IncomingMessage{
    user: UserDoc
    file?: any
  }
}