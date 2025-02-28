import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupliersServiceService } from '@services/suplier/supliers/supliers-service.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-suppliers',
    imports: [
        CommonModule,
        SmollSumaryCardComponent,
        RouterModule
    ],
    templateUrl: './suppliers.component.html',
    styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent implements OnInit, OnDestroy {

  public totalPurcharse = signal('0');
  public totalSuppliers = signal('0');
  public totalBuys = signal('0');
  public RouterModule = inject(RouterModule);
  #suppliersService = inject(SupliersServiceService);
  #unsubscribe!: Subscription;

  // public days = [
  //   {value:1, label: 'Hoy'},
  //   {value:7, label: '7 días'},
  //   {value:15, label: '15 días'},
  //   {value:30, label: '30 días'},
  //   {value:90, label: '90 días'},
  // ];
  //public activeDay:any=this.days[0];

  ngOnInit(): void {
    //this.searchBasicInfo(this.activeDay.value);
    this.searchBasicInfo();
  }
  ngOnDestroy(): void {

    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    }
  }

  // setActive(day:any){
  //   this.activeDay = day;
  //   this.searchBasicInfo(day.value);
  // }

  //buscar informacion basica
  // searchBasicInfo(days:number){
  //   console.log(days);
  // }

  //buscar informacion basica
  searchBasicInfo(){
    this.#unsubscribe = this.#suppliersService.getInfoBasicSuppliers().subscribe({
      next: (response) => {
        this.totalPurcharse.set(response?.data?.totalPurchases?.total);
        this.totalSuppliers.set(response?.data?.totalSuppliers);
        this.totalBuys.set(response?.data?.totalbuys?.total);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };

}
