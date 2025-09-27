import { DecimalPipe, DatePipe, NgStyle, NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { Subscription, fromEvent, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-sales',
  imports: [
    RouterModule,
    DecimalPipe,
    DatePipe,
    SpinerPagesComponent,
    NgStyle,
    NgClass
  ],
  templateUrl: './detail-sales.component.html',
  styleUrl: './detail-sales.component.scss'
})
export class DetailSalesComponent {
  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  
  public RouterModule = inject(RouterModule);
  public colorPrimary = environment.colorPrimay;
  public colorPrimaryGradient = environment.colorPrimaryGradient;
  public colorSuccess = environment.colorSuccess;
  public colorSuccessGradient = environment.colorSuccessGradient;
  public colorWarning = environment.colorWarning;
  public colorWarningGradient = environment.colorWarningGradient;
  public colorDanger = environment.colorDanger;
  public colorDangerGradient = environment.colorDangerGradient;

  public visibleColumns = [''];

  #maintenancesService = inject(MaintenanceService);
  #directCostService = inject(DirectCostService);
  #unsubscribe!: Subscription;
  #router = inject(Router);
  #alertService = inject(AlertsService);

  public directCosts = signal<any>([]);
  public directCostsPagination = signal<any>([]);
  
    @HostListener('window:resize')
    onResize() {
      this.updateVisibleColumns();
    }

  ngOnInit(): void {
    this.getDirectCosts();
    this.searchInputSales();
    this.updateVisibleColumns();
  }

  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  updateVisibleColumns(): void {
    const width = window.innerWidth;

    if (width <= 500) {
      this.visibleColumns = ['column-1'];
    } else if (width <= 600) {
      this.visibleColumns = ['column-1', 'column-2'];
    } else if (width <= 700) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3'];
    } else if (width <= 800) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4'];
    }
      else if (width <= 900) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];
    }
    else if (width <= 1000) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6'];
    }

  }

  getDirectCosts(){
    this.#unsubscribe = this.#directCostService.getDirectCosts().subscribe({
      next: (response) => {
        //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
      const updatedData = response.data.data.map((directCosts: any) => ({
        //...directCosts, // Copia todas las propiedades de 'directCosts' y añade o sobreescribe  showDetails: false
        ...directCosts,
        showDetails: false, // Añade el campo 'showDetails'
      }));

      this.directCosts.set(updatedData); // Establece la lista actualizada en la señal 'directCostss'
      this.directCostsPagination.set(response); // Mantén la paginación sin cambios
      },
      error: (error) => {
        console.log(error);
      this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  isColumnVisible(column: string): boolean {
    return this.visibleColumns.includes(column);
  }

  toggleDetails(item: any): void {
    item.showDetails = !item.showDetails;
    //console.log(item.showDetails);
  }

  searchInputSales(): void {
      this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input').pipe(
          debounceTime(500), // Espera 500 ms después de la última entrada
          distinctUntilChanged(), // Evita búsquedas redundantes
          switchMap((event: any) => {
            //creamos la constante term que almacena el valor del input
            const term = event.target.value;
            if(term === ''){
              //si el input esta vacio llamamos a la funcion getDetailMaintenance
              return this.#directCostService.getDirectCosts();
            }
            //retornamos el servicio de busqueda
            return this.#directCostService.searchDirectCosts(term);
          })
        ).subscribe({
          next: (response) => {
            //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
          const updatedData = response.data.data.map((directCosts: any) => ({
            //...directCosts, // Copia todas las propiedades de 'directCosts' y añade o sobreescribe  showDetails: false
            ...directCosts,
            showDetails: false, // Añade el campo 'showDetails'
          }));

          this.directCosts.set(updatedData); // Establece la lista actualizada en la señal 'directCostss'
          this.directCostsPagination.set(response); // Mantén la paginación sin cambios
          console.log(updatedData);
          },
          error: (error) => {
            console.log(error);
          }
        });
  }
  
  pagination(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:any)=>{
          //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
          const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));
        this.directCosts.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.directCostsPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  deleteDirectCost(id: number): void {
    this.#unsubscribe = this.#directCostService.deleteDirectCost(id).subscribe({
      next: (response) => {
        this.#alertService.showAlert('success', response.message);
        this.getDirectCosts();
      },
      error: (error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

async confirmDeleteCost(id:number) {
  const confirm = await this.#alertService.openAlert('alert', '¿Esta seguro que desea eliminar el costo directo?');
  if (confirm) {
    this.deleteDirectCost(id);
  } else {
    //console.log('Cancelado');
  }
}
  
  redirectToNewCost(): void {
    this.#router.navigate(['home/costos-directos/crear-costo-directo']);
  }

  redirectToModifyCost(costId: string): void {
    this.#router.navigate(['home/costos-directos/modificar-costo-directo'],{queryParams:{id:costId}});
  }

}
