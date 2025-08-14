import { NgStyle, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IndirectCostService } from '@services/cost/indirectCost/indirect-cost.service';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-indirect-costs',
  imports: [
    SpinerPagesComponent,
    NgStyle,
    NgClass,
  ],
  templateUrl: './categories-indirect-costs.component.html',
  styleUrl: './categories-indirect-costs.component.scss'
})
export class CategoriesIndirectCostsComponent implements OnInit, OnDestroy {

    #unsubscribe!: Subscription;
    #router = inject(Router);
    #categoriesServiceProducts = inject(CategoriesProductsService);
    #categoriesIndirects = inject(IndirectCostService);
    
    public categories = signal<any>([]);
    public categoriesPagination = signal<any>([]);
  
    ngOnInit(): void {
      this.getCategoriesProducts();
    }
  
  
    ngOnDestroy(): void {
    this.#unsubscribe?.unsubscribe();
    }
    getCategoriesProducts(){
    this.#unsubscribe = this.#categoriesIndirects.getIndirectCosts().subscribe({
      next: (response) => {
        this.categories.set(response.data.data);
        this.categoriesPagination.set(response);
        console.log(this.categories());
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
  
    pagination(url: string) {
      this.#unsubscribe = this.#categoriesServiceProducts.getPaginator(url).subscribe({
        next: (response) => {
          this.categories.set(response.data.data);
          this.categoriesPagination.set(response);
          console.log(this.categories());
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

}
