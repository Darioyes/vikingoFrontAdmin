import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { CitiesService } from '@services/cities/cities.service';
import { SupliersServiceService } from '@services/suplier/supliers/supliers-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-new-suppliers',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-new-suppliers.component.html',
  styleUrl: './form-new-suppliers.component.scss'
})
export class FormNewSuppliersComponent implements OnInit, OnDestroy {

  #supplierService = inject(SupliersServiceService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);
  #citiesService = inject(CitiesService);
  #router = inject(Router);

  public city = signal<any>([]);

  public formbuilder = inject(FormBuilder);
  public newSupplierForm: any = new FormGroup({});

  ngOnInit() {
    this.cities();
    this.formNewSupplier();
  }

  ngOnDestroy() {

    this.#unsubscribe.unsubscribe();
  }

  public formNewSupplier(){
    this.newSupplierForm = this.formbuilder.group({
      // users_id: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      nit: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(255)])],
      phone1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$')])],
      phone2: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$')])],
      address: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
      cities_id: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
    });
  }

  get name(){ return this.newSupplierForm.get('name'); }
  get nit(){ return this.newSupplierForm.get('nit'); }
  get email(){ return this.newSupplierForm.get('email'); }
  get phone1(){ return this.newSupplierForm.get('phone1'); }
  get phone2(){ return this.newSupplierForm.get('phone2'); }
  get address(){ return this.newSupplierForm.get('address'); }
  get cities_id(){ return this.newSupplierForm.get('cities_id'); }
  get description(){ return this.newSupplierForm.get('description'); }

  createSupplier():void{
    if(this.newSupplierForm.valid){
      const data = new FormData();
      Object.keys(this.newSupplierForm.value).forEach(key => {
        data.append(key, this.newSupplierForm.get(key)?.value);
      });

      if(this.#cookiesService.check('token')){
        this.#unsubscribe = this.#supplierService.newSupplier(data).subscribe({
          next:(response)=>{
            this.#alertService.showAlert('success', response.message);
            this.newSupplierForm.reset();
          },
          error:(error)=>{
            console.log(error);
            this.#alertService.showAlert('error', 'Error al crear el proveedor, por favor intente nuevamente');
          }
        })
      }else{
        this.#alertService.showAlert('error', 'Error al crear el proveedor, por favor inicie sesion');
      }

    }else{
      this.#alertService.showAlert('error', 'Por favor complete todos los campos requeridos');
    }
  }

  cancelSupplier():void{
    //eliminar datos del formulario
    this.newSupplierForm.reset();
    //navegar a la ruta de proveedores
    this.#router.navigate(['home/proveedores/lista-proveedores']);
  }

  public cities(){
    this.#unsubscribe = this.#citiesService.getCities().subscribe({
      next:(response)=>{
        this.city.set(response.data)
      },
      error:(error)=>{
        console.log(error);
        this.#alertService.showAlert('alert', 'Error al cargar las ciudades');
      }
    })
  }

}
