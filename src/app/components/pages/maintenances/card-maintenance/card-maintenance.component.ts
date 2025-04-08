import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { AlertsService } from '@services/alerts/alerts.service';

@Component({
    selector: 'app-card-maintenance',
    imports: [
        NgStyle,
        DecimalPipe
    ],
    templateUrl: './card-maintenance.component.html',
    styleUrl: './card-maintenance.component.scss'
})
export class CardMaintenanceComponent implements OnInit {


  public color = signal<string>('');

  public id = input();
  public image = input<string>();
  public title = input<string>();
  public progress = input<string>();
  public price = input<number>();
  public response:boolean = false

  public maintenanceDescription = output<any>();
  public maintenanceDelete = output<any>();

  #alertSevice = inject(AlertsService);

  ngOnInit(): void {
    //console.log(this.id());
  }

  public consultMaintenance():void{
    this.maintenanceDescription.emit(this.id());
  }

  public confirmDeleteMaintenance():void{
    this.maintenanceDelete.emit(this.id());

  }




}
