import { Component, OnInit } from '@angular/core';
import { Product } from '../models/app.product.model';
import { ProductService } from '../service/app.http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listproducts-component',
  templateUrl: './app.listproduct.view.html'
})
export class ListProductsComponent implements OnInit {
  products: Array<Product>;
  status: string;
  product: Product;
  headers: Array<string>;
  constructor(private serv: ProductService, private router: Router) {
    this.products = new Array<Product>();
    this.product = new Product(0, '', '', '', '', '',  0);
    this.headers = new Array<string>();
  }

  ngOnInit(): void {
    for (let p in this.product) {
        this.headers.push(p);
    }
    this.loadData();
  }

  private loadData(): void {
    this.serv.getProducts().subscribe((response) => {
      this.products = response;
      // console.log(JSON.stringify(response));
    }, (error) => {
       this.status = `Error occured ${error}`;
    });
  }

  edit(id: number): void {
    this.router.navigate(['edit', id]);
  }

  delete(id: number): void {
    this.serv.deleteProduct(id).subscribe((response) => {
      this.status = response;
    }, (error) => {
       this.status = `Error occured ${error}`;
    });
  }
}
