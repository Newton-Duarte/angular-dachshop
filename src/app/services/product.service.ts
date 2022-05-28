import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    {
      id: 1,
      title: "Shampoo Pelos Macios",
      price: 599,
      image: "https://picsum.photos/200"
    },
    {
      id: 2,
      title: "Cortador de Unhas Grande",
      price: 599,
      image: "https://picsum.photos/199"
    },
    {
      id: 3,
      title: "Mordedor Pet",
      price: 1090,
      image: "https://picsum.photos/198"
    },
    {
      id: 4,
      title: "Shampoo Para Gatos",
      price: 1419,
      image: "https://picsum.photos/197"
    },
    {
      id: 5,
      title: "Caixa de Transporte Pet",
      price: 7490,
      image: "https://picsum.photos/196"
    },
    {
      id: 6,
      title: "Comedouro Gatos 300ml",
      price: 1790,
      image: "https://picsum.photos/195"
    }
  ]

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      setTimeout(() => observer.next(this.products), 400);
    });
  }
}
