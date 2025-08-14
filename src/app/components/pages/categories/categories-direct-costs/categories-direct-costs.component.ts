import { NgStyle, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-categories-direct-costs',
  imports: [
    SpinerPagesComponent,
    NgStyle,
    NgClass,
  ],
  templateUrl: './categories-direct-costs.component.html',
  styleUrl: './categories-direct-costs.component.scss'
})
export class CategoriesDirectCostsComponent implements OnInit, OnDestroy {

  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  #unsubscribe!: Subscription;
    #router = inject(Router);
    #categoriesService = inject(DirectCostService);
    #categoriesServiceProducts = inject(CategoriesProductsService);
    
    public categories = signal<any>([]);
    public categoriesPagination = signal<any>([]);
  
    ngOnInit(): void {
      this.getCategoriesProducts();
      this.searchInputCategories();
    }
  
  
    ngOnDestroy(): void {
    this.#unsubscribe?.unsubscribe();
    }
    getCategoriesProducts(){
    this.#unsubscribe = this.#categoriesService.getCategoriesDirectCosts().subscribe({
      next: (response) => {
        this.categories.set(response.data.data);
        this.categoriesPagination.set(response);
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
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  searchInputCategories(): void {
      this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input').pipe(
          debounceTime(500), // Espera 500 ms después de la última entrada
          distinctUntilChanged(), // Evita búsquedas redundantes
          switchMap((event: any) => {
            //creamos la constante term que almacena el valor del input
            const term = event.target.value;
            if(term === ''){
              //si el input esta vacio llamamos a la funcion getDetailMaintenance
              return this.#categoriesService.getCategoriesDirectCosts();
            }
            //retornamos el servicio de busqueda
            return this.#categoriesService.searchCategoriesDirectCosts(term);
          })
        ).subscribe({
          next:(response:any) => {
          this.categories.set(response.data.data); // Establece la lista actualizada en la señal 'categories'
          this.categoriesPagination.set(response); // Mantén la paginación sin cambios
            },
          error:(error:any) => {
            console.log(error);
          }
        });
  }

}
