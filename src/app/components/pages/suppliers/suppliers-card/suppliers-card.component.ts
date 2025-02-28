import { Component, input } from '@angular/core';

@Component({
    selector: 'app-suppliers-card',
    imports: [],
    templateUrl: './suppliers-card.component.html',
    styleUrl: './suppliers-card.component.scss'
})
export class SuppliersCardComponent {

  public name = input('');
  public telephone = input('');
  public email = input('');

}
