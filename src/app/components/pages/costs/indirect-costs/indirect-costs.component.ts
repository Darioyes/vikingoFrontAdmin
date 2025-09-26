import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { IndirectCostService } from '@services/cost/indirectCost/indirect-cost.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';

@Component({
    selector: 'app-indirect-costs',
    imports: [
      CommonModule,
      SmollSumaryCardComponent,
      RouterModule,
    ],
    templateUrl: './indirect-costs.component.html',
    styleUrl: './indirect-costs.component.scss'
})
export class IndirectCostsComponent  {

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

  #maintenancesService = inject(MaintenanceService);
  #directCostService = inject(IndirectCostService);
  #unsubscribe!: Subscription;

  public directCosts = signal<any>([]);
  public directCostsPagination = signal<any>([]);

  

}
