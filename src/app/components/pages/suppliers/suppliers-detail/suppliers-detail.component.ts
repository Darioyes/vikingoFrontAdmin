import { Component } from '@angular/core';
import { SuppliersCardComponent } from '../suppliers-card/suppliers-card.component';

@Component({
    selector: 'app-suppliers-detail',
    imports: [
        SuppliersCardComponent
    ],
    templateUrl: './suppliers-detail.component.html',
    styleUrl: './suppliers-detail.component.scss'
})
export class SuppliersDetailComponent {

}
