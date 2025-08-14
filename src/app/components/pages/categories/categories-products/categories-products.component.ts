import { NgStyle, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router} from '@angular/router';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-products',
  imports: [
    SpinerPagesComponent,
    NgStyle,
    NgClass,
  ],
  templateUrl: './categories-products.component.html',
  styleUrl: './categories-products.component.scss'
})
export class CategoriesProductsComponent implements OnInit, OnDestroy {

  #unsubscribe!: Subscription;
  #router = inject(Router);
  #categoriesServiceProducts = inject(CategoriesProductsService);
  
  public categories = signal<any>([]);
  public categoriesPagination = signal<any>([]);

  ngOnInit(): void {
    this.getCategoriesProducts();
  }


  ngOnDestroy(): void {
  this.#unsubscribe?.unsubscribe();
  }
  getCategoriesProducts(){
  this.#unsubscribe = this.#categoriesServiceProducts.getCategoriesProducts().subscribe({
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
