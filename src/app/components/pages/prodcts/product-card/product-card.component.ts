import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { environment } from '@enviroments/environment.development';

@Component({
    selector: 'app-product-card',
    imports: [
        DecimalPipe,
        NgStyle
    ],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  public img = input<string>('../../../../../assets/images/predeterminada.jpg');
  public title = input<string>('Titulo');
  public price = input<number>(0);
  public cost = input<number>(0);
  public stock = input<number>(0);

  colorSuccess = environment.colorSuccess;
  colorDanger = environment.colorDanger;
  colorWarning = environment.colorWarning;
}
