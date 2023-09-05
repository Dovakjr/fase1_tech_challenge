export class Order {
  id: number;
  status: string;
  user_id: string;
  payment_status: string;

  constructor(status: string, user_id: string, payment_status: string) {
    this.status = status;
    this.user_id = user_id;
    this.payment_status = payment_status;
  }
}
