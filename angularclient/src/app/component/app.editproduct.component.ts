import { Component, OnInit } from '@angular/core';
import { Product, Categories, Manufacturers } from '../models/app.product.model';
import { ProductService } from '../service/app.http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editproduct-component',
  templateUrl: './app.editproduct.view.html'
})
export class EditProductComponent implements OnInit {
  product: Product;
  status: string;
  id: number;
  categories = Categories;
  manufacturers = Manufacturers;
  constructor(private serv: ProductService, private router: Router, private act: ActivatedRoute) {
    this.product = new Product(0, '', '', '', '', '', 0);
  }

  ngOnInit(): void {
    this.act.params.subscribe((param) => {
      this.id = param.id;
    });
    this.serv.getProductById(this.id).subscribe((response) => {
        this.product = response;
        console.log(`Edit init ${JSON.stringify(response)}`);
    }, (error) => {
      this.status = `Error occured ${error}`;
    });
  }
  save(): void {
     this.serv.putProduct(this.id, this.product).subscribe((response) => {
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
