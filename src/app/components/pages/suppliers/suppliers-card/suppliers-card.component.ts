import { Component, input, OnDestroy, OnInit, output } from '@angular/core';

@Component({
    selector: 'app-suppliers-card',
    imports: [],
    templateUrl: './suppliers-card.component.html',
    styleUrl: './suppliers-card.component.scss'
})
export class SuppliersCardComponent implements OnInit, OnDestroy {

  public id = input<number>(0);
  public name = input('');
  public telephone = input('');
  public email = input('');
  public idInformation = output<number>();
  public idDelete = output<number>();

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  public getIdInformation():void {
    this.idInformation.emit(this.id());
  }


  public deleteSupplier(): void {
    this.idDelete.emit(this.id());
  }

}
