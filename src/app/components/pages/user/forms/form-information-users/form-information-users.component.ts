import { DatePipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { CitiesService } from '@services/cities/cities.service';
import { UsersService } from '@services/users/users/users.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-information-users',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    NgClass,
    SpinerPagesComponent,
  ],
  templateUrl: './form-information-users.component.html',
  styleUrl: './form-information-users.component.scss'
})
export class FormInformationUsersComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;

  #userService = inject(UsersService);
  #citiesService = inject(CitiesService);
  #unsubscribe!: Subscription;
  #router = inject(Router);
  #routeId = inject(ActivatedRoute);
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);

  public userId = signal<any>(0);
  public user = signal<any>([]);
  public success = signal<any>('');
  public modifyInput = signal<boolean>(false);
  public userData = signal<any>(null);
  public city = signal<any>([]);

  public existsImage = signal<string>('');
  public previewImage: string | ArrayBuffer | null = null;
  public image: File | null = null;
  public urlImg = environment.domainimage;

  public formbuilder = inject(FormBuilder);
  public userForm: any = new FormGroup({});

  ngOnInit() {
    this.idIser();
    this.infoUser(this.userId());
    this.formUser();
    this.cities();
  }

  ngOnDestroy() {
    this.#unsubscribe.unsubscribe();
  }

  public idIser(){
    this.userId.set(
      Number(this.#routeId.snapshot.queryParams['id'])
    );
  }

  //esta funcion es para abrir el input file
  public triggerFileInput(): void {
    //this.fileInput1.nativeElement.click();
    this.fileInput1.nativeElement.click();
  }

  public formUser(){
      this.userForm = this.formbuilder.group({
        // users_id: [''],
        name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(45)])],
        lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(45)])],
        email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(255)])],
        gender: ['', Validators.compose([Validators.required])],
        birthday: ['', Validators.compose([Validators.required])],
        phone1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$')])],
        phone2: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$')])],
        address: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
        vikingo_roles_id: ['', Validators.compose([Validators.required])],
        cities_id: ['', Validators.compose([Validators.required])],
        status: ['', Validators.compose([Validators.required])],
      });
    }

  // get users_id(){ return this.productForm.get('users_id'); }
  get name(){ return this.userForm.get('name'); }
  get lastname(){ return this.userForm.get('lastname'); }
  get email(){ return this.userForm.get('email'); }
  get gender(){ return this.userForm.get('gender'); }
  get birthday(){ return this.userForm.get('birthday'); }
  get phone1(){ return this.userForm.get('phone1'); }
  get phone2(){ return this.userForm.get('phone2'); }
  get address(){ return this.userForm.get('address'); }
  get vikingo_roles_id(){ return this.userForm.get('vikingo_roles_id'); }
  get cities_id(){ return this.userForm.get('cities_id'); }
  get status(){ return this.userForm.get('status'); }

    //funcion para llenar los datos en el formulario
  public fillProductForm():void{
    setTimeout(() => {
      this.userForm.setValue({
        name: this.user().name,
        lastname: this.user().lastname,
        email: this.user().email,
        gender: this.user().gender,
        birthday: this.user().birthday,
        phone1: this.user().phone1,
        phone2: this.user().phone2,
        address: this.user().address,
        vikingo_roles_id: this.user().vikingo_roles_id,
        cities_id: this.user().cities_id,
        status: this.user().status,

      });
    }, 500);
  }

 //esta funcion es para manejar el archivo seleccionado
 public onFileSelected(event: Event): void {
  //const file = event.target.files[0]; //esta es cuando se usa el input file directamente
  // la constante input es el elemento input del archivo
  const input = event.target as HTMLInputElement;
  // validar si hay archivos seleccionados
  if (input.files && input.files.length > 0) {
    // la constante file es el primer archivo seleccionado
    const file = input.files[0];
    // validar si el archivo es una imagen
    if (file && file.type.startsWith('image/')) {
      // la constante reader es un objeto FileReader
      // que se utiliza para leer el contenido del archivo
      const reader = new FileReader();
      // reader.onload es un evento que se activa cuando el archivo se ha leído correctamente
      // y se asigna el resultado a la propiedad previewImage
      reader.onload = () => {
            this.previewImage = reader.result;
            this.image = file;
            // Marca el control como "touched"
            this.userForm.get('image')?.markAsTouched();
      };

      reader.readAsDataURL(file);
    } else {
      this.#alertService.showAlert('info','Solo se permite archivos de tipo imagen.');
    }
  }
}



  public infoUser(id:any){
    this.#unsubscribe = this.#userService.getUser(id).subscribe({
      next:(response)=>{
        this.user.set(response.data);
        this.success.set(response.response);
        this.existsImage.set(this.user()?.image?.replace('public', 'storage'));
        this.previewImage = this.urlImg + this.existsImage();
      },
      error:(error)=>{
        console.log(error);
        this.#alertService.showAlert('alert', 'Error al cargar el usuario');
      },
    });
  }

  public cities(){
    this.#unsubscribe = this.#citiesService.getCities().subscribe({
      next:(response)=>{
        this.city.set(response.data)
      },
      error:(error)=>{
        console.log(error);
        this.#alertService.showAlert('alert', 'Error al cargar las ciudades');
      }
    })

  }
  public modifyUserDetail():void{
    this.modifyInput.set(!this.modifyInput());
    this.previewImage = this.urlImg + this.existsImage();
    this.image = null;
    //resetear los inputs de los archivos
    this.fileInput1.nativeElement.value = '';

    if (this.modifyInput()) {
      // Inicializa y llena el formulario solo cuando se active el modo de edición
      this.fillProductForm();

    }

  }


  public userFormClose(){
    this.#router.navigate(['./home/clientes/detalle-clientes']);
  }

  public modifyUserForm(id:number):void{
    //Validamos si el formulario es valido
    if(this.userForm.valid){
      const data = new FormData();
      data.append('_method','PUT');
      Object.keys(this.userForm.value).forEach(key => {
        data.append(key, this.userForm.get(key)?.value);
      });
      if (this.image) {
        data.append('image', this.image);
      } else if (this.user().image) {
        // Si no hay nueva imagen pero existe una anterior
        data.append('keep_image', 'true'); // Envía un flag al backend
      }

      //ver toda la información que esta en el formData
      // data.forEach((value, key) => {
      //   console.log(key, value);
      // });

      if(this.#cookiesService.check('token')){
        this.#unsubscribe = this.#userService.modifyUser(id, data).subscribe({
          next:(response)=>{
            this.success.set(response.response);
            this.#alertService.showAlert('success', response.message);
            this.modifyInput.set(!this.modifyInput());
            this.infoUser(this.userId());
            //si el id del usuario es igual al id que esta en las cokies actualizamos las cookies
            if(this.userId() == this.#cookiesService.get('id')){
              console.log('cookie')
              const expiresDate = new Date();
              expiresDate.setDate(expiresDate.getDate() + 30);
              this.#cookiesService.set('name', response.data!.name!, expiresDate, '/', undefined, true, 'Strict');
              this.#cookiesService.set('lastname', response.data!.lastname!, expiresDate, '/', undefined, true, 'Strict');
              this.#cookiesService.set('avatar', response.data!.image!, expiresDate, '/', undefined, true, 'Strict');

            }
          },
          error:(error)=>{
            console.log(error);
            this.#alertService.showAlert('alert', 'Error al modificar el usuario');
          }
        });
      }else{
        this.#alertService.showAlert('alert', 'Por favor inicie sesión');
      }
    }else{
      this.#alertService.showAlert('alert', 'Por favor complete todos los campos requeridos');
    }


  }

}
