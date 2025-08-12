import { NgClass, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { ErrorMaintenanceDetalleResponse, SuccessMaintenanceDetalleResponse } from '@interfaces/maintenances/IGeneralDetallleMtto.interface';
import { IDetail, IMaintenanceDetail } from '@interfaces/maintenances/IMaintenanceDetail.interface';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { CardMaintenanceComponent } from '../card-maintenance/card-maintenance.component';
import { FormInformationComponent } from '../forms/form-information/form-information.component';

@Component({
    selector: 'app-maintenances-list',
    imports: [
        CardMaintenanceComponent,
        SpinerPagesComponent,
        NgClass,
        NgStyle,
        FormInformationComponent,
        RouterOutlet,
    ],
    templateUrl: './maintenances-list.component.html',
    styleUrl: './maintenances-list.component.scss'
})
export class MaintenancesListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  #maintenancesService = inject(MaintenanceService);
  #unsubscribe!: Subscription;
  public router = inject(Router);
  #alertService = inject(AlertsService);
  public urlImg = environment.domainimage;

  public maintenances = signal<IMaintenanceDetail| any>([]);
  public dataProgress = signal< SuccessMaintenanceDetalleResponse | any>([]);
  public maintenancesActive = signal<boolean>(true);
  public maintenance = signal<IDetail | any>([]);
  public newMaintenance = signal<boolean>(false)
  public idDelete = signal<any>(null);
  public response = signal<any>(false);

  constructor() {

  }



  ngOnInit(): void {
    this.getDetailMaintenance();

  }
  //el ngAfterViewInit se ejecuta después de que la vista ha sido inicializada
  //es útil para realizar tareas que requieren que la vista esté completamente cargada
  ngAfterViewInit(): void {
    if(this.searchInput){
      this.searchInputMaintenance();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes+'hola');
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
        let term = event.target.value;

        if(term === ''){
          //si el input esta vacio llamamos a la funcion getDetailMaintenance
          return this.#maintenancesService.getmaintenances();
        };
        if(term === 'En progreso'|| term === 'en progreso'){
          term = 'in_progress';
        }
        if(term === 'Finalizado'|| term === 'finalizado'){
          term = 'finalized';
        }
        if(term === 'Recibido'|| term === 'recibido'){
          term = 'joined';
        }
        if(term === 'Autorización'|| term === 'autorización' || term === 'autorizacion' || term === 'Autorizacion'){
          term = 'authorization';
        }
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

  maintenanceConsult(id:number){
    this.maintenancesActive.set(false);


    //recorremos los mantenimientos y buscamos el id seleccionado
    this.maintenances().forEach((element:any)=>{
      if(element.id === id){
        this.maintenance.set(element);
      }
    });
  }

  async confirmDeleteMaintenance(id:number) {
    const confirm = await this.#alertService.openAlert('alert', '¿Seguro que desea eliminar este mantenimiento?');
    if (confirm) {
      this.deleteMaintenance(id);
    } else {
      //console.log('Cancelado');
    }
  }

  maintenanceActivate(activate:boolean){
    this.maintenancesActive.set(activate);
    this.getDetailMaintenance();
  }

  public maintenanceNew():void{
    this.newMaintenance.set(!this.newMaintenance())
    //redirigir a nuevo-mantenimiento
    this.router.navigate(['./home/mantenimientos/nuevo-mantenimiento']);
  }

  public deleteMaintenance(id:number){

      this.#unsubscribe = this.#maintenancesService.deleteMaintenance(id).subscribe({
        next:(response)=>{
          this.getDetailMaintenance();
          this.#alertService.showAlert('success', response.message);
        },
        error:(error:ErrorMaintenanceDetalleResponse)=>{
          this.#alertService.showAlert('error','Error inesperado intente nuevamente');
          console.log(error)
        }
      });

  }

}
