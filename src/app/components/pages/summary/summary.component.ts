import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ErrorResponse, SuccessResponse } from '@interfaces/response/IGeneralResponse';
import { IDaySummary } from '@interfaces/summary/ISummaryBasic.interface';
import { SummaryService } from '@services/summary/summary.service';
import { SummaryCardComponent } from '@shared/cards/summary-card/summary-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    SummaryCardComponent,
    NgClass
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit, OnDestroy {

  public days = [
    {value:1, label: 'Hoy'},
    {value:7, label: '7 días'},
    {value:15, label: '15 días'},
    {value:30, label: '30 días'},
    {value:90, label: '90 días'},
  ];
  //dia activo siempre sera el 1 por defecto ya que esta en el array en la posición 0
  public activeDay:IDaySummary=this.days[4];

  public directCost = signal<SuccessResponse | any>(0);
  public indirectCost = signal<SuccessResponse | any>(0);
  public sales = signal<SuccessResponse | any>(0);
  public maintenances = signal<SuccessResponse | any>(0);

  //inyectamos el servicio de summary
  #summaryService = inject(SummaryService);
  #unsubscribe!: Subscription;


  ngOnInit(): void {
    this.searchBasicInfo(this.activeDay.value);
  }

  ngOnDestroy(): void {
    this.#unsubscribe.unsubscribe();
  }

  setActive(day:IDaySummary){
    this.activeDay = day;
    this.searchBasicInfo(day.value);
  }

  //buscar informacion basica
  searchBasicInfo(days:number){
    this.#unsubscribe = this.#summaryService.searchBasicInfo(days).subscribe({
      next: (response:SuccessResponse)=>{
        this.directCost.set(response.data?.directCosts);
        this.indirectCost.set(response.data?.indirectCosts);
        this.sales.set(response.data?.sales);
        this.maintenances.set(response.data?.maintenances);
      },
      error: (error:ErrorResponse)=>{
        console.log(error);
      }
    });
  }


}
