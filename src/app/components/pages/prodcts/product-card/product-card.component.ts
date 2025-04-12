import { CurrencyPipe, DecimalPipe, NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { environment } from '@enviroments/environment.development';

@Component({
    selector: 'app-product-card',
    imports: [
        DecimalPipe,
        CurrencyPipe,
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
  public id = input();

  public idDelete = output<any>();
  public idProduct = output<any>();
  public modify = output<any>();

  colorSuccess = environment.colorSuccess;
  colorDanger = environment.colorDanger;
  colorWarning = environment.colorWarning;


  public productId(): void {
    this.idProduct.emit(this.id())
  }
  public deleteId(): void {
    this.idDelete.emit(this.id())

  }

  public modifyProductId(): void{
    this.modify.emit(this.id());
  }

}
