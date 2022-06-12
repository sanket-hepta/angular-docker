import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  productRef = new FormGroup({
    pid: new FormControl(),
    pname: new FormControl(),
    price: new FormControl(),
    image_url: new FormControl()
  });

  productUpdateRef = new FormGroup({
    pid: new FormControl(),
    pname: new FormControl(),
    price: new FormControl(),
    image_url: new FormControl()
  });

  products: Array<Product> = [];
  status: boolean;
  message: string = '';
  flag: boolean = false;
  priceFlag: boolean = false;
  product: any = '';
  priceProduct: any = '';

  pid: number = 0;
  price: number = 0;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.productService.loadProuctDetails().subscribe(
      data => this.products = data,
      error => console.log(error),
      () => {
        console.log("completed");
      }
    );
  }

  saveProduct(){
    let product = this.productRef.value;
    this.productService.storeProduct(product).subscribe(
      (data) => { 
        this.status = data.status;
        this.message = data.message;
        console.log(data);
      },
      error => console.log(error),
      () => {
        if(this.status){
          this.loadProduct();
          this.productRef.reset();
        }
      }
    );
  }

  deleteProduct(pid: number){
    this.productService.deleteProduct(pid).subscribe(
      (data) => { 
        this.status = data.status;
        this.message = data.message;
      },
      error => console.log(error),
      () => {
        if(this.status){
          this.loadProduct();
        }
      }
    );
  }

  updateProduct(product: Product){
    this.flag = true;
    this.product = product;
  }

  updateProductPrice(product: Product){
    this.priceFlag = true;
    this.priceProduct = product;
  }

  updateProductDetails(){
    let product = this.productUpdateRef.value;
    this.productService.updateProduct(product).subscribe(
      (data) => { 
        this.status = data.status;
        this.message = data.message;
      },
      error => console.log(error),
      () => {
        if(this.status){
          this.loadProduct();
          this.productUpdateRef.reset();
          this.flag = false;
          this.product = '';
        }
      }
    );
  }

  updateProductPriceDetails(){
    let product = { pid: this.priceProduct.pid, price: this.priceProduct.price };
    this.productService.updateProductPrice(product).subscribe(
      (data) => { 
        this.status = data.status;
        this.message = data.message;
      },
      error => console.log(error),
      () => {
        if(this.status){
          this.loadProduct();
          this.priceFlag = false;
          this.priceProduct = '';
        }
      }
    );
  }
}
