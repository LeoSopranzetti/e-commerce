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


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const jsonCartList = localStorage.getItem('cartList') as string;
    this.cartList = JSON.parse(jsonCartList);
  }

  public backToHome(){
    this.router.navigate(['../home']);
  }
}
