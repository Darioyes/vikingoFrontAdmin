import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { SuccessMaintenanceResponse, ErrorMaintenanceResponse } from '@interfaces/maintenances/IGeneralMtto.interface';
import { MaintenanceProgressService } from '@services/maintenance/maintenanceProgress/maintenance-progress.service';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    SmollSumaryCardComponent,
    RouterModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {

    public RouterModule = inject(RouterModule);
    #categoriesProductService = inject(CategoriesProductsService);


    public colorPrimary = environment.colorPrimay;
    public colorPrimaryGradient = environment.colorPrimaryGradient;
    public colorSuccess = environment.colorSuccess;
    public colorSuccessGradient = environment.colorSuccessGradient;
    public colorWarning = environment.colorWarning;
    public colorWarningGradient = environment.colorWarningGradient;
    public colorDanger = environment.colorDanger;
    public colorDangerGradient = environment.colorDangerGradient;
  
    public products = signal<number | any>(0);
    public directCosts = signal<number | any>(0);
    public indirectCosts = signal<number | any>(0);
    //public finalized = signal<number | any>(0);
  
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
      this.totalCategories();
    }

    ngOnDestroy(): void {
      
    }

  public totalCategories() {
    this.#categoriesProductService.getTotalCategories().subscribe({
      next: (response) => {
        this.products.set(response.data.totalProducts);
        this.directCosts.set(response.data.totalDirectCosts);
        this.indirectCosts.set(response.data.totalIndirectCosts);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
