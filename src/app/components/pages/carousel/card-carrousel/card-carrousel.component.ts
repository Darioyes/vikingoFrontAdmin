import { NgStyle } from '@angular/common';
import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { environment } from '@enviroments/environment.development';

@Component({
  selector: 'app-card-carrousel',
  imports: [
    NgStyle
  ],
  templateUrl: './card-carrousel.component.html',
  styleUrl: './card-carrousel.component.scss'
})
export class CardCarrouselComponent implements OnInit, OnDestroy {

  public id = input<any>();
  public imageDesktop = input('../../../../../assets/images/1800X650.png');
  //public imageMobile = input('../../../../../assets/images/545x800.png');
  public nameImage = input('Image');
  public order = input(1);
  public product = input('Nombre del producto');
  public state = input('Activo');

  public carrouselId = output();
  public infoId = output();
  public deleteId = output();

  public colorSuccess = environment.colorSuccess;
  public colorDanger = environment.colorDanger;

  ngOnInit(): void {
    // Initialization logic here
  }

  ngOnDestroy(): void {
    // Cleanup logic here
  }
  
  carouselInformation(){
    this.infoId.emit(this.id());
  }

  carouselDelete(){
    this.deleteId.emit(this.id());
  }

}
