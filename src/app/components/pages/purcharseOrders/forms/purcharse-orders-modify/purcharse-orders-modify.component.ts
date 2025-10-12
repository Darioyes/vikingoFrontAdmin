import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { ProductsService } from '@services/product/product/products.service';
import { PurcharseOrdersService } from '@services/purcharseOrders/purcharse-orders.service';
import { SupliersServiceService } from '@services/suplier/supliers/supliers-service.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ThousandsSeparatorDirective } from 'src/app/directives/thousands-separator.directive';

@Component({
  selector: 'app-purcharse-orders-modify',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './purcharse-orders-modify.component.html',
  styleUrl: './purcharse-orders-modify.component.scss'
})
export class PurcharseOrdersModifyComponent implements OnInit, OnDestroy {

    public purcharseOrder = signal<any[]>([]);
  
    public formbuilder = inject(FormBuilder);
    public purcharseFormModify: any = new FormGroup({});
    public saleId = signal<any>(0);
    public success = signal<string>('');
    public purcharseOrderOne = signal<any>([]);
    public products = signal<any[]>([]);
    public supliers = signal<any[]>([]);
  
    #router = inject(Router);
    #servicePurcharseOrders = inject(PurcharseOrdersService);
    #serviceSupliers = inject(SupliersServiceService);
    #serviceProducts = inject(ProductsService);
    #unsubscribe!: Subscription;
    #alertService = inject(AlertsService);
    #routeId = inject(ActivatedRoute);
    #cookiesService = inject(CookieService);

  ngOnInit(): void {
    this.formPurcharseOrderModify();
    this.getPurcharseOrder();
    this.getProducts();
    this.getSupliers();
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

  public formPurcharseOrderModify() {
    this.purcharseFormModify = this.formbuilder.group({
      purcharse: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      purcharse_order: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      products_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      suppliers_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  get purcharse() { return this.purcharseFormModify.get('purcharse'); }
  get amount() { return this.purcharseFormModify.get('amount'); }
  get description() { return this.purcharseFormModify.get('description'); }
  get purcharse_order() { return this.purcharseFormModify.get('purcharse_order'); }
  get products_id() { return this.purcharseFormModify.get('products_id'); }
  get suppliers_id() { return this.purcharseFormModify.get('suppliers_id'); }


  getProducts(): void {
    this.#unsubscribe = this.#serviceProducts.getTotalProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.products.set(response.data);
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }
  getSupliers(): void {
    this.#unsubscribe = this.#serviceSupliers.getAllSuppliersNoPaginate().subscribe({
      next: (response) => {
        console.log(response.data);
        this.supliers.set(response.data);
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  getPurcharseOrder(): void {
    this.idSale();
    this.#unsubscribe = this.#servicePurcharseOrders.getPurcharseOrder(this.saleId()).subscribe({
      next: (response) => {
        console.log(response);
        this.success.set(response.response);
        this.formPurcharseOrderModify();
        this.purcharseOrderOne.set(response.data);
        this.purcharseFormModify.patchValue({
          purcharse: response.data.purcharse,
          amount: response.data.amount,
          description: response.data.description,
          purcharse_order: response.data.purcharse_order,
          products_id: response.data.products_id,
          suppliers_id: response.data.suppliers_id,
        });
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  public purcharseOrderModify(): void {
   
    if(this.purcharseFormModify.valid){
       const data = new FormData();
      data.append('_method','PUT');
      // Agrega todos los campos del formulario
      Object.keys(this.purcharseFormModify.value).forEach(key => {
      data.append(key, this.purcharseFormModify.get(key)?.value);
      });
      if(this.#cookiesService.check('token')){
        this.#unsubscribe = this.#servicePurcharseOrders.modifyPurcharseOrder(this.saleId(), data).subscribe({
          next: (response) => {
            console.log(response);
            this.#alertService.showAlert('success', response.message);
            this.getPurcharseOrder();
          },
          error: (error) => {
            console.log(error);
            this.#alertService.showAlert('error', 'Comuniquese con el administrador');
          }
        })
      }else{
        this.#alertService.showAlert('error', 'Su sesión ha expirado, por favor inicie sesión nuevamente');
      }
    }else{
      this.#alertService.showAlert('warning', 'Por favor complete el formulario correctamente');
      // marcar todos los campos como tocados para que se muestren los errores
      this.purcharseFormModify.markAllAsTouched();
    }
  }

  public goBack(): void {
    this.#router.navigate(['home/ordenes-compra/lista-ordenes-compra']);
  }
}
