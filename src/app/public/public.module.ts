import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NavComponent } from './components/nav/nav.component';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { ProductCartComponent } from './components/product/product-cart/product-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductCardComponent,
    HomeComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    NavComponent,
    DefaultPageComponent,
    ProductCartComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    NavComponent
  ]
})
export class PublicModule { }
