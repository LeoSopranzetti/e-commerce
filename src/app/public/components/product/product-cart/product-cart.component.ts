import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/public/models/product';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent {

  @Input() product !: ProductModel;
  @Output() updateTotalPrice = new EventEmitter<boolean>();
  @Output() deleteProductEvent = new EventEmitter<void>();
  selectedValue: any;
  options: number[] = [1,2,3,4,5];
  originalPrice: number = 0;

  ngOnInit(): void {
    this.selectedValue = 1;
    this.originalPrice = this.product.price;
  }

  public onChange(newValue: any| null){
    
    if (newValue !== null) {
      this.selectedValue = newValue.target.value;
      this.product.price = this.originalPrice * this.selectedValue;
      this.updateTotalPrice.emit(true);
    }

  }

  public deleteProduct(){
    this.deleteProductEvent.emit();
  }
}
