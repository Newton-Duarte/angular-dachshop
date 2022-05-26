import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  public cart = new Cart();

  constructor() { }

  ngOnInit(): void {
    this.loadCart();
  }

  public total() {
    return this.cart.items.reduce((total, item) => {
      total += ((item.price / 100) * item.quantity);

      return total;
    }, 0);
  }

  public loadCart() {
    this.cart = CartUtil.get();
  }

  public removeItem(item: CartItem) {
    const index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }

}
