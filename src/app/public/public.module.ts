import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
