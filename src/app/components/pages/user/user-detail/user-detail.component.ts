import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { ErrorProductDetaillResponse, SuccessProductDetaillResponse } from '@interfaces/poducts/IProductGeneral.interface';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { UsersService } from '@services/users/users/users.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
    selector: 'app-user-detail',
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
  #userService = inject(UsersService);
  #unsubscribe!: Subscription;
  #router = inject(Router);
  #alertService = inject(AlertsService);
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

  public userInformationId(id:any):void{
   this.#router.navigate(['home/clientes/consulta-clientes'],{queryParams:{id:id}});
  }

  public newUser():void{
    this.#router.navigate(['home/clientes/nuevo-cliente']);
  }

  async confirmDeleteUser(id:any) {
    const confirm = await this.#alertService.openAlert('alert', '¿Seguro que desea eliminar este cliente?');
    if (confirm) {
      this.delelteUser(id);
    }
  }

  public delelteUser(id:any){
    this.#unsubscribe = this.#userService.deleteUser(id).subscribe({
      next:(response)=>{
        this.#alertService.showAlert('success', response.message);
        this.getUsers();
      },
      error:(error:ErrorProductDetaillResponse)=>{
        console.log(error);
        this.#alertService.showAlert('error', 'Error al eliminar el usuario');
      }
    });
  }

}
