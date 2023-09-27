import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product';
import { environment } from 'src/assets/environments/environment';


const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  product!: ProductModel;

  constructor(
    private httpClient: HttpClient
  ) { }

  getStaticProduct(){
    return this.product;
  }

  setStaticProduct(patient: ProductModel){
    this.product = patient;
  }

  getProductsByName(name?: string){
    return this.httpClient.get(`${API}/patients?nick=${name}`)
  }

  getAllProdutcts(){
    return this.httpClient.get(`${API}/patients`)
  }

  deleteProduct(productId: number){
    return this.httpClient.delete(`${API}/patients/${productId}`)
  }
}
