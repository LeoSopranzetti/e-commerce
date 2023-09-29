import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product';
import { PublicService } from '../../services/public.service';

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
    private router: Router,
    private publicService: PublicService
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
    this.subTotalPrice = 0;
    this.cartList.forEach(element => {
      this.subTotalPrice += element.price;
    });
    this.calcTotalPice();
  }

  public calcTotalPice(){
    this.totalPrice = 0;
    this.totalPrice = this.subTotalPrice + this.deliveryPrice;
  }

  deleteProduct(product: any) {
    const index = this.cartList.indexOf(product);
    if (index !== -1) {
      this.cartList.splice(index, 1);
      this.calcSubtotalPrice();
      this.publicService.setCardList(this.cartList);
      this.publicService.updateShoppingCartCountValue(this.cartList.length);
    }
    
  }

}
