import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorMaintenanceResponse, SuccessMaintenanceResponse } from '@interfaces/maintenances/IGeneralMtto.interface';
import { MaintenanceProgressService } from '@services/maintenance/maintenanceProgress/maintenance-progress.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';

@Component({
  selector: 'app-maintenances',
  standalone: true,
  imports: [
    CommonModule,
    SmollSumaryCardComponent,
    RouterModule
  ],
  templateUrl: './maintenances.component.html',
  styleUrl: './maintenances.component.scss'
})


export class MaintenancesComponent implements OnInit {

  public RouterModule = inject(RouterModule);
  #maintenanceProgressService = inject(MaintenanceProgressService);

  public joined = signal<number | any>(0);
  public inProgress = signal<number | any>(0);
  public authorization = signal<number | any>(0);
  public finalized = signal<number | any>(0);

  public days = [
    {value:1, label: 'Hoy'},
    {value:7, label: '7 días'},
    {value:15, label: '15 días'},
    {value:30, label: '30 días'},
    {value:90, label: '90 días'},
  ];
  public activeDay:any=this.days[4];

  ngOnInit(): void {
    this.searchBasicInfo(this.activeDay.value);
  }

  setActive(day:any){
    this.activeDay = day;
    this.searchBasicInfo(day.value);
  }

  //buscar informacion basica
  searchBasicInfo(days:number){
    this.#maintenanceProgressService.searchProgressMaintenance(days).subscribe({
      next:(response:SuccessMaintenanceResponse)=>{
        let joined = 0;
        let inProgress = 0;
        let authorization = 0;
        let finalized = 0;
        //si existe la data
        if(response.data){
          //recorremos la  data
          response.data?.forEach(item => {
            //si el item.advance es igual a inProgress;
            if(item.advance === 'in_progress' && item.total){
              inProgress = item.total;
            }
            //si el item.advance es igual a joined;
            if(item.advance === 'joined' && item.total){
              joined = item.total;
            }

            //si el item.advance es igual a authorization;
            if(item.advance === 'authorization' && item.total){
              authorization = item.total;
            }
            //si el item.advance es igual a finalized;
            if(item.advance === 'finalized' && item.total){
              finalized = item.total;
            }
          });
        };
        this.joined.set(joined);
        this.inProgress.set(inProgress);
        this.authorization.set(authorization);
        this.finalized.set(finalized);
      },
      error:(error:ErrorMaintenanceResponse)=>{
        console.log(error);
      }
    });
  }

}
