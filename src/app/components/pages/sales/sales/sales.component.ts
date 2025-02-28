import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { SalesMainService } from '@services/sales/salesMain/sales-main.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sales',
    imports: [
        CommonModule,
        SmollSumaryCardComponent,
        RouterModule
    ],
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit, OnDestroy {

  public RouterModule = inject(RouterModule);
  public colorPrimary = environment.colorPrimay;
  public colorPrimaryGradient = environment.colorPrimaryGradient;
  public colorSuccess = environment.colorSuccess;
  public colorSuccessGradient = environment.colorSuccessGradient;
  public colorWarning = environment.colorWarning;
  public colorWarningGradient = environment.colorWarningGradient;
  public colorDanger = environment.colorDanger;
  public colorDangerGradient = environment.colorDangerGradient;

  #salesService = inject(SalesMainService);
  #unsubscribe!: Subscription;

  public salesTotal = signal<number>(0);
  public costTotal = signal<number>(0);
  public amoutnTotal = signal<number>(0);
  public cofirmTotal = signal<number>(0);


  public days = [
    {value:1, label: 'Hoy'},
    {value:7, label: '7 días'},
    {value:15, label: '15 días'},
    {value:30, label: '30 días'},
    {value:90, label: '90 días'},
  ];
  public activeDay:any=this.days[4];

  ngOnInit(): void {
    this.searchBasicInfoSales(this.activeDay.value);
  }
  ngOnDestroy(): void {
    if (this.#unsubscribe) {
      this.#unsubscribe.unsubscribe();
    }
  }


  setActive(day:any){
    this.activeDay = day;
    this.searchBasicInfoSales(day.value);
  }

  //buscar informacion basica
  searchBasicInfoSales(days:number){

    this.#unsubscribe = this.#salesService.getSumarySales(days).subscribe({
      next: (response) => {
        this.salesTotal.set(response.data.sales);
        this.costTotal.set(response.data.cost);
        this.amoutnTotal.set(response.data.amount);
        this.cofirmTotal.set(response.data.salesToApprove);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

}
