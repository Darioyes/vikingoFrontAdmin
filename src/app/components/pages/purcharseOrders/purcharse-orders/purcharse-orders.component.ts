import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';

@Component({
  selector: 'app-purcharse-orders',
  imports: [
    CommonModule,
    SmollSumaryCardComponent,
    RouterModule
  ],
  templateUrl: './purcharse-orders.component.html',
  styleUrl: './purcharse-orders.component.scss'
})
export class PurcharseOrdersComponent implements OnInit {

  public colorPrimary = environment.colorPrimay;
  public colorPrimaryGradient = environment.colorPrimaryGradient;
  public colorSuccess = environment.colorSuccess;
  public colorSuccessGradient = environment.colorSuccessGradient;
  public colorWarning = environment.colorWarning;
  public colorWarningGradient = environment.colorWarningGradient;
  public colorDanger = environment.colorDanger;
  public colorDangerGradient = environment.colorDangerGradient;

  public joined = signal<number | any>(0);
  public inProgress = signal<number | any>(0);
  public authorization = signal<number | any>(0);
  public finalized = signal<number | any>(0);

  public days = [
  {value:1, label: 'Hoy'},
  {value:7, label: '7 días'},
  {value:30, label: '30 días'},
  {value:90, label: '90 días'},
  {value:180, label: '6 meses'},
  {value:365, label: '1 año'},
  ];
  public activeDay:any=this.days[4];

  ngOnInit(): void {
    
  }

  setActive(day:any){
  this.activeDay = day;
  this.searchBasicInfo(day.value);
  }

   searchBasicInfo(days:number){}


}
