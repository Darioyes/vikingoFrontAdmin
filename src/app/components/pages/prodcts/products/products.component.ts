import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { ProductsService } from '@services/product/product/products.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-products',
    imports: [
        CommonModule,
        SmollSumaryCardComponent,
        RouterModule,
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  public money = signal<string>('$');
  public RouterModule = inject(RouterModule);
  public totalProducts = signal<number>(0);
  public totalStock = signal<number>(0);
  public totalSalesPrice = signal<any>(0);
  public totalCostPrice = signal<number>(0);
  public colorPrimary = environment.colorPrimay;
  public colorPrimaryGradient = environment.colorPrimaryGradient;
  public colorSuccess = environment.colorSuccess;
  public colorSuccessGradient = environment.colorSuccessGradient;
  public colorWarning = environment.colorWarning;
  public colorWarningGradient = environment.colorWarningGradient;
  public colorDanger = environment.colorDanger;
  public colorDangerGradient = environment.colorDangerGradient;

  #unsubscribe!:Subscription; ;
  #infoBasicService = inject(ProductsService);

  // public days = [
  //   {value:1, label: 'Hoy'},
  //   {value:7, label: '7 días'},
  //   {value:15, label: '15 días'},
  //   {value:30, label: '30 días'},
  //   {value:90, label: '90 días'},
  // ];
  //public activeDay:any=this.days[0];

  ngOnInit(): void {
    // this.searchBasicInfo(this.activeDay.value);
    this.searchBasicInfo();
  }
  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  // setActive(day:any){
  //   this.activeDay = day;
  //   this.searchBasicInfoButtons(day.value);
  // }

  //buscar informacion basica con botones
  searchBasicInfoButtons(days:number){
    console.log(days);
  }

  //buscar informacion basica
  searchBasicInfo(){
    this.#unsubscribe = this.#infoBasicService.infoBasicProducts().subscribe({
      next:(response)=>{
        //console.log(response.data);
        this.totalProducts.set(response.data.totalProducts);
        this.totalStock.set(response.data.totalStock);
        this.totalSalesPrice.set(response.data.totalPrice);
        this.totalCostPrice.set(response.data.totalCost);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

}
