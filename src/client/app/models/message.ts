export default class Message {
  constructor(private userId: number, private text: string) {
    this.userId = userId;
    this.text = text;
  }
}
  