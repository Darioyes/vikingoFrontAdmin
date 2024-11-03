import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {

  public icon = input<string>();
  public title = input<string>();
  public value = input<string | number>();

}
