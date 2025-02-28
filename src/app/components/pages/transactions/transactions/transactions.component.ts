import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionService } from '@services/transactions/transaction/transaction.service';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-transactions',
    imports: [
        CommonModule,
        SmollSumaryCardComponent,
        RouterModule
    ],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit, OnDestroy {

  public RouterModule = inject(RouterModule);
  public countFamele = signal(0);
  public countMale = signal(0);
  public countOther = signal(0);
  #transactionService = inject(TransactionService);
  #unsubscribe!: Subscription;

  // public days = [
  //   {value:1, label: 'Hoy'},
  //   {value:7, label: '7 días'},
  //   {value:15, label: '15 días'},
  //   {value:30, label: '30 días'},
  //   {value:90, label: '90 días'},
  // ];
  //public activeDay:any=this.days[4];

  ngOnInit(): void {
    //this.searchBasicInfo(this.activeDay.value);
    this.searchBasicInfo();
  }

  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  setActive(day:any){
    //this.activeDay = day;
    //this.searchBasicInfo(day.value);
  }

  //buscar informacion basica
  searchBasicInfo(){
    this.#unsubscribe = this.#transactionService.getSumaryTransactions().subscribe({
      next:(response:any)=>{
        this.countFamele.set(response?.data?.totalTrasantionsFamele);
        this.countMale.set(response?.data?.totalTransactionsMale);
        this.countOther.set(response?.data?.totalTransactions);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
