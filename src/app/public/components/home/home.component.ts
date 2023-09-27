import { Component } from '@angular/core';
import { ProductModel } from '../../models/product';
import { catchError, tap } from 'rxjs';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: ProductModel[] = [];
  allProducts: ProductModel[] = [];
  isAll: boolean = true;
  isShirts: boolean = false;
  isMugs: boolean = false;

  constructor(
    private publicService: PublicService ,
    ) { }
  
    ngOnInit(): void {
      this.getAllPatients();
    }

    public getAllPatients(){

      this.publicService.getAllProdutcts().pipe(
        tap((res : any ) => {
          this.products = res;
          this.allProducts = res;
        }),
        catchError((error)=> {
          return error
        })
      ).subscribe()
  
    }

    public changeCategory(caterogy : string){
      this.products = [];
      this.isAll = false;
      this.isMugs = false;
      this.isShirts = false;
      
      if(caterogy === "ALL") {
        this.products = this.allProducts; 
        this.isAll = true;
      }
      if(caterogy === "MUGS") {
        this.products = this.allProducts.filter(item => item.category === "mugs"); 
        this.isMugs = true;
      }

      if(caterogy === "SHIRTS") {
        this.products = this.allProducts.filter(item => item.category === "t-shirts"); 
        this.isShirts = true;
      }
    }
  

}
