import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';

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


  public image = input<string>();
  public title = input<string>();
  public progress = input<string>();
  public price = input<number>();

  ngOnInit(): void {

  }



}
