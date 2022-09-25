import { ObjectId } from 'mongodb';

export default class Room {
  constructor(
    public users: ObjectId[],
    public meetingId: string,
    public url: string,
    public name: string,
    public archived: 0 | 1 | 2,
    public id?: ObjectId,
  ) {
    this.users = users;
    this.meetingId = meetingId;
    this.url = url;
    this.name = name;
    this.archived = archived;
    this.id = id;
  }
}
