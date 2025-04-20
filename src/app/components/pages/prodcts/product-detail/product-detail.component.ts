import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { IProductDetaill } from '@interfaces/poducts/IProductDetail.interface';
import { ErrorProductDetaillResponse, SuccessProductDetaillResponse } from '@interfaces/poducts/IProductGeneral.interface';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { ProductsService } from '@services/product/product/products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, switchMap } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
    selector: 'app-product-detail',
    imports: [
        ProductCardComponent,
        SpinerPagesComponent,
        NgClass,
        NgStyle
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  //viewChild para obtener el valor del input
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  public products = signal<IProductDetaill |any >([]);
  public productsPage = signal<SuccessProductDetaillResponse | any>([]);
  public urlImg = environment.domainimage;

  #maintenancesService = inject(MaintenanceService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  public productService = inject(ProductsService);
  public router = inject(Router)

  ngOnInit(): void {
    this.getProductsAll();
    this.searcInputProducts();
  }

  ngOnDestroy(): void {
    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }

  getProductsAll(){

  this.#unsubscribe = this.productService.getProducts().subscribe({
    next:(response:SuccessProductDetaillResponse)=>{
      this.products.set(response?.data?.data);
      this.productsPage.set(response);
     //console.log(this.products());
    },
    error:(error:ErrorProductDetaillResponse)=>{
      console.log(error);
    }
  });

  }

  public getProduct(id: number){
    this.router.navigate(['./home/productos/consulta-productos'],{queryParams:{id:id}});
  }



  pagination(url:string){
    this.#unsubscribe = this.#maintenancesService.getPaginator(url).subscribe({
      next:(response:SuccessProductDetaillResponse)=>{
        this.products.set(response?.data?.data);
        this.productsPage.set(response);
      },
      error:(error:ErrorProductDetaillResponse)=>{
        console.log(error);
      }
    });
  }

  async confirmDeleteProduct(id:number) {
    const confirm = await this.#alertService.openAlert('alert', '¿Seguro que desea eliminar este producto?');
    if (confirm) {
      this.delelteProduct(id);
    } else {
      //console.log('Cancelado');
    }
  }

  public delelteProduct(id:number){
    this.#unsubscribe = this.productService.deleteProduct(id).subscribe({
      next:(response)=>{
        this.#alertService.showAlert('success', response.message);
        this.getProductsAll();
      },
      error:(error:ErrorProductDetaillResponse)=>{
        console.log(error);
        this.#alertService.showAlert('error', 'Error al eliminar el producto');
      }
    });
  }

  public newProductRedirect(){
    this.router.navigate(['./home/productos/nuevo-producto']);
  }

  searcInputProducts(){

    this.#unsubscribe = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500), // Espera 500 ms después de la última entrada
      distinctUntilChanged(), // Evita búsquedas redundantes
      switchMap((event: any) => {
        //creamos la constante term que almacena el valor del input
        const term = event.target.value;
        if(term === ''){
          //si el input esta vacio llamamos a la funcion getDetailMaintenance
          return this.productService.getProducts();
        }
        //retornamos el servicio de busqueda
        return this.productService.searchProducts(term);
      })
    ).subscribe({
      next:(response:SuccessProductDetaillResponse)=>{
        //console.log(response);
        this.products.set(response?.data?.data);
        this.productsPage.set(response);
      },
      error:(error:ErrorProductDetaillResponse)=>{
        console.log(error);
      }
    });
  }

}
