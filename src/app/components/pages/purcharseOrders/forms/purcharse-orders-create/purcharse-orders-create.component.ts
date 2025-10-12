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

@Component({
  selector: 'app-purcharse-orders-create',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './purcharse-orders-create.component.html',
  styleUrl: './purcharse-orders-create.component.scss'
})
export class PurcharseOrdersCreateComponent implements OnInit, OnDestroy {

  public purcharseOrder = signal<any[]>([]);

  public formbuilder = inject(FormBuilder);
  public purcharseFormNew: any = new FormGroup({});
  public saleId = signal<any>(0);
  public success = signal<string>('');
  public products = signal<any[]>([]);
  public supliers = signal<any[]>([]);

  #router = inject(Router);
  #servicePurcharseOrders = inject(PurcharseOrdersService);
  #serviceSupliers = inject(SupliersServiceService);
  #serviceProducts = inject(ProductsService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);

  ngOnInit(): void {
    this.formPurcharseOrderNew();
    this.getProducts();
    this.getSupliers();
  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  public formPurcharseOrderNew() {
    this.purcharseFormNew = this.formbuilder.group({
      purcharse: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      purcharse_order: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      products_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      suppliers_id: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  get purcharse() { return this.purcharseFormNew.get('purcharse'); }
  get amount() { return this.purcharseFormNew.get('amount'); }
  get description() { return this.purcharseFormNew.get('description'); }
  get purcharse_order() { return this.purcharseFormNew.get('purcharse_order'); }
  get products_id() { return this.purcharseFormNew.get('products_id'); }
  get suppliers_id() { return this.purcharseFormNew.get('suppliers_id'); }

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

  public purcharseOrderNew(): void {
    if(this.purcharseFormNew.valid){
      const data = new FormData();
      // Agrega todos los campos del formulario
      Object.keys(this.purcharseFormNew.value).forEach(key => {
      data.append(key, this.purcharseFormNew.get(key)?.value);
      });
      if(this.#cookiesService.check('token')){
          this.#unsubscribe = this.#servicePurcharseOrders.newPurecharseOrder(data).subscribe({
          next: (response) => {
            console.log(response);
            this.#alertService.showAlert('success', 'Orden de compra creada exitosamente');
          },
          error: (error) => {
            console.log(error);
            this.#alertService.showAlert('error', 'Comuniquese con el administrador');
          }
      });
      }
      } else {
        this.#alertService.showAlert('warning', 'Formulario invalido, por favor verifique los campos');
        this.purcharseFormNew.markAllAsTouched();
      }
  }

  public goBack(): void {
    this.#router.navigate(['home/ordenes-compra/lista-ordenes-compra']);
  }


}
