import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {


  @Input() product !: ProductModel;

  constructor(

  ) { }

  ngOnInit(): void {

  }



}
