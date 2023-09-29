import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { ProductModel } from '../../models/product';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  cartItemCount: number = 0;
  cartList: ProductModel[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public publicService: PublicService
  ) { }

  ngOnInit(): void {
    const jsonCartList = localStorage.getItem('cartList') as string;
    this.cartList = JSON.parse(jsonCartList);
    this.cartItemCount = this.cartList.length;
    this.publicService.shoppingCartCount.subscribe((value) => {
      this.cartItemCount = value;
    });
  }

  goToShoppingCart(){
    this.router.navigate(['shopping-cart'], {relativeTo: this.route});
  }
}
