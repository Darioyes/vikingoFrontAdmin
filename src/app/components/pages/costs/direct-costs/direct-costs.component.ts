import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
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

    #maintenancesService = inject(MaintenanceService);


    public directCosts = signal<any>([]);
    public directCostsPagination = signal<any>([]);



  ngOnInit(): void {

  }

  ngOnDestroy(): void {

    }

}
