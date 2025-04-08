import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, input, OnDestroy, OnInit, output, signal, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { IDetail } from '@interfaces/maintenances/IMaintenanceDetail.interface';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { UsersService } from '@services/users/users/users.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

function validUserValidator(validUsers: string[]) {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value && !validUsers.includes(value)) {
      return { invalidUser: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-form-information',
  imports: [
    CurrencyPipe,
    DatePipe,
    ReactiveFormsModule,
    NgClass,
    SpinerPagesComponent,
  ],
  templateUrl: './form-information.component.html',
  styleUrl: './form-information.component.scss'
})
export class FormInformationComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput3') fileInput3!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput4') fileInput4!: ElementRef<HTMLInputElement>;


  public usersMaintenance = signal<any>([]);

  public urlImg = environment.domainimage;
  public maintenanceid = input< number | any>([]);
  public maintenanceOne = signal<IDetail | any>([]);
  public maintenancesActivate = output<boolean>();
  public activate = signal<boolean>(true);
  public success = signal<string>('');

  public existsImage1 = signal<string>('');
  public previewImage1: string | ArrayBuffer | null = null;

  public existsImage2 = signal<string>('');
  public previewImage2: string | ArrayBuffer | null = null;
  public existsImage3 = signal<string>('');
  public previewImage3: string | ArrayBuffer | null = null;
  public existsImage4 = signal<string>('');
  public previewImage4: string | ArrayBuffer | null = null;

  public formbuilder = inject(FormBuilder);
  public maintenanceForm:IDetail | any = new FormGroup({});
  public modifyInput = signal<boolean>(false);
   public router = inject(Router)

  public image1: File | null = null;
  public image2: File | null = null;
  public image3: File | null = null;
  public image4: File | null = null;


  // public validUsers = computed<any>(() => {
  //   return this.usersMaintenance().map((user: any) => user.name + ' ' + user.lastname);
  // });

  #maintenanceService = inject(MaintenanceService);
  #cookiesService = inject(CookieService);
  #usersService = inject(UsersService);
  #alertService = inject(AlertsService);
  #unsubscribe!: Subscription;

  ngOnInit(): void {

    this.maintenanceGet(this.maintenanceid());

   }
   ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  //esta funcion es para abrir el input file
  public triggerFileInput(imageNumber:number): void {
    //this.fileInput1.nativeElement.click();
    switch(imageNumber) {
      case 1:this.fileInput1.nativeElement.click();
        break;
      case 2:this.fileInput2.nativeElement.click();
        break;
      case 3:this.fileInput3.nativeElement.click();
        break;
      case 4:this.fileInput4.nativeElement.click();
        break;
    }
  }



  //esta funcion es para obtener el nombre del archivo seleccionado
  public getFileName(): string {
    const fileInput = this.fileInput1.nativeElement;
    if (fileInput.files && fileInput.files.length > 0) {
      return fileInput.files[0].name;
    }
    return 'Ningún archivo seleccionado';
  }

   //validación doel formulario
   public formMaintenance(){
    this.maintenanceForm = this.formbuilder.group({
      users_id: [''],
      product: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      users: ['', Validators.compose([Validators.required,])],
      reference: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
      delivery_date: ['', Validators.compose([Validators.pattern('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')])],
      advance: ['', Validators.compose([Validators.required])],
      repaired: ['', Validators.compose([Validators.required])],
      warranty: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      //image1: [null],
    });

  };

  get users_id(){ return this.maintenanceForm.get('users_id'); }
  get product(){ return this.maintenanceForm.get('product'); }
  get users(){ return this.maintenanceForm.get('users'); }
  get reference(){ return this.maintenanceForm.get('reference'); }
  get price(){ return this.maintenanceForm.get('price'); }
  get delivery_date(){return this.maintenanceForm.get('delivery_date'); }
  get advance(){ return this.maintenanceForm.get('advance'); }
  get repaired(){ return this.maintenanceForm.get('repaired'); }
  get warranty(){ return this.maintenanceForm.get('warranty'); }
  get description(){ return this.maintenanceForm.get('description'); }
  //get image1(){ return this.maintenanceForm.get('image1'); }

  //funcion para llenar los datos en el formulario
  public fillMaintenanceForm():void{
    setTimeout(() => {
      this.maintenanceForm.setValue({
        product: this.maintenanceOne().product,
        users: this.maintenanceOne().users.name + ' '+ this.maintenanceOne().users.lastname,
        reference: this.maintenanceOne().reference,
        price: this.maintenanceOne().price,
        delivery_date: this.maintenanceOne().delivery_date,
        advance: this.maintenanceOne().advance,
        repaired: this.maintenanceOne().repaired,
        warranty: this.maintenanceOne().warranty,
        description: this.maintenanceOne().description,
        users_id: this.maintenanceOne().users.id,
      });
    }, 500);
  }

    //esta funcion es para manejar el archivo seleccionado
    public onFileSelected(event: Event, imageKey: number): void {
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
            switch(imageKey){
              case 1:
                this.previewImage1 = reader.result;
                this.image1 = file;
                // Marca el control como "touched"
                this.maintenanceForm.get('image1')?.markAsTouched();
                break;
              case 2:
                this.previewImage2 = reader.result;
                this.image2 = file;
                this.maintenanceForm.get('image2')?.markAsTouched();
                break;
              case 3:
                this.previewImage3 = reader.result;
                this.image3 = file;
                this.maintenanceForm.get('image3')?.markAsTouched();
                break;
              case 4:
                this.previewImage4 = reader.result;
                this.image4 = file;
                this.maintenanceForm.get('image4')?.markAsTouched();
                break;
            };

            // Actualizar el valor del control del formulario
            // this.maintenanceForm.patchValue({
            //   image1: file
            // });

          };
          // leer el archivo como una URL de datos
          // esto convierte el archivo en una cadena de texto en formato base64
          reader.readAsDataURL(file);
        } else {
          this.#alertService.showAlert('info','Solo se permite archivos de tipo imagen.');
        }
      }
    }

  public modifyMaintenanceForm():void{

    //si el formualrio es valido{}
    if(this.maintenanceForm.valid){
      //enviamos los datos al formulario
      const data = new FormData();
      data.append('_method','PUT');
         // Agrega todos los campos del formulario
      Object.keys(this.maintenanceForm.value).forEach(key => {
      data.append(key, this.maintenanceForm.get(key)?.value);
    });
      // data.append('product', this.maintenanceForm.get('product')?.value);
      // data.append('reference', this.maintenanceForm.get('reference')?.value);
      // data.append('price', this.maintenanceForm.get('price')?.value);
      // data.append('delivery_date', this.maintenanceForm.get('delivery_date')?.value);
      // data.append('advance', this.maintenanceForm.get('advance')?.value);
      // data.append('repaired', this.maintenanceForm.get('repaired')?.value);
      // data.append('warranty', this.maintenanceForm.get('warranty')?.value);
      // data.append('description', this.maintenanceForm.get('description')?.value);
      // data.append('users_id', this.maintenanceForm.get('users_id')?.value);
      // data.append('image1', this.maintenanceForm.get('image1')?.value);
          // Agrega la imagen solo si existe
    if (this.image1) {
      data.append('image1', this.image1);
    } else if (this.maintenanceOne().image1) {
      // Si no hay nueva imagen pero existe una anterior
      data.append('keep_image1', 'true'); // Envía un flag al backend
    }
    if (this.image2) {
      data.append('image2', this.image2);
    }
    else if (this.maintenanceOne().image2) {
      // Si no hay nueva imagen pero existe una anterior
      data.append('keep_image2', 'true'); // Envía un flag al backend
    }
    if (this.image3) {
      data.append('image3', this.image3);
    }
    else if (this.maintenanceOne().image3) {
      // Si no hay nueva imagen pero existe una anterior
      data.append('keep_image3', 'true'); // Envía un flag al backend
    }
    if (this.image4) {
      data.append('image4', this.image4);
    }
    else if (this.maintenanceOne().image4) {
      // Si no hay nueva imagen pero existe una anterior
      data.append('keep_image4', 'true'); // Envía un flag al backend
    }

  //validamos si hay un token en las cookies
    if(this.#cookiesService.check('token')){
      //validamos el formulario
      if(this.maintenanceForm.valid){
        this.#unsubscribe = this.#maintenanceService.modifyMaintenance(this.maintenanceOne().id, data).subscribe({
          next:(response)=>{
            //console.log(response);
            this.#alertService.showAlert('success','Mantenimiento actualizado correctamente.');

          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            this.maintenanceGet(this.maintenanceOne().id);
            this.modifyInput.set(!this.modifyInput());
          }
        });
     }
    }
  }

  }

  public maintenanceGet(id:number):void{
    this.#unsubscribe = this.#maintenanceService.getMaintenance(id).subscribe({
      next:(response)=>{
        this.success.set(response.response);
        this.maintenanceOne.set(response?.data);
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        this.existsImage1.set(this.maintenanceOne()?.image1?.replace('public', 'storage'));
        this.previewImage1 = this.urlImg + this.existsImage1();
        this.existsImage2.set(this.maintenanceOne()?.image2?.replace('public', 'storage'));
        this.previewImage2 = this.urlImg + this.existsImage2();
        this.existsImage3.set(this.maintenanceOne()?.image3?.replace('public', 'storage'));
        this.previewImage3 = this.urlImg + this.existsImage3();
        this.existsImage4.set(this.maintenanceOne()?.image4?.replace('public', 'storage'));
        this.previewImage4 = this.urlImg + this.existsImage4();
        this.getUsers();
      }
    });
  }

  public MaintenanceDetailClose():void{
    this.maintenancesActivate.emit(this.activate());
    this.router.navigate(['./home']);
    //console.log(this.activate());
  }

  public modifyMaintenanceDetail():void{
    this.modifyInput.set(!this.modifyInput());
    this.previewImage1 = this.urlImg + this.existsImage1();
    this.previewImage2 = this.urlImg + this.existsImage2();
    this.previewImage3 = this.urlImg + this.existsImage3();
    this.previewImage4 = this.urlImg + this.existsImage4();
    this.image1 = null;
    this.image2 = null;
    this.image3 = null;
    this.image4 = null;
    //resetear los inputs de los archivos
    this.fileInput1.nativeElement.value = '';
    this.fileInput2.nativeElement.value = '';
    this.fileInput3.nativeElement.value = '';
    this.fileInput4.nativeElement.value = '';
    if (this.modifyInput()) {
      // Inicializa y llena el formulario solo cuando se active el modo de edición
      this.formMaintenance();
      this.fillMaintenanceForm();


    }
  }

  public getUsers():void{
    this.#unsubscribe = this.#usersService.getUsers().subscribe({
      next:(response)=>{
        this.usersMaintenance.set(response.data.data);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

}
