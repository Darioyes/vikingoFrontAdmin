import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { IndirectCostService } from '@services/cost/indirectCost/indirect-cost.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ThousandsSeparatorDirective } from 'src/app/directives/thousands-separator.directive';

@Component({
  selector: 'app-modify-indirect-cost',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
    ThousandsSeparatorDirective
  ],
  templateUrl: './modify-indirect-cost.component.html',
  styleUrl: './modify-indirect-cost.component.scss'
})
export class ModifyIndirectCostComponent implements OnInit, OnDestroy {
   public categoriesDirectCosts = signal<any[]>([]);
  
    public formbuilder = inject(FormBuilder);
    public inDirectCostFormModify: any = new FormGroup({});
    public saleId = signal<any>(0);
    public success = signal<string>('');
    public inDirectCost = signal<any>([]);
  
    #router = inject(Router);
    #serviceDirectCosts = inject(IndirectCostService);
    #unsubscribe!: Subscription;
    #alertService = inject(AlertsService);
    #routeId = inject(ActivatedRoute);
    #cookiesService = inject(CookieService);
  
  
    ngOnInit(): void {
      this.formIndirectCostModify();
      this.getAllCategoriesIndirectCosts();
      this.getIndirectCost();
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
  
    getAllCategoriesIndirectCosts(): void {
      this.#serviceDirectCosts.getAllCategoriesIndirectCosts().subscribe({
        next: (response) => {
          this.categoriesDirectCosts.set(response.data);
        },
        error: (error) => {
          console.log(error);
          this.#alertService.showAlert('error', 'Comuniquese con el administrador');
        }
      });
    }
    

    public formIndirectCostModify() {
      this.inDirectCostFormModify = this.formbuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
        amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
        price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
        categories_indirect_costs_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      });
    }

    get name() { return this.inDirectCostFormModify.get('name'); }
    get description() { return this.inDirectCostFormModify.get('description'); }
    get amount() { return this.inDirectCostFormModify.get('amount'); }
    get price() { return this.inDirectCostFormModify.get('price'); }
    get categories_indirect_costs_id() { return this.inDirectCostFormModify.get('categories_indirect_costs_id'); }

    public getIndirectCost(): void {
      this.idSale()
      this.#unsubscribe = this.#serviceDirectCosts.getOneIndirectCost(this.saleId()).subscribe({
        next: (response) => {
          this.success.set(response.response);
          this.formIndirectCostModify();
          this.inDirectCost.set(response.data);
          this.inDirectCostFormModify.setValue({
            name: response.data.name,
            description: response.data.description,
            amount: response.data.amount,
            price: response.data.price,
            categories_indirect_costs_id: response.data.categories_indirect_costs_id,
          });
        },
        error: (error) => {
          console.log(error);
          this.#alertService.showAlert('error', 'Comuniquese con el administrador');
        }
      });
    }

    public modifyIndirectCost():void {
      if(this.inDirectCostFormModify.valid){
            //si el formulario es valido
        if(this.inDirectCostFormModify.valid){
          const data = new FormData();
          data.append('_method','PUT');
          // Agrega todos los campos del formulario
          Object.keys(this.inDirectCostFormModify.value).forEach(key => {
          data.append(key, this.inDirectCostFormModify.get(key)?.value);
        });
          if(this.#cookiesService.check('token')){
            this.#serviceDirectCosts.modifyIndirectCostF(this.saleId(), data).subscribe({
              next: (response) => {
                this.#alertService.showAlert('success', response.message);
              },
              error: (error) => {
                console.log(error);
                this.#alertService.showAlert('error', 'Comuniquese con el administrador');
              }
          });
          }else{
            this.#alertService.showAlert('error','Por favor vuelva a iniciar sesión');
          }
  
        } else {
          this.#alertService.showAlert('warning', 'Por favor complete el formulario correctamente');
          // marcar todos los campos como tocados para que se muestren los errores
          this.inDirectCostFormModify.markAllAsTouched();
        }
      }
    }
  
    public goBack(): void {
      this.#router.navigate(['home/costos-indirectos/detalle-costos-indirectos']);
    }
  

}
