import { ObjectId } from 'mongodb';

export default class Queue {
  constructor(
    public userId: ObjectId,
    public course: string,
    public subject: string,
    public reason: string,
    public embedding: number[],
    public _id?: ObjectId,
  ) {
    this.userId = userId;
    this.course = course;
    this.subject = subject;
    this.reason = reason;
    this.embedding = embedding;
  }
}
