export class Order {
  id: number;
  status: string;
  user_id: string;

  constructor(status: string, user_id: string) {
    this.status = status;
    this.user_id = user_id;
  }
}
