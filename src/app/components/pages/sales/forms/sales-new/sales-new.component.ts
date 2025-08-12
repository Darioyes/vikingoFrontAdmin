import { DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { ProductsService } from '@services/product/product/products.service';
import { SalesMainService } from '@services/sales/salesMain/sales-main.service';
import { UsersService } from '@services/users/users/users.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-new',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
  ],
  templateUrl: './sales-new.component.html',
  styleUrl: './sales-new.component.scss'
})
export class SalesNewComponent implements OnInit, OnDestroy {
  
  
  #routeId = inject(ActivatedRoute);
  #salesService = inject(SalesMainService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);
  #productService = inject(ProductsService);
  #usersService = inject(UsersService);
  #router = inject(Router);
  public successProducts = signal<any>('');
  public successUsers = signal<any>('');
  public products = signal<any>([]);
  public users = signal<any>([]);
  public selectedProduct = signal<any>(null);

  public formbuilder = inject(FormBuilder);
  public router = inject(Router)
  public salesFormNew: any = new FormGroup({});
  
  ngOnInit(): void {

    this.formSaleNew();
    this.getProductsNoPaginate();
    this.getUsersNoPagination();

  }
  ngOnDestroy(): void {

    if(this.#unsubscribe){
    this.#unsubscribe.unsubscribe();
    }
  }

  public formSaleNew(){
    this.salesFormNew = this.formbuilder.group({
      description: ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(500)])],
      confirm_sale: ['', Validators.compose([Validators.required])],
      //shopping_cart: ['', [Validators.required]],
      //created_at: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])],
      //updated_at: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1),Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
      //sale_total: ['',  Validators.compose([Validators.min(1),Validators.required,Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])],
      //cost_total: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])],
      product_id: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]+$')])],
      user_id: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]+$')])]
    });
  }

    get description() {return this.salesFormNew.get('description');}
    get confirm_sale() {return this.salesFormNew.get('confirm_sale');}
    //get shopping_cart() {return this.salesFormNew.get('shopping_cart');}
    //get created_at() {return this.salesFormNew.get('created_at');}
    //get updated_at() {return this.salesFormNew.get('updated_at');}
    get amount() {return this.salesFormNew.get('amount');}
    //get sale_total() {return this.salesFormNew.get('sale_total');}
    //get cost_total() {return this.salesFormNew.get('cost_total');}
    get product_id() {return this.salesFormNew.get('product_id');}
    get user_id() {return this.salesFormNew.get('user_id');}


    getProductsNoPaginate() {
      this.#unsubscribe = this.#productService.getProductsNoPaginate().subscribe({
        next: (response) => {
          this.products.set(response.data);
          this.successProducts.set(response.response);
        },
        error: (error) => {
          this.#alertService.openAlert('error', 'Error al obtener los productos');
        }
      });
    }

    getUsersNoPagination() {
      this.#unsubscribe = this.#usersService.getUsersNoPagination().subscribe({
        next: (response) => {
          this.users.set(response.data);
          this.successUsers.set(response.response);
        },
        error: (error) => {
          this.#alertService.openAlert('error', 'Error al obtener los usuarios');
        }
      });
    }

  onProductChange(event: any) {
  //evento que se dispara al cambiar el producto
  const productId = event.target.value;
    if (productId) {
      // Buscar el producto seleccionado
      const foundProduct = this.products().find((p: any) => p.id == productId);
      // Asignar el producto encontrado a la variable selectedProduct
      this.selectedProduct.set(foundProduct || null);
    } else {
      // Si no hay un producto seleccionado, asignar null
      this.selectedProduct.set(null);
    }
  }

  newProduct(){
    if(this.salesFormNew.valid){
      if(this.#cookiesService.check('token')){
        const data = new FormData();
        data.append('shopping_cart','false');
        // Agrega todos los campos del formulario
        Object.keys(this.salesFormNew.value).forEach(key => {
        data.append(key, this.salesFormNew.get(key)?.value);
        });

        this.#unsubscribe = this.#salesService.postNewSale(data).subscribe({
          next: (response) => {
            this.#alertService.showAlert('success', response.message);
            this.salesFormNew.reset();
            this.#router.navigate(['home/ventas/lista-ventas']);
          },
          error: (error) => {
          if(error.errorVikingo.message == 'No hay stock suficiente para la venta') {
            this.#alertService.showAlert('error', error.errorVikingo.message);
          }else{
            console.log(error);
            this.#alertService.showAlert('error', 'Error al modificar la venta');
          }
          }
        })
      }else{
        this.#alertService.showAlert('error', 'Por favor inicie sesión nuevamente');
      }

    }else{
      this.#alertService.showAlert('error', 'Formulario inválido, por favor verifique los campos');
    }
  }

  // al dar clic en cancelar va a volver a cargar la lista de ventas
  back() {
      this.#router.navigate(['home/ventas/lista-ventas']);
  }

}
