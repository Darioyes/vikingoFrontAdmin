import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { DirectCostService } from '@services/cost/directCost/direct-cost.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';

@Component({
    selector: 'app-direct-costs',
    imports: [
      CommonModule,
      SmollSumaryCardComponent,
      RouterModule,
    ],
    templateUrl: './direct-costs.component.html',
    styleUrl: './direct-costs.component.scss'
})
export class DirectCostsComponent implements OnInit, OnDestroy {

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

  public directCosts = signal<any>([]);
  public directCostsPagination = signal<any>([]);
  public resumeData = signal<any>([]);

  #directCostService = inject(DirectCostService);
  #alertService = inject(AlertsService);
  #unsubscribe!: Subscription;


  ngOnInit(): void {
    this.sumaryDirectCosts();
  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  sumaryDirectCosts(){
    this.#unsubscribe =this.#directCostService.getSumaryDirectCosts().subscribe({
      next:(response) => {
        this.resumeData.set(response.data);
      },
      error:(error) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

}
