import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ErrorProductDetaillResponse, SuccessProductDetaillResponse } from '@interfaces/poducts/IProductGeneral.interface';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { UsersService } from '@services/users/users/users.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    UserCardComponent,
    SpinerPagesComponent,
    NgStyle,
    NgClass
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {

  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  #maintenancesService = inject(MaintenanceService);
  public urlImage = environment.domainimage;
  public users = signal<any>([]);
  public success = signal<any>([]);


  ngOnInit(): void {
    this.getUsers();
    this.searchInputUsers();
  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  #userService = inject(UsersService);
  #unsubscribe!: Subscription;

  getUsers(){
    this.#unsubscribe = this.#userService.getUsers().subscribe({
      next:(response)=>{
        //console.log(response);
        this.users.set(response.data.data);
        this.success.set(response);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  searchInputUsers(){
    this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input')
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((event: any)=>{
        const term = event.target.value;
        if(term === ''){
          //si el input esta vacio llamamos a la funcion getDetailMaintenance
          return this.#userService.getUsers();
        }
        return this.#userService.searchUsers(term);
      })
    )
    .subscribe({
      next:(response)=>{
        //console.log(response);
        this.users.set(response.data.data);
        this.success.set(response);
      },
      error:(error)=>{
        console.log('error prueba');
        console.log(error);
      }
    });
  }

  pagination(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:SuccessProductDetaillResponse)=>{
        this.users.set(response?.data?.data);
        this.success.set(response);
      },
      error:(error:ErrorProductDetaillResponse)=>{
        console.log(error);
      }
    });
  }
}
