import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { CardCarrouselComponent } from '../card-carrousel/card-carrousel.component';
import { BannerService } from '@services/banner/banner.service';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { AlertsService } from '@services/alerts/alerts.service';
import { environment } from '@enviroments/environment.development';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-list',
  imports: [
    CardCarrouselComponent,
    SpinerPagesComponent,
    CdkDropList, 
    CdkDrag
  ],
  templateUrl: './carousel-list.component.html',
  styleUrl: './carousel-list.component.scss'
})
export class CarouselListComponent implements OnInit, OnDestroy {

  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  #bannerService = inject(BannerService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #router = inject(Router);

  public carousel = signal<any>([]);
  public newOrder = signal<any>([]);
  public success = signal<string>('');
  public urlImage = environment.domainimage;

  ngOnInit() {
    this.getBanners();
    this.searchInputUsers();
  }

  ngOnDestroy() {
    this.#unsubscribe.unsubscribe();
  }

  getBanners():void{
    this.#unsubscribe = this.#bannerService.getBanners().subscribe({
      next:(response)=>{
        this.carousel.set(response.data);
        this.success.set(response.response);
      },
      error:(error)=>{
        console.log(error);
         this.#alertService.showAlert('error', 'Comunicarse con el administrador');
      }
    });
  }

  drop(event: CdkDragDrop<any[]>):void {
    const current = this.carousel();

    // Reorganiza el array localmente
    moveItemInArray(current, event.previousIndex, event.currentIndex);

    // Actualiza la señal (para que Angular renderice el nuevo orden)
    this.carousel.set(current);

    // Reasigna los valores de orden
    const newOrder = current.map((item:any, index:any) => ({
      id: item.id,
      order: index + 1
    }));

    this.newOrder.set(newOrder);

    // Envía al backend el nuevo orden
    //this.saveNewOrder(newOrder);
  }

  saveNewOrder(newOrder: { id: number; order: number }[]):void {
    this.#bannerService.updateBannerOrder(newOrder).subscribe({
      next: (res) => {
        this.#alertService.showAlert('success', 'Orden actualizado correctamente');
        this.getBanners();
      },
      error: (err) => {
        console.log(err);
        this.#alertService.showAlert('error', 'Comunicarse con el administrador');
      }
    });
  }

  searchInputUsers(): void {
    this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input')
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((event: any)=>{
        const term = event.target.value;
        if(term === ''){
          //si el input esta vacio llamamos a la funcion getDetailMaintenance
          return this.#bannerService.getBanners();
        }
        return this.#bannerService.searchCarousel(term);
      })
    )
    .subscribe({
      next:(response)=>{
        //console.log(response);
        this.carousel.set(response.data);
        this.success.set(response.response);
      },
      error:(error)=>{
        this.#alertService.showAlert('error', 'Comunicarse con el administrador');
        console.log(error);
      }
    });
  }

  cancelChanges():void {
    this.getBanners();
  }

  infoCarousel(id:any):void{
    this.#router.navigate(['home/Banner/banner-info'],{queryParams:{id:id}});
  }

   async confirmDeleteCarousel(id:any):Promise<void>{
        const confirm = await this.#alertService.openAlert('alert', '¿Seguro que desea eliminar este cliente?');
    if (confirm) {
      this.deleteCarousel(id);
    }
  }

  createCarousel():void{
    this.#router.navigate(['home/Banner/crear-banner']);
  }

  deleteCarousel(id:any):void{
    this.#bannerService.deleteBanner(id).subscribe({
      next:(response)=>{
        this.#alertService.showAlert('success', 'Carrusel eliminado correctamente');
        this.getBanners();
      },
      error:(error)=>{
        console.log(error);
        this.#alertService.showAlert('error', 'Comunicarse con el administrador');
      }
    });
  }

}
