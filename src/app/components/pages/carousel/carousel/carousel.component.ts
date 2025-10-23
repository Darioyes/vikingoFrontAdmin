import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SmollSumaryCardComponent } from '@shared/cards/smoll-sumary-card/smoll-sumary-card.component';

@Component({
  selector: 'app-carousel',
  imports: [
    CommonModule,
    //SmollSumaryCardComponent,
    RouterModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

}
