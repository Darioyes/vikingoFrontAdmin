import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { IndirectCostService } from '@services/cost/indirectCost/indirect-cost.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-indirect-cost',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-indirect-cost.component.html',
  styleUrl: './create-indirect-cost.component.scss'
})
export class CreateIndirectCostComponent implements OnDestroy, OnInit {

  public categoriesIndirectCosts = signal<any[]>([]);
  public formbuilder = inject(FormBuilder);
  public inDirectCostFormNew: any = new FormGroup({});
  public success = signal<string>('');
  public categoryCost = signal<string>('');

  #router = inject(Router);
  #serviceIndirectCosts = inject(IndirectCostService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);

  ngOnInit(): void {

    this.formIndirectCostNew();
    this.getAllCategoriesIndirectCosts();


  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  getAllCategoriesIndirectCosts(): void {
    this.#unsubscribe = this.#serviceIndirectCosts.getAllCategoriesIndirectCosts().subscribe({
      next: (response) => {
        this.categoriesIndirectCosts.set(response.data);
        this.categoryCost.set(response.response);
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  public formIndirectCostNew() {
    this.inDirectCostFormNew = this.formbuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      categories_indirect_costs_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  get name() { return this.inDirectCostFormNew.get('name'); }
  get description() { return this.inDirectCostFormNew.get('description'); }
  get amount() { return this.inDirectCostFormNew.get('amount'); }
  get price() { return this.inDirectCostFormNew.get('price'); }
  get categories_indirect_costs_id() { return this.inDirectCostFormNew.get('categories_indirect_costs_id'); }

  public newInDirectCost(): void {
    if(this.inDirectCostFormNew.valid){
      const data = new FormData();
      Object.keys(this.inDirectCostFormNew.controls).forEach(key => {
        data.append(key, this.inDirectCostFormNew.get(key)?.value);
      });
        if(this.#cookiesService.check('token')){
          this.#unsubscribe = this.#serviceIndirectCosts.createIndirectCost(data).subscribe({
            next: (response) => {
              this.#alertService.showAlert('success', response.message);
              this.inDirectCostFormNew.reset();

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
      this.inDirectCostFormNew.markAllAsTouched();
    }
  }

  goBack(): void {
    this.#router.navigate(['home/costos-indirectos/detalle-costos-indirectos']);
  }

}
