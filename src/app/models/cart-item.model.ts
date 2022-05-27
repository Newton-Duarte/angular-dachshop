export class CartItem {
  constructor(
    public id: number,
    public product: string,
    public quantity: number,
    public price: number,
    public image: string
  ) { }
}
