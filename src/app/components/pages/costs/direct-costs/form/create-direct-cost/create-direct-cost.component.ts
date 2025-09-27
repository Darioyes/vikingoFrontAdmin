import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ThousandsSeparatorDirective } from 'src/app/directives/thousands-separator.directive';

@Component({
  selector: 'app-create-direct-cost',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-direct-cost.component.html',
  styleUrl: './create-direct-cost.component.scss'
})
export class CreateDirectCostComponent implements OnInit, OnDestroy {

  public categoriesDirectCosts = signal<any[]>([]);
  public formbuilder = inject(FormBuilder);
  public directCostFormNew: any = new FormGroup({});
  public success = signal<string>('');
  public categoryCost = signal<string>('');

  #router = inject(Router);
  #serviceDirectCosts = inject(DirectCostService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);


  ngOnInit(): void {

    this.formDirectCostNew();
    this.getAllCategoriesDirectCosts();

  }

  ngOnDestroy(): void {

  }

  getAllCategoriesDirectCosts(): void {
  this.#unsubscribe = this.#serviceDirectCosts.getAllCategoriesDirectCosts().subscribe({
    next: (response) => {
      this.categoriesDirectCosts.set(response.data);
      this.categoryCost.set(response.response);
    },
    error: (error) => {
      console.log(error);
      this.#alertService.showAlert('error', 'Comuniquese con el administrador');
    }
  });
  }

  public formDirectCostNew() {
    this.directCostFormNew = this.formbuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      categories_direct_costs_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  get name() { return this.directCostFormNew.get('name'); }
  get description() { return this.directCostFormNew.get('description'); }
  get amount() { return this.directCostFormNew.get('amount'); }
  get price() { return this.directCostFormNew.get('price'); }
  get categories_direct_costs_id() { return this.directCostFormNew.get('categories_direct_costs_id'); }

  public newDirectCost(): void {
    if(this.directCostFormNew.valid){
      const data = new FormData();
      Object.keys(this.directCostFormNew.controls).forEach(key => {
        data.append(key, this.directCostFormNew.get(key)?.value);
      });
        if(this.#cookiesService.check('token')){
          this.#unsubscribe = this.#serviceDirectCosts.createDirectCost(data).subscribe({
            next: (response) => {
              this.#alertService.showAlert('success', response.message);
              this.directCostFormNew.reset();

            },
            error: (error) => {
              console.log(error);
              this.#alertService.showAlert('error', 'Comuniquese con el administrador');
            }
          });
        }else{
          this.#alertService.showAlert('error', 'Por favor inicie sesión nuevamente');
        }
    }else{
      this.#alertService.showAlert('error', 'Formulario inválido, por favor verifique los datos ingresados');
      // Marcar todos los controles como tocados para mostrar los errores de validación
      this.directCostFormNew.markAllAsTouched();
    }
  }

  goBack(): void {
    this.#router.navigate(['home/costos-directos/detalle-costos-directos']);
  }

}
