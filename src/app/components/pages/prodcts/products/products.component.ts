import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    SmollSumaryCardComponent,
    RouterModule,
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public RouterModule = inject(RouterModule);

  public days = [
    {value:1, label: 'Hoy'},
    {value:7, label: '7 días'},
    {value:15, label: '15 días'},
    {value:30, label: '30 días'},
    {value:90, label: '90 días'},
  ];
  public activeDay:any=this.days[0];

  ngOnInit(): void {
    this.searchBasicInfo(this.activeDay.value);
  }

  setActive(day:any){
    this.activeDay = day;
    this.searchBasicInfo(day.value);
  }

  //buscar informacion basica
  searchBasicInfo(days:number){
    console.log(days);
  }

}
