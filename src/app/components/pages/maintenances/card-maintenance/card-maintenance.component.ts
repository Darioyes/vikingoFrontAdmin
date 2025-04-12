import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
    selector: 'app-card-maintenance',
    imports: [
        NgStyle,
        DecimalPipe
    ],
    templateUrl: './card-maintenance.component.html',
    styleUrl: './card-maintenance.component.scss'
})
export class CardMaintenanceComponent {


  public color = signal<string>('');

  public id = input();
  public image = input<string>();
  public title = input<string>();
  public progress = input<string>();
  public price = input<number>();
  public response:boolean = false

  public maintenanceDescription = output<any>();
  public maintenanceDelete = output<any>();

  public consultMaintenance():void{
    this.maintenanceDescription.emit(this.id());
  }

  public confirmDeleteMaintenance():void{
    this.maintenanceDelete.emit(this.id());

  }




}
