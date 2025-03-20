import { DatePipe, DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { TransactionService } from '@services/transactions/transaction/transaction.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-detail',
  imports: [
    DecimalPipe,
    DatePipe,
    SpinerPagesComponent,
    NgStyle,
    NgClass,
  ],
  templateUrl: './transactions-detail.component.html',
  styleUrl: './transactions-detail.component.scss'
})
export class TransactionsDetailComponent implements OnInit, OnDestroy {

  #transactionService = inject(TransactionService);
  #maintenancesService = inject(MaintenanceService);
  #unsubscribe!: Subscription;

  public visibleColumns = [''];
  public transactionsUsers = signal<any>([]);
  public transactionsUsersPagination = signal<any>([]);
  public transactionsMaintenance = signal<any>([]);
  public transactionsMaintenancePagination = signal<any>([]);
  public transactionsPurcharseOrders = signal<any>([]);
  public transactionsPurcharseOrdersPagination = signal<any>([]);
  public transactionsDirectCosts = signal<any>([]);
  public transactionsDirectCostsPagination = signal<any>([]);
  public transactionsIndirectCosts = signal<any>([]);
  public transactionsIndirectCostsPagination = signal<any>([]);

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleColumns();
  }

  ngOnInit(): void {

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
  }

  isColumnVisible(column: string): boolean {
    return this.visibleColumns.includes(column);
  }

  toggleDetails(item: any): void {
    item.showDetails = !item.showDetails;
    //console.log(item.showDetails);
  }


  //traer informacion de movimientos
  searchMovementsUsers(){
    this.#unsubscribe = this.#transactionService.getTransactionsUsers().subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedDataUsers = response.data.data.map((transactions: any) => ({
          //...transactions, // Copia todas las propiedades de 'transactions' y añade o sobreescribe  showDetails: false
          ...transactions,
          showDetails: false, // Añade el campo 'showDetails'
          }));

        this.transactionsUsers.set(updatedDataUsers); // Establece la lista actualizada en la señal 'transactionss'
        this.transactionsUsersPagination.set(response); // Mantén la paginación sin cambios
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  searchMovementsMaintenance(){
    this.#unsubscribe = this.#transactionService.getTransactionsMaintenance().subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedDataMaintenance = response.data.data.map((transactions: any) => ({
          //...transactions, // Copia todas las propiedades de 'transactions' y añade o sobreescribe  showDetails: false
          ...transactions,
          showDetails: false, // Añade el campo 'showDetails'
          }));

        this.transactionsMaintenance.set(updatedDataMaintenance); // Establece la lista actualizada en la señal 'transactionss'
        this.transactionsMaintenancePagination.set(response); // Mantén la paginación sin cambios
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  searchMovementsPurcharseOrders(){
    this.#unsubscribe = this.#transactionService.getTransactionsPurchaseOrders().subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedDataPurcharseOrders = response.data.data.map((transactions: any) => ({
          //...transactions, // Copia todas las propiedades de 'transactions' y añade o sobreescribe  showDetails: false
          ...transactions,
          showDetails: false, // Añade el campo 'showDetails'
          }));

        this.transactionsPurcharseOrders.set(updatedDataPurcharseOrders); // Establece la lista actualizada en la señal 'transactionss'
        this.transactionsPurcharseOrdersPagination.set(response); // Mantén la paginación sin cambios
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  searchMovementsDirectCosts(){
    this.#unsubscribe = this.#transactionService.getTransactionsDirectCosts().subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedDataDirectCosts = response.data.data.map((transactions: any) => ({
          //...transactions, // Copia todas las propiedades de 'transactions' y añade o sobreescribe  showDetails: false
          ...transactions,
          showDetails: false, // Añade el campo 'showDetails'
          }));

        this.transactionsDirectCosts.set(updatedDataDirectCosts); // Establece la lista actualizada en la señal 'transactionss'
        this.transactionsDirectCostsPagination.set(response); // Mantén la paginación sin cambios
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  searchMovementsIndirectCosts(){
    this.#unsubscribe = this.#transactionService.getTransactionsIndirectCosts().subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedDataIndirectCosts = response.data.data.map((transactions: any) => ({
          //...transactions, // Copia todas las propiedades de 'transactions' y añade o sobreescribe  showDetails: false
          ...transactions,
          showDetails: false, // Añade el campo 'showDetails'
          }));

        this.transactionsIndirectCosts.set(updatedDataIndirectCosts); // Establece la lista actualizada en la señal 'transactionss'
        this.transactionsIndirectCostsPagination.set(response); // Mantén la paginación sin cambios
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  paginationUsers(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));
        this.transactionsUsers.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.transactionsUsersPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  paginationMaintenance(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));
        this.transactionsMaintenance.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.transactionsMaintenancePagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  paginationPurcharseOrder(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));
        this.transactionsPurcharseOrders.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.transactionsPurcharseOrdersPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  paginationDirectCosts(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));
        this.transactionsDirectCosts.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.transactionsDirectCostsPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  paginationInDirectCosts(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:any)=>{
         //recorremos cada venta y añadimos el campo 'showDetails' con valor 'false'
         const updatedData = response.data.data.map((sale: any) => ({
          //...sale, // Copia todas las propiedades de 'sale' y añade o sobreescribe  showDetails: false
          ...sale,
          showDetails: false, // Añade el campo 'showDetails'
        }));
        this.transactionsIndirectCosts.set(updatedData); // Establece la lista actualizada en la señal 'sales'
        this.transactionsIndirectCostsPagination.set(response); // Mantén la paginación sin cambios

      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
