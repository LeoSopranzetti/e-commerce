import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  goToShoppingCart(){
    this.router.navigate(['shopping-cart'], {relativeTo: this.route});
  }
}
