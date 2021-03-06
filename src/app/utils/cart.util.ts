import { CartItem } from "../models/cart-item.model";
import { Cart } from "../models/cart.model";

const LOCAL_STORAGE_DACHSHOP_CART = 'dachshop.cart';

export class CartUtil {
  public static get(): Cart {
    const data = localStorage.getItem(LOCAL_STORAGE_DACHSHOP_CART);

    if (!data) {
      return new Cart();
    }

    return JSON.parse(data);
  }

  public static add(id: number, product: string, quantity: number, price: number, image: string) {
    const cart = this.get();

    const item = new CartItem(id, product, quantity, price, image);

    cart.items.push(item);

    localStorage.setItem(LOCAL_STORAGE_DACHSHOP_CART, JSON.stringify(cart));
  }

  public static update(cart: Cart) {
    localStorage.setItem(LOCAL_STORAGE_DACHSHOP_CART, JSON.stringify(cart));
  }

  public static clear() {
    localStorage.removeItem(LOCAL_STORAGE_DACHSHOP_CART);
  }

  public static getProductsQuantity() {
    const cart = this.get();

    return cart.items.reduce((total, item) => total += item.quantity, 0);
  }
}
