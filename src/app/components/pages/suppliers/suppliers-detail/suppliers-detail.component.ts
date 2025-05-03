import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SupliersServiceService } from '@services/suplier/supliers/supliers-service.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { SuppliersCardComponent } from '../suppliers-card/suppliers-card.component';

@Component({
    selector: 'app-suppliers-detail',
    imports: [
        SuppliersCardComponent,
        SpinerPagesComponent,
        NgClass,
        NgStyle
    ],
    templateUrl: './suppliers-detail.component.html',
    styleUrl: './suppliers-detail.component.scss'
})
export class SuppliersDetailComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  #unsubscribe!: Subscription;
  #suppliersService = inject(SupliersServiceService);
  #maintenancesService = inject(MaintenanceService);
  #alertService = inject(AlertsService);
  #router = inject(Router);

  public suppliers = signal<any>([]);
  public suppliersPage = signal<any>([]);

  ngOnInit(): void {
    this.getSuppliersFull();
    this.searcInputSuppliers();
  }

  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  getSuppliersFull():void{
    this.#unsubscribe = this.#suppliersService.getSupliers().subscribe({
      next: (response) => {
        this.suppliers.set(response.data.data);
        this.suppliersPage.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };

  public getIdInformation(id:number):void{
    this.#router.navigate(['home/proveedores/consulta-proveedor'],{queryParams:{id:id}});
  }

  async confirmDeleteUser(id:any):Promise<void> {
    const confirm = await this.#alertService.openAlert('alert', '¿Seguro que desea eliminar este proveedor?');
    if (confirm) {
      this.deleteSupplier(id);
    }
  }

  deleteSupplier(id:number){
    this.#unsubscribe = this.#suppliersService.deleteSupplier(id).subscribe({
      next: (response) => {
        this.#alertService.openAlert('success', response.message);
        this.getSuppliersFull();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  pagination(url:string):void{
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next: (response) => {
        this.suppliers.set(response?.data?.data);
        this.suppliersPage.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private deleteSupplierId(id:number):void{}

  searcInputSuppliers(){

    this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500), // Espera 500 ms después de la última entrada
      distinctUntilChanged(), // Evita búsquedas redundantes
      switchMap((event: any) => {
        //creamos la constante term que almacena el valor del input
        const term = event.target.value;
        if(term === ''){
          //si el input esta vacio llamamos a la funcion getDetailMaintenance
          return this.#suppliersService.getSupliers();
        }
        //retornamos el servicio de busqueda
        return this.#suppliersService.getSearchSupliers(term);
      })
    ).subscribe({
      next:(response:any)=>{
        this.suppliers.set(response?.data?.data);
        this.suppliersPage.set(response);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  newSupplierForm():void{
    this.#router.navigate(['home/proveedores/nuevo-proveedor']);
  }

}
