import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../models/product';
import { PublicService } from 'src/app/public/services/public.service';

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
    private router: Router,
    private publicService: PublicService
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
    this.publicService.setCardList(this.cartList);
    this.publicService.updateShoppingCartCountValue(this.cartList.length);
  }

}
