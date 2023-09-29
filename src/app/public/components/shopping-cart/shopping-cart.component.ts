import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  cartList: ProductModel[] = [];
  totalPrice: number = 0;
  deliveryPrice: number = 40;
  subTotalPrice: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const jsonCartList = localStorage.getItem('cartList') as string;
    this.cartList = JSON.parse(jsonCartList);
    this.calcSubtotalPrice();
  }

  public backToHome(){
    this.router.navigate(['../home']);
  }

  public calcSubtotalPrice(){
    this.cartList.forEach(element => {
      this.subTotalPrice += element.price;
    });
    this.calcTotalPice();
  }

  public calcTotalPice(){
    this.totalPrice = this.subTotalPrice + this.deliveryPrice;
  }
}
