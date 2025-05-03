import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { CitiesService } from '@services/cities/cities.service';
import { SupliersServiceService } from '@services/suplier/supliers/supliers-service.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-infrmation-suppliers',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    SpinerPagesComponent,
  ],
  templateUrl: './form-infrmation-suppliers.component.html',
  styleUrl: './form-infrmation-suppliers.component.scss'
})
export class FormInfrmationSuppliersComponent implements OnInit, OnDestroy {

  #supplierService = inject(SupliersServiceService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);
  #routeId = inject(ActivatedRoute);
  #citiesService = inject(CitiesService);
  #router = inject(Router);

  public supplierId = signal<number>(0);
  public city = signal<any>([]);
  public supplier = signal<any>([]);
  public success = signal<any>('');
  public modifyInput = signal<boolean>(false);

  public formbuilder = inject(FormBuilder);
  public supplierForm: any = new FormGroup({});

  ngOnInit() {
    this.idSupplier();
    this.getSupplier();
    this.cities();
    this.formSupplier();
  }

  ngOnDestroy() {

    this.#unsubscribe.unsubscribe();
  }

  public formSupplier(){
      this.supplierForm = this.formbuilder.group({
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

    // get users_id(){ return this.productForm.get('users_id'); }
    get name(){ return this.supplierForm.get('name'); }
    get nit(){ return this.supplierForm.get('nit'); }
    get email(){ return this.supplierForm.get('email'); }
    get phone1(){ return this.supplierForm.get('phone1'); }
    get phone2(){ return this.supplierForm.get('phone2'); }
    get address(){ return this.supplierForm.get('address'); }
    get cities_id(){ return this.supplierForm.get('cities_id'); }
    get description(){ return this.supplierForm.get('description'); }

    public fillSupplierForm():void{
      setTimeout(() => {
        this.supplierForm.setValue({
          name: this.supplier().name,
          nit: this.supplier().nit,
          email: this.supplier().email,
          phone1: this.supplier().phone1,
          phone2: this.supplier().phone2,
          address: this.supplier().address,
          cities_id: this.supplier().cities_id,
          description: this.supplier().description,
        });
      }, 500);
    }

  public idSupplier(){
    this.supplierId.set(
      Number(this.#routeId.snapshot.queryParams['id'])
    );
  }

  public modifySupplierForm(id:number):void{

    if(this.supplierForm.valid){
      const data = new FormData();
      data.append('_method','PUT');
      Object.keys(this.supplierForm.value).forEach(key => {
        data.append(key, this.supplierForm.get(key)?.value);
      });

      this.#supplierService.modifySupplier(id, data).subscribe({
        next: (response) => {
          this.#alertService.showAlert('success', response.message);
          this.modifyInput.set(!this.modifyInput());
          this.getSupplier();
          this.supplierForm.reset();
        },
        error: (error) => {
          console.log(error);
          this.#alertService.showAlert('alert', 'Error al modificar el proveedor');
        }
      });
    }else{
      this.#alertService.showAlert('alert', 'Error al modificar el proveedor, por favor verifique que todos los campos esten diligenciados');


    }

  }

  public userFormClose(){
    this.#router.navigate(['./home/proveedores/lista-proveedores']);
  }

  public modifySupplierDetail():void{
    this.modifyInput.set(!this.modifyInput());

    if (this.modifyInput()) {
      // Inicializa y llena el formulario solo cuando se active el modo de edición
      this.fillSupplierForm();

    }

  }

  public getSupplier():void{
    this.#supplierService.getSupplier(this.supplierId()).subscribe({
      next: (response) => {
        this.supplier.set(response.data);
        this.success.set(response.response);
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('alert', 'Error al obtener el proveedor');
      }
    });
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
