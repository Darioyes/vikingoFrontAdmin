import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ErrorMaintenanceDetalleResponse, SuccessMaintenanceDetalleResponse } from '@interfaces/maintenances/IGeneralDetallleMtto.interface';
import { IMaintenanceDetail } from '@interfaces/maintenances/IMaintenanceDetail.interface';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { CardMaintenanceComponent } from '../card-maintenance/card-maintenance.component';

@Component({
    selector: 'app-maintenances-list',
    imports: [
        CardMaintenanceComponent,
        SpinerPagesComponent,
        NgClass,
        NgStyle
    ],
    templateUrl: './maintenances-list.component.html',
    styleUrl: './maintenances-list.component.scss'
})
export class MaintenancesListComponent implements OnInit, OnDestroy {
  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  #maintenancesService = inject(MaintenanceService);
  #unsubscribe!: Subscription;
  public urlImg = environment.domainimage;

  public maintenances = signal<IMaintenanceDetail| any>([]);
  public dataProgress = signal< SuccessMaintenanceDetalleResponse | any>([]);

  ngOnInit(): void {
    this.getDetailMaintenance();
    this.searchInputMaintenance();
  }
  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  getDetailMaintenance(){
    this.#unsubscribe = this.#maintenancesService.getmaintenances().subscribe({
      next:(response:SuccessMaintenanceDetalleResponse)=>{
        this.maintenances.set(response?.data?.data);
        this.dataProgress.set(response);
      },
      error:(error:ErrorMaintenanceDetalleResponse)=>{
        console.log(error);
      }
    });
  }

  pagination(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:SuccessMaintenanceDetalleResponse)=>{
        this.maintenances.set(response?.data?.data);
        this.dataProgress.set(response);
      },
      error:(error:ErrorMaintenanceDetalleResponse)=>{
        console.log(error);
      }
    });
  }

  searchInputMaintenance(){
    this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500), // Espera 500 ms después de la última entrada
      distinctUntilChanged(), // Evita búsquedas redundantes
      switchMap((event: any) => {
        //creamos la constante term que almacena el valor del input
        const term = event.target.value;

        if(term === ''){
          //si el input esta vacio llamamos a la funcion getDetailMaintenance
          return this.#maintenancesService.getmaintenances();
        };
        //retornamos el servicio de busqueda
        return this.#maintenancesService.searchMaintenance(term);
      })
    ).subscribe({
      next:(response:SuccessMaintenanceDetalleResponse)=>{
        //console.log(response);
        this.maintenances.set(response?.data?.data);
        this.dataProgress.set(response);
      },
      error:(error:ErrorMaintenanceDetalleResponse)=>{
        console.log(error);
      }
    });
  }

}
