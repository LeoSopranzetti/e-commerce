import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product';
import { environment } from 'src/assets/environments/environment';
import { Subject } from 'rxjs';


const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  product!: ProductModel;
  shoppingCartCount = new Subject<number>();
  cartList: ProductModel[] = [];

  getCardList(){
    return this.cartList;
  }

  setCardList(value: ProductModel[]){

    //SETA NO LOCALSTORAGE PARA TER PERSISTENCIA
    const jsonCartListString = JSON.stringify(value);
    localStorage.setItem('cartList', jsonCartListString);

    //SETA DENTRO DO SERVICE PARA JUNTO DO OBSERVABLE TER UMA ATUALIZAÇÃO DINAMICA DA QUANTIDADE DE PRODUTOS
    this.cartList = value;
  }

  updateShoppingCartCountValue(newValue: number) {
    this.shoppingCartCount.next(newValue);
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getStaticProduct(){
    return this.product;
  }

  setStaticProduct(product: ProductModel){
    this.product = product;
  }

  getProductsByName(name?: string){
    return this.httpClient.get(`${API}/products?name=${name}`)
  }

  getAllProdutcts(){
    return this.httpClient.get(`${API}/products`)
  }

  deleteProduct(productId: number){
    return this.httpClient.delete(`${API}/products/${productId}`)
  }
}
