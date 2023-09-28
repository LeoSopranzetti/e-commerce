import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DefaultPageComponent } from './components/default-page/default-page.component';

const routes: Routes = [
  { path: '',component: DefaultPageComponent, children:[
    { path: '',component: HomeComponent },
    { path: 'product-details/:id',component: ProductDetailsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent }
  ] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
