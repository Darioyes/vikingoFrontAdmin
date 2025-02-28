import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-smoll-sumary-card',
    imports: [
        NgStyle,
        DecimalPipe
    ],
    templateUrl: './smoll-sumary-card.component.html',
    styleUrl: './smoll-sumary-card.component.scss'
})
export class SmollSumaryCardComponent {

  public color = input<string>();
  public gradient = input<string>();
  public name = input<string>();
  public amount = input<string | number>()
  public money = input<boolean>();

}
