import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/public/models/product';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent {

  @Input() product !: ProductModel;

}
