import { Component } from '@angular/core';
import { ProductModel } from '../../models/product';
import { catchError, tap } from 'rxjs';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  pagination: boolean = true;


  constructor(
    private publicService: PublicService ,
    private router: Router,
    private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.getAllPatients();
    }

    public getAllPatients(){

      this.publicService.getAllProdutcts().pipe(
        tap((res : any ) => {
          this.products = res;
          this.allProducts = res;
          this.setCurrentPage(this.currentPage);
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
        this.pagination = true;
        this.setCurrentPage(1);
      }
      if(caterogy === "MUGS") {
        this.products = this.allProducts.filter(item => item.category === "mugs"); 
        this.isMugs = true;
        this.pagination = false;
      }

      if(caterogy === "SHIRTS") {
        this.products = this.allProducts.filter(item => item.category === "t-shirts"); 
        this.isShirts = true;
        this.pagination = false;
      }
    }

    public navigateToProductDetails(product: ProductModel) {
      this.router.navigate(['product-details', product.id], { relativeTo: this.route, state: { product } });
    }

    public pages(): number[] {
      const totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    public setCurrentPage(page: number) {
      this.currentPage = page;
      this.products = this.paginateItems();
    }

    public paginateItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.allProducts.slice(startIndex, endIndex);
    }
  

}
