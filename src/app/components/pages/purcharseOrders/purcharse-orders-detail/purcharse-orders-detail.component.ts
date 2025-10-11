import { DecimalPipe, DatePipe, NgStyle, NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { PurcharseOrdersService } from '@services/purcharseOrders/purcharse-orders.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-purcharse-orders-detail',
  imports: [
    RouterModule,
    DecimalPipe,
    SpinerPagesComponent,
    NgStyle,
    NgClass
  ],
  templateUrl: './purcharse-orders-detail.component.html',
  styleUrl: './purcharse-orders-detail.component.scss'
})
export class PurcharseOrdersDetailComponent implements  OnInit, OnDestroy {
  //viewChild para obtener el valor del input
  @HostListener('window:resize')
  onResize() {
    this.updateVisibleColumns();
  }
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;


  public visibleColumns = [''];

  #maintenancesService = inject(MaintenanceService);
  #purcharseOrdersService = inject(PurcharseOrdersService);
  #unsubscribe!: Subscription;
  #router = inject(Router);
  #alertService = inject(AlertsService);

  public purcharse = signal<any>([]);
  public purcharsePagination = signal<any>([]);


  ngOnInit(): void {
    this.purcharseOrders();
    this.updateVisibleColumns();
    this.searchInputPurcharseOrders();
  }

  ngOnDestroy(): void {}

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

  isColumnVisible(column: string): boolean {
    return this.visibleColumns.includes(column);
  }

  toggleDetails(item: any): void {
    item.showDetails = !item.showDetails;
    //console.log(item.showDetails);
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
        //this.directCosts.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        //this.directCostsPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

  purcharseOrders(){

        this.#unsubscribe = this.#purcharseOrdersService.getPurcharseOrders().subscribe({
      next: (response) => {
        //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
      const updatedData = response.data.data.map((directCosts: any) => ({
        //...directCosts, // Copia todas las propiedades de 'directCosts' y añade o sobreescribe  showDetails: false
        ...directCosts,
        showDetails: false, // Añade el campo 'showDetails'
      }));
      console.log(updatedData);
      this.purcharse.set(updatedData); // Establece la lista actualizada en la señal 'directCostss'
      this.purcharsePagination.set(response); // Mantén la paginación sin cambios
      },
      error: (error) => {
        console.log(error);
      this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });


  }

  searchInputPurcharseOrders(): void {
      this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input').pipe(
          debounceTime(500), // Espera 500 ms después de la última entrada
          distinctUntilChanged(), // Evita búsquedas redundantes
          switchMap((event: any) => {
            //creamos la constante term que almacena el valor del input
            const term = event.target.value;
            if(term === ''){
              //si el input esta vacio llamamos a la funcion getDetailMaintenance
              return this.#purcharseOrdersService.getPurcharseOrders();
            }
            //retornamos el servicio de busqueda
            return this.#purcharseOrdersService.searchPurchaseOrders(term);
          })
        ).subscribe({
          next: (response) => {
            //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
          const updatedData = response.data.data.map((purcharseOrder: any) => ({
            //...directCosts, // Copia todas las propiedades de 'directCosts' y añade o sobreescribe  showDetails: false
            ...purcharseOrder,
            showDetails: false, // Añade el campo 'showDetails'
          }));

          this.purcharse.set(updatedData); // Establece la lista actualizada en la señal 'purcharse'
          this.purcharsePagination.set(response); // Mantén la paginación sin cambios
          console.log(updatedData);
          },
          error: (error) => {
            console.log(error);
          }
        });
  }

  redirectToNewPurcharseOrder(): void {
    this.#router.navigate(['home/ordenes-compra/nuevo-orden-compra']);
  }

  redirectToModifyPurcharseOrder(purcharseOrderId: string): void {
    this.#router.navigate(['home/ordenes-compra/modificar-orden-compra'],{queryParams:{id:purcharseOrderId}});
  }

  async confirmDeleteCost(id:number) {
  const confirm = await this.#alertService.openAlert('alert', '¿Esta seguro que desea eliminar el costo directo?');
  if (confirm) {
   
  } else {
    //console.log('Cancelado');
  }
}

}
