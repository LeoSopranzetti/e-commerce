import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { ProductModel } from '../../models/product';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  cartItemCount: number = 0;
  cartList: ProductModel[] = [];
  searchForm!: FormGroup;
  searchResults: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public publicService: PublicService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formBuild();
    this.setupSearch();

    const jsonCartList = localStorage.getItem('cartList') as string;
    this.cartList = JSON.parse(jsonCartList);
    this.cartItemCount = this.cartList.length;
    this.publicService.shoppingCartCount.subscribe((value) => {
      this.cartItemCount = value;
    });
  }

  setupSearch() {

    const searchInputControl = this.searchForm.get('searchInput');

    if (searchInputControl) {
      searchInputControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((query: string) => this.searchApi(query))
      )
      .subscribe((results: any[]) => {
        this.searchResults = results;
      });
    }
  }

  formBuild(){
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
  }

  searchApi(query: string) {
    console.log(query);
    return [];
  }

  goToShoppingCart(){
    this.router.navigate(['shopping-cart'], {relativeTo: this.route});
  }
}
