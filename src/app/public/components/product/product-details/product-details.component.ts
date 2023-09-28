import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

    product!: ProductModel;
    cartList: ProductModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.product = history.state.product;
    });
  }

  public backToHome(){
    this.router.navigate(['../home']);
  }

  public goToShoppingCart(){

    if (localStorage.getItem('cartList')){
      const jsonCartList = localStorage.getItem('cartList') as string;
      this.cartList = JSON.parse(jsonCartList);
      this.setLocalStorage();
    } else {
      this.setLocalStorage();
    }

    this.router.navigate(['../../shopping-cart'], {relativeTo: this.route});
  }

  public setLocalStorage(){
    this.cartList.push(this.product);
    const jsonCartListString = JSON.stringify(this.cartList);
    localStorage.setItem('cartList', jsonCartListString);
  }

}
