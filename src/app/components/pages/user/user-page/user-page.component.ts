import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { UsersService } from '@services/users/users/users.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-page',
    imports: [
        CommonModule,
        SmollSumaryCardComponent,
        RouterModule
    ],
    templateUrl: './user-page.component.html',
    styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy {


  public RouterModule = inject(RouterModule);

  // public days = [
  //   {value:1, label: 'Hoy'},
  //   {value:7, label: '7 días'},
  //   {value:15, label: '15 días'},
  //   {value:30, label: '30 días'},
  //   {value:90, label: '90 días'},
  // ];
  // public activeDay:any=this.days[0];

    public cantClientes = signal(0);
    public cantMale = signal(0);
    public cantFemale = signal(0);
    public averageAge = signal(0);
    public colorPrimary = environment.colorPrimay;
    public colorSuccess = environment.colorSuccess;
    public colorDanger = environment.colorDanger;
    public colorWarning = environment.colorWarning;
    public colorPruimaryGradient = environment.colorPrimaryGradient;
    public colorSuccessGradient = environment.colorSuccessGradient;
    public colorDangerGradient = environment.colorDangerGradient;
    public colorWarningGradient = environment.colorWarningGradient;
    #unsubscribe!:Subscription;
    #userServices = inject(UsersService);

  ngOnInit(): void {
    //this.searchBasicInfo(this.activeDay.value);
    this.infoBasicUser();
  }

  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  // setActive(day:any){
  //   this.activeDay = day;
  //   this.searchBasicInfo(day.value);
  // }

  // //buscar informacion basica
  // searchBasicInfo(days:number){
  // }

  infoBasicUser():void{
    this.#unsubscribe = this.#userServices.getDataBasicUser().subscribe({
      next: (response:any) => {
        this.cantClientes.set(response.data.totalUsuarios);
        this.cantMale.set(response.data.totalHombres[0].total_male);
        this.cantFemale.set(response.data.totalMujeres[0].total_famele);
        this.averageAge.set(response.data.promedioEdad[0].average_age);
      },
      error: (error:any) => {
        console.error(error);
      }
    });
  }

}
