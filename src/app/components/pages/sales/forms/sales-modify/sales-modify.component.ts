import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { SalesMainService } from '@services/sales/salesMain/sales-main.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-modify',
  imports: [
    SpinerPagesComponent,
    ReactiveFormsModule,
    DatePipe,
    CurrencyPipe,
    //DecimalPipe,
  ],
  templateUrl: './sales-modify.component.html',
  styleUrl: './sales-modify.component.scss'
})
export class SalesModifyComponent implements OnInit, OnDestroy {

    #routeId = inject(ActivatedRoute);
    #salesService = inject(SalesMainService);
    #unsubscribe!: Subscription;
    #alertService = inject(AlertsService);
    #cookiesService = inject(CookieService);

    public saleId = signal<any>(0);
    public sale = signal<any>([]);
    public success = signal<any>('');

    public formbuilder = inject(FormBuilder);
    public router = inject(Router)
    public salesForm: any = new FormGroup({});

    ngOnInit(): void {
      this.getSale();
      this.formSale();
      this.fillSalesForm();
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

    public getSale(){
      this.idSale();
      this.#unsubscribe = this.#salesService.getsale(this.saleId()).subscribe({
        next: (response) => {
          this.sale.set(response.data);
          this.success.set(response.response);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    public formSale(){
      this.salesForm = this.formbuilder.group({
        description: ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(500)])],
        confirm_sale: ['', Validators.compose([Validators.required])],
        //shopping_cart: ['', [Validators.required]],
        //created_at: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])],
        //updated_at: ['', [Validators.required]],
        amount: ['', [Validators.required, Validators.min(1),Validators.pattern(/^\d{1,10}(\.\d{1,2})?$/)]],
        //sale_total: ['',  Validators.compose([Validators.required,Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])],
        //cost_total: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])]
      });
    }

    get description() {return this.salesForm.get('description');}
    get confirm_sale() {return this.salesForm.get('confirm_sale');}
    //get shopping_cart() {return this.salesForm.get('shopping_cart');}
    //get created_at() {return this.salesForm.get('created_at');}
    //get updated_at() {return this.salesForm.get('updated_at');}
    get amount() {return this.salesForm.get('amount');}
    //get sale_total() {return this.salesForm.get('sale_total');}
    //get cost_total() {return this.salesForm.get('cost_total');}

  public fillSalesForm():void{
    setTimeout(() => {
      this.salesForm.setValue({
        description: this.sale().description,
        confirm_sale: this.sale().confirm_sale,
        //shopping_cart: this.sale().shopping_cart,
        //created_at: this.sale().created_at.slice(0, 10),
        //updated_at: this.sale().updated_at.slice(0, 10),
        amount: this.sale().amount,
        //sale_total: this.sale().sale_total,
        //cost_total: this.sale().cost_total,
      });
    }, 1000);
  }

  public modifySales(): void{
    //si el formulario es valido
    if(this.salesForm.valid){
      const data = new FormData();
      data.append('_method','PUT');
      data.append('user_id', this.sale().user.id);
      data.append('product_id', this.sale().product.id);
      // Agrega todos los campos del formulario
      Object.keys(this.salesForm.value).forEach(key => {
      data.append(key, this.salesForm.get(key)?.value);
    });
    //validamos si hay un token en la cookies
    if(this.#cookiesService.check('token')){

      this.#unsubscribe = this.#salesService.postModifySale(this.saleId(), data).subscribe({
        next: (response) => {
          this.#alertService.showAlert('success', 'Venta modificada con éxito');
          this.getSale();
        },
        error: (error) => {
          if(error.errorVikingo.message == 'No hay stock suficiente para la venta') {
            this.#alertService.showAlert('error', error.errorVikingo.message);
          }else{
            console.log(error);
          }
        }
      });

    }else{
      this.#alertService.showAlert('error','Por favor vuelva a iniciar sesión');
    }

    }else{
      this.salesForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      this.#alertService.showAlert('error','Formulario inválido, por favor revise los campos');
    }
  }

  public goBack(): void {
    this.router.navigate(['home/ventas/lista-ventas']);
  }

}
