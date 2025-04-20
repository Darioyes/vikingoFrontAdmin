import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { CitiesService } from '@services/cities/cities.service';
import { UsersService } from '@services/users/users/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-new-users',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-new-users.component.html',
  styleUrl: './form-new-users.component.scss'
})
export class FormNewUsersComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;

  #userService = inject(UsersService);
  #citiesService = inject(CitiesService);
  #unsubscribe!: Subscription;
  #router = inject(Router);
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);

  public city = signal<any>([]);

  public existsImage = signal<string>('');
  public previewImage: string | ArrayBuffer | null = null;
  public image: File | null = null;

  public viewPassword = signal(false)

  public urlImg = environment.domainimage;

  public formbuilder = inject(FormBuilder);
  public userForm: any = new FormGroup({});

  ngOnInit(): void {
    this.formUser();
    this.cities();
  }

  ngOnDestroy(): void {

    this.#unsubscribe.unsubscribe();
  }

  //esta funcion es para abrir el input file
  public triggerFileInput(): void {
    //this.fileInput1.nativeElement.click();
    this.fileInput1.nativeElement.click();
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
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$')])],
      password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$')])],
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
  get password(){ return this.userForm.get('password'); }
  get password_confirmation(){ return this.userForm.get('password_confirmation'); }

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

  public cancel(): void{

    //reseteamos el formulario
    this.userForm.reset();
    //setear las imagenes
    this.resetImages();
    //navegamos a la lista de mantenimientos
    this.#router.navigate(['./home/clientes/detalle-clientes']);
  }

  public newUserForm(): void {
    if(this.userForm.valid){
      const data = new FormData();
        Object.keys(this.userForm.value).forEach(key => {
          data.append(key, this.userForm.get(key)?.value);
        });
        if (this.image) {
          data.append('image', this.image);
        }
        if(this.#cookiesService.check('token')){
          this.#unsubscribe = this.#userService.newUser(data).subscribe({
            next:(response)=>{
              this.#alertService.showAlert('success', response.message);
              this.resetImages();
              this.userForm.reset();
            },
            error:(error)=>{
              console.log(error);
              this.#alertService.showAlert('error', 'Error al crear el usuario');
            }
          });
        }else{
          this.#alertService.showAlert('error', 'Por favor, inicie sesión.');
        }
    }else{
      this.#alertService.showAlert('error', 'Por favor, complete todos los campos requeridos.');
    }
  }

  private resetImages(): void {
    this.previewImage = '../../../../../../assets/images/avatar.jpg';

    this.image = null;

  }

  public passwordView():void{
    this.viewPassword.set(!this.viewPassword());
  }

}
