import { Component, OnInit } from '@angular/core';
import { Product, Categories, Manufacturers } from '../models/app.product.model';
import { ProductService } from '../service/app.http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproduct-component',
  templateUrl: './app.createproduct.view.html'
})
export class CreateProductComponent implements OnInit {
  product: Product;
  status: string;
  categories = Categories;
  manufacturers = Manufacturers;
  constructor(private serv: ProductService, private router: Router) {
    this.product = new Product(0, '', '', '', '', '', 0);
  }

  ngOnInit(): void { }
  save(): void {
     this.serv.postProduct(this.product).subscribe((response) => {
        this.product = response;
        this.router.navigate(['']);
     }, (error) => {
        this.status = `Error occured ${error}`;
     });
  }
  clear(): void {
    this.product = new Product(0, '', '', '', '', '', 0);
  }
}
