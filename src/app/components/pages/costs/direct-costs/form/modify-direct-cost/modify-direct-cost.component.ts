import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ThousandsSeparatorDirective } from '../../../../../../directives/thousands-separator.directive';
@Component({
  selector: 'app-modify-direct-cost',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
    ThousandsSeparatorDirective
  ],
  templateUrl: './modify-direct-cost.component.html',
  styleUrl: './modify-direct-cost.component.scss'
})


export class ModifyDirectCostComponent implements OnInit, OnDestroy {

  public categoriesDirectCosts = signal<any[]>([]);

  public formbuilder = inject(FormBuilder);
  public directCostFormModify: any = new FormGroup({});
  public saleId = signal<any>(0);
  public success = signal<string>('');
  public directCost = signal<any>([]);

  #router = inject(Router);
  #serviceDirectCosts = inject(DirectCostService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #routeId = inject(ActivatedRoute);
  #cookiesService = inject(CookieService);


  ngOnInit(): void {
    this.formDirectCostModify();
    this.getAllCategoriesDirectCosts();
    this.getDirectCost();
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

  getAllCategoriesDirectCosts(): void {
    this.#serviceDirectCosts.getAllCategoriesDirectCosts().subscribe({
      next: (response) => {
        this.categoriesDirectCosts.set(response.data);
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }
  

  public formDirectCostModify() {
    this.directCostFormModify = this.formbuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      categories_direct_costs_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }
  
  get name() { return this.directCostFormModify.get('name'); }
  get description() { return this.directCostFormModify.get('description'); }
  get amount() { return this.directCostFormModify.get('amount'); }
  get price() { return this.directCostFormModify.get('price'); }
  get categories_direct_costs_id() { return this.directCostFormModify.get('categories_direct_costs_id'); }

  public getDirectCost(): void {
    this.idSale()
    this.#unsubscribe = this.#serviceDirectCosts.getDirectCost(this.saleId()).subscribe({
      next: (response) => {
        this.success.set(response.response);
        this.formDirectCostModify();
        this.directCost.set(response.data);
        this.directCostFormModify.setValue({
          name: response.data.name,
          description: response.data.description,
          amount: response.data.amount,
          price: response.data.price,
          categories_direct_costs_id: response.data.categories_direct_costs_id,
        });
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  public modifyDirectCost():void {
    if(this.directCostFormModify.valid){
          //si el formulario es valido
      if(this.directCostFormModify.valid){
        const data = new FormData();
        data.append('_method','PUT');
        // Agrega todos los campos del formulario
        Object.keys(this.directCostFormModify.value).forEach(key => {
        data.append(key, this.directCostFormModify.get(key)?.value);
      });
        if(this.#cookiesService.check('token')){
          this.#serviceDirectCosts.modififyDirectCost(this.saleId(), data).subscribe({
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
        this.directCostFormModify.markAllAsTouched();
      }
    }
  }

  public goBack(): void {
    this.#router.navigate(['home/costos-directos/detalle-costos-directos']);
  }

}
