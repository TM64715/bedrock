import { ObjectId } from 'mongodb';

export default class Queue {
  constructor(
    public userId: ObjectId,
    public course: string,
    public subject: string,
    public goals: {
      accountability: boolean,
      writing: boolean,
      verbal: boolean,
      other: boolean,
    },
  ) {
    this.userId = userId;
    this.course = course;
    this.subject = subject;
    this.goals = goals;
  }
}
