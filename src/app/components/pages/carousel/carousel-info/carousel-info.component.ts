import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { BannerService } from '@services/banner/banner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel-info',
  imports: [],
  templateUrl: './carousel-info.component.html',
  styleUrl: './carousel-info.component.scss'
})
export class CarouselInfoComponent implements OnInit, OnDestroy {

  #bannerService = inject(BannerService);
  #unsubscribe!: Subscription;
  #router = inject(ActivatedRoute);
  #alertService = inject(AlertsService);

  public id = signal<number>(0);
  public urlImage = environment.domainimage;
  public banner = signal<any>([]);

  //  Variables para manejar el carrusel
  public currentImageIndex = signal<number>(0);
  public imageList = signal<string[]>([]);
  public currentImage = signal<string>('');

  ngOnInit(): void {
    this.getBanner();
  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  public idSale(){
    this.id.set(
      Number(this.#router.snapshot.queryParams['id'])
    );
  }

  public getBanner():void{
    this.idSale();
    this.#unsubscribe = this.#bannerService.getBanner(this.id()).subscribe({
      next: (response:any) => {
        this.banner.set(response.data);
        console.log(response);
           // 🔹 Arreglo de imágenes dinámico
        const data = response.data;

        const images: string[] = [
          data.image ? this.urlImage + data.image.replace('public', 'storage') : '',
          data.image2 ? this.urlImage + data.image2.replace('public', 'storage') : '',
          data.image3 ? this.urlImage + data.image3.replace('public', 'storage') : ''
        ].filter(img => img !== '');

        this.imageList.set(images);
        this.currentImage.set(images[0]); // Inicializamos con la primera
      },
      error: (error:any) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
    });
  }

    // 🔹 Función para ir a la siguiente imagen
  public nextImage(): void {
    const index = (this.currentImageIndex() + 1) % this.imageList().length;
    this.currentImageIndex.set(index);
    this.animateTransition(index);
  }

  // 🔹 Función para ir a la imagen anterior
  public prevImage(): void {
    const index =
      (this.currentImageIndex() - 1 + this.imageList().length) % this.imageList().length;
    this.currentImageIndex.set(index);
    this.animateTransition(index);
  }

  private animateTransition(index: number): void {
  const imgElement = document.querySelector('.container-carousel__image--img img') as HTMLElement;
    if (imgElement) {
      imgElement.classList.remove('fade-in');
    }

    // Espera un pequeño tiempo antes de cambiar la imagen para que el navegador detecte el cambio de opacidad
    setTimeout(() => {
      this.currentImage.set(this.imageList()[index]);

      if (imgElement) {
        void imgElement.offsetWidth; // Forzamos reflow
        imgElement.classList.add('fade-in');
      }
    }, 400);
  }

}
