import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { IndirectCostService } from '@services/cost/indirectCost/indirect-cost.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-indirect-cost-modify',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './categories-indirect-cost-modify.component.html',
  styleUrl: './categories-indirect-cost-modify.component.scss'
})
export class CategoriesIndirectCostModifyComponent implements OnInit, OnDestroy {

  #unsubscribe!: Subscription;
    #alertService = inject(AlertsService);
    #cookiesService = inject(CookieService);
    #serviceCategoriesIndirectCosts = inject(IndirectCostService);
    #router = inject(Router);
    #routeId = inject(ActivatedRoute);
  
    public saleId = signal<any>(0);
    public success = signal<string>('');
  
    public formbuilder = inject(FormBuilder);
    public categoriesProductsFormNew: any = new FormGroup({});
  
    ngOnInit(): void {
      this.formCategoriesProductNew();
      this.getCategoryProduct();
    }
  
    ngOnDestroy(): void {
      if(this.#unsubscribe){
        this.#unsubscribe.unsubscribe();
      }
    }
    public idSale(){
      this.saleId.set(
        Number(this.#routeId.snapshot.queryParams['id'])
      );
    }
    
  
    public formCategoriesProductNew(){
      this.categoriesProductsFormNew = this.formbuilder.group({
        name: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100)])],
        description: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(255)])],
      });
    }
  
    get name() { return this.categoriesProductsFormNew.get('name'); }
    get description() { return this.categoriesProductsFormNew.get('description'); }
  
    public getCategoryProduct(): void {
      this.idSale()
      this.#unsubscribe = this.#serviceCategoriesIndirectCosts.getIndirectCost(this.saleId()).subscribe({
        next: (response) => {
          this.success.set(response.response);
          this.categoriesProductsFormNew.setValue({
            name: response.data.name,
            description: response.data.description,
          });
          console.log(response.data);
        },
        error: (error) => {
          console.log(error);
          this.#alertService.showAlert('error', 'Comuniquese con el administrador');
        }
      });
    }
  
    public modifyCategory():void {
      if (this.categoriesProductsFormNew.valid) {
        if(this.#cookiesService.check('token')){
          const data = new FormData();
          data.append('_method','PUT');
          // Agrega todos los campos del formulario
        Object.keys(this.categoriesProductsFormNew.value).forEach(key => {
        data.append(key, this.categoriesProductsFormNew.get(key)?.value);
      });
          this.#unsubscribe = this.#serviceCategoriesIndirectCosts.modifyIndirectCost(this.saleId(), data).subscribe({
            next: (response) => {
              this.#alertService.showAlert('success', response.message);
              this.categoriesProductsFormNew.reset();
              this.#router.navigate(['home/categorias/categorias-costos-indirectos']);
            },
            error: (error) => {
              console.log(error);
              if(error.message.message){
                this.#alertService.showAlert('alert', error.message.message);
              }else{
                this.#alertService.showAlert('error', 'Comuniquese con el administrador');
              }
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
      this.#router.navigate(['home/categorias/categorias-costos-indirectos']);
      
    }

}
