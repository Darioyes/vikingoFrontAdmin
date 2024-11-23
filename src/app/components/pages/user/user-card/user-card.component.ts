import { NgStyle } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { environment } from '@enviroments/environment.development';

@Component({
    selector: 'app-user-card',
    imports: [
        NgStyle
    ],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {
  constructor() {}



  public name = input('john');
  public lastName = input('doe');
  public userRole = input('admin');
  public image = input('../../../../../assets/images/avatar.jpg');
  public phone = input('123456789');
  public email = input('correo@correo.com');
  public gender = input();

  public color!: string;
  public colorMale = environment.colorMale;
  public colorFemale = environment.colorFemale;
  public colorOther = environment.colorOther;

  ngOnInit(): void {
    this.colorUsers();
  }

  colorUsers(){
    if(this.gender()==='male'){
      this.color = this.colorMale;

    }else if(this.gender()==='famele'){
      this.color = this.colorFemale;
    }else{
      this.color = this.colorOther;
    };
  }

}
