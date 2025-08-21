import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-products-create',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './categories-products-create.component.html',
  styleUrl: './categories-products-create.component.scss'
})
export class CategoriesProductsCreateComponent implements OnInit, OnDestroy {

  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);
  #productServiceCategories = inject(CategoriesProductsService);
  #router = inject(Router);
  
  public formbuilder = inject(FormBuilder);
  public categoriesProductsFormNew: any = new FormGroup({});

  ngOnInit(): void {
    this.formCategoriesProductNew();
  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();

    }
  }

    public formCategoriesProductNew(){
      this.categoriesProductsFormNew = this.formbuilder.group({
        name: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100)])],
        description: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(255)])],
      });
    }

  get name() { return this.categoriesProductsFormNew.get('name'); }
  get description() { return this.categoriesProductsFormNew.get('description'); }

  newCategory():void {
    if (this.categoriesProductsFormNew.valid) {
      if(this.#cookiesService.check('token')){
        const data = new FormData();
        // Agrega todos los campos del formulario
        Object.keys(this.categoriesProductsFormNew.value).forEach(key => {
          data.append(key, this.categoriesProductsFormNew.get(key)?.value);
        });

        this.#unsubscribe = this.#productServiceCategories.postNewCategory(data).subscribe({
          next: (response) => {
            this.#alertService.showAlert('success', response.message);
            this.categoriesProductsFormNew.reset();
            this.#router.navigate(['home/categorias/categorias-productos']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }else{
        this.#alertService.showAlert('error', 'Inicie sesión nuevamente');
      }
    }else{
      this.#alertService.showAlert('error', 'Por favor, complete todos los campos correctamente.');
    }
  }

  back() {
    this.#router.navigate(['#/home/categorias/categorias-productos']);
    
  }

}
