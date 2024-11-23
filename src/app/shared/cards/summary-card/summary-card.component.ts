import { DecimalPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-summary-card',
    imports: [
        NgClass,
        DecimalPipe
    ],
    templateUrl: './summary-card.component.html',
    styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {

  public icon = input.required<string>();
  public title = input.required<string>();
  public value = input<string | number>();

}
