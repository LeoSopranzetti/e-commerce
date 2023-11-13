import { Component } from '@angular/core';
import { ProductModel } from '../../models/product';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  productsOnPage: ProductModel[] = [];
  allProducts: ProductModel[] = [];
  allProductsPerType: ProductModel[] = [];
  isAll: boolean = true;
  isShirts: boolean = false;
  isMugs: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  numberOfButtons: number[] = [];
  showOptions: boolean = false;
  actualCategory: string = "ALL";
  filterMaior: boolean = false;
  filterMenor: boolean = false;
  filterAll: boolean = true;

  constructor(
    private publicService: PublicService ,
    private router: Router,
    private route: ActivatedRoute
    ) { }
  
  ngOnInit(): void {
    this.getAllPatients();

    this.publicService.specifSearch.subscribe((value) => {
      value.length === 0 ? this.getAllPatients() : this.setAllProductsAndSearchProducts(value);;
    });

  }

  public getAllPatients(){

    this.publicService.getAllProdutcts().pipe(
      tap((res : any ) => {
        this.setAllProductsAndSearchProducts(res);
      }),
      catchError((error)=> {
        return error
      })
    ).subscribe()

  }

  setAllProductsAndSearchProducts(res: any[]){
    this.allProducts = res;
    this.allProductsPerType = res;
    this.setCurrentPage(this.currentPage);
    this.numberOfButtons = this.pages();
  }

  public changeCategory(caterogy : string){
    this.isAll = false;
    this.isMugs = false;
    this.isShirts = false;
    this.allProductsPerType = this.allProducts;
    this.numberOfButtons = [];
    this.productsOnPage = [];
    
    if(caterogy === "ALL") {
      this.actualCategory = caterogy;
      this.allProductsPerType = this.allProducts;
      this.checkFilterLogic();
      this.isAll = true;
      this.setCurrentPage(1);
      this.numberOfButtons = this.pages();
    }
    if(caterogy === "MUGS") {
      this.actualCategory = caterogy;
      this.allProductsPerType = this.allProducts.filter(item => item.category === "mugs"); 
      this.checkFilterLogic();
      this.isMugs = true;
      this.setCurrentPage(1);
      this.numberOfButtons = this.pages();
    }

    if(caterogy === "SHIRTS") {
      this.actualCategory = caterogy;
      this.allProductsPerType = this.allProducts.filter(item => item.category === "t-shirts"); 
      this.checkFilterLogic();
      this.isShirts = true;
      this.setCurrentPage(1);
      this.numberOfButtons = this.pages();
    }
  }

  checkFilterLogic(){
    if(this.filterMenor) this.allProductsPerType.sort((a, b) => b.price - a.price);
    if(this.filterMaior) this.allProductsPerType.sort((a, b) => a.price - b.price);
    if(this.filterAll) this.allProductsPerType.sort((a, b) => a.id - b.id);
  }

  public navigateToProductDetails(product: ProductModel) {
    this.router.navigate(['product-details', product.id], { relativeTo: this.route, state: { product } });
  }

  public pages(): number[] {
    const totalPages = Math.ceil(this.allProductsPerType.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  public setCurrentPage(page: number) {
    this.currentPage = page;
    this.productsOnPage = this.paginateItems();
  }

  public paginateItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allProductsPerType.slice(startIndex, endIndex);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  filter(filter: string) {

    switch (filter) {
      case "TODOS":
        this.filterMaior = false;
        this.filterMenor = false;
        this.filterAll = true;
        this.changeCategory(this.actualCategory);
        break;

      case "MAIOR":
        this.filterMaior = true;
        this.filterMenor = false;
        this.filterAll = false;
        this.changeCategory(this.actualCategory);
        break;

      case "MENOR":
        this.filterMaior = false;
        this.filterMenor = true;
        this.filterAll = false;
        this.changeCategory(this.actualCategory);
        break;
    
      default:
        break;
    }

  }

}
