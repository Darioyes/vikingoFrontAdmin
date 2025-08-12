import { DatePipe, DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SalesMainService } from '@services/sales/salesMain/sales-main.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-sales-detail',
  imports: [
    DecimalPipe,
    DatePipe,
    NgStyle,
    NgClass,
    SpinerPagesComponent,
  ],
  templateUrl: './sales-detail.component.html',
  styleUrl: './sales-detail.component.scss'
})
export class SalesDetailComponent implements OnInit, OnDestroy {

  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;


  public visibleColumns = [''];

  #salesService = inject(SalesMainService);
  public salesPagination = signal<any>([]);
  public sales = signal<any>([]);
  #unsubscribe!: Subscription;
  #maintenancesService = inject(MaintenanceService);
  #router = inject(Router);
  #alertService = inject(AlertsService);


  @HostListener('window:resize')
  onResize() {
    this.updateVisibleColumns();
  }

  ngOnInit() {
    this.getAllSales();
    this.updateVisibleColumns();
    this.searchInputSales();
  }

  ngOnDestroy(): void {
    if (this.#unsubscribe) {
      this.#unsubscribe.unsubscribe();
    }
  }

  getAllSales(): void {
    this.#unsubscribe = this.#salesService.getSales().subscribe({
      next: (response) => {
        //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
        const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));

        this.sales.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.salesPagination.set(response); // Mantén la paginación sin cambios
      },
      error: (error) => {
        console.log(error);
      }
    });
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
              return this.#salesService.getSales();
            }
            //retornamos el servicio de busqueda
            return this.#salesService.getSearchSales(term);
          })
        ).subscribe({
          next:(response:any) => {
            //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
            const updatedData = response.data.data.map((sale: any) => ({
            //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
            ...sale,
            showDetails: false, // Añade el campo 'showDetails'
          }));

          this.sales.set(updatedData); // Establece la lista actualizada en la señal 'sales'
          this.salesPagination.set(response); // Mantén la paginación sin cambios
            },
          error:(error:any) => {
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
        this.sales.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.salesPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }


  updateVisibleColumns(): void {
    const width = window.innerWidth;

    if (width <= 400) {
      this.visibleColumns = ['column-1'];
    } else if (width <= 500) {
      this.visibleColumns = ['column-1', 'column-2'];
    } else if (width <= 600) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3'];
    } else if (width <= 700) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4'];
    } else if (width <= 800) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];
    } else if (width <= 900) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6'];
    } else if (width <= 900) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7'];
    }else if (width <= 1000) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6','column-7'];
    }else if (width <= 1100) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6'];
    }
    else if (width <= 1200) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6','column-7'];
    }else if (width > 1200) {
      this.visibleColumns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6','column-7','column-8'];

    }
  }

  isColumnVisible(column: string): boolean {
    return this.visibleColumns.includes(column);
  }

  toggleDetails(item: any): void {
    item.showDetails = !item.showDetails;
  }

  userModifyId(id:any):void{
    this.#router.navigate(['home/ventas/modificar-venta'],{queryParams:{id:id}});
  }

  async confirmDeleteSale(id:number) {
    const confirm = await this.#alertService.openAlert('alert', '¿Esta seguro que desea eliminar esta venta?');
    if (confirm) {
      this.deleteSale(id);
    } else {
      //console.log('Cancelado');
    }
  }

  deleteSale(id: any): void {
    this.#salesService.deleteSale(id).subscribe({
      next: (response: any) => {
        console.log('Venta eliminada:', response);
        this.#alertService.showAlert('success', response.message);
        // Actualiza la lista de ventas después de eliminar
        this.getAllSales();
      },
      error: (error: any) => {
        console.log(error);
        this.#alertService.showAlert('error','Error al eliminar la venta');
      }
    });
  }

  newSale(): void {
    this.#router.navigate(['home/ventas/nuevo-venta']);
  }

}
