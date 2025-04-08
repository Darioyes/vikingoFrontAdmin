import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { UsersService } from '@services/users/users/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-new-maintenance',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-new-maintenance.component.html',
  styleUrl: './form-new-maintenance.component.scss'
})
export class FormNewMaintenanceComponent implements OnInit, OnDestroy {

    @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput3') fileInput3!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput4') fileInput4!: ElementRef<HTMLInputElement>;

    #maintenanceService = inject(MaintenanceService);
    #usersService = inject(UsersService);
    #alertService = inject(AlertsService);
    #cookiesService = inject(CookieService);
    #unsubscribe!: Subscription;
    public router = inject(Router)

    public usersMaintenance = signal<any>([]);
    public maintenanceFormNew: | any = new FormGroup({});
    public formbuilder = inject(FormBuilder);

    public existsImage1 = signal<string>('');
    public previewImage1: string | ArrayBuffer | null = null;

    public existsImage2 = signal<string>('');
    public previewImage2: string | ArrayBuffer | null = null;
    public existsImage3 = signal<string>('');
    public previewImage3: string | ArrayBuffer | null = null;
    public existsImage4 = signal<string>('');
    public previewImage4: string | ArrayBuffer | null = null;

    public image1: File | null = null;
    public image2: File | null = null;
    public image3: File | null = null;
    public image4: File | null = null;

    ngOnInit(): void {
      this.formMaintenance();
      this.getUsers();
    }

    ngOnDestroy(): void {
      if(this.#unsubscribe){
        this.#unsubscribe.unsubscribe();
      }
    }

       public formMaintenance(){
        this.maintenanceFormNew = this.formbuilder.group({
          users_id: [''],
          product: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
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

      get users_id(){ return this.maintenanceFormNew.get('users_id'); }
      get product(){ return this.maintenanceFormNew.get('product'); }
      get reference(){ return this.maintenanceFormNew.get('reference'); }
      get price(){ return this.maintenanceFormNew.get('price'); }
      get delivery_date(){return this.maintenanceFormNew.get('delivery_date'); }
      get advance(){ return this.maintenanceFormNew.get('advance'); }
      get repaired(){ return this.maintenanceFormNew.get('repaired'); }
      get warranty(){ return this.maintenanceFormNew.get('warranty'); }
      get description(){ return this.maintenanceFormNew.get('description'); }

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
              this.maintenanceFormNew.get('image1')?.markAsTouched();
              break;
            case 2:
              this.previewImage2 = reader.result;
              this.image2 = file;
              this.maintenanceFormNew.get('image2')?.markAsTouched();
              break;
            case 3:
              this.previewImage3 = reader.result;
              this.image3 = file;
              this.maintenanceFormNew.get('image3')?.markAsTouched();
              break;
            case 4:
              this.previewImage4 = reader.result;
              this.image4 = file;
              this.maintenanceFormNew.get('image4')?.markAsTouched();
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

  public newMaintenanceForm():void{

    //si el formualrio es valido{}
    if(this.maintenanceFormNew.valid){
      //enviamos los datos al formulario
      const data = new FormData();
          // Agrega todos los campos del formulario
      Object.keys(this.maintenanceFormNew.value).forEach(key => {
      data.append(key, this.maintenanceFormNew.get(key)?.value);
    });

    // Agrega la imagen solo si existe
    if (this.image1) {
      data.append('image1', this.image1);
    }
    if (this.image2) {
      data.append('image2', this.image2);
    }

    if (this.image3) {
      data.append('image3', this.image3);
    }

    if (this.image4) {
      data.append('image4', this.image4);
    }

    //validamos si hay un token en las cookies
    if(this.#cookiesService.check('token')){
      //validamos el formulario
      if(this.maintenanceFormNew.valid){
        this.#unsubscribe = this.#maintenanceService.postMaintenance( data).subscribe({
          next:(response)=>{
            console.log(response);
            this.#alertService.showAlert('success','Mantenimiento registrado correctamente.');

          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=>{
            //reseteamos el formulario
            this.maintenanceFormNew.reset();
            //setear las imagenes
            this.resetImages();
          }
        });
       }
      }else{
        this.#alertService.showAlert('error','Ingrese nuevamente a la aplicación.');
      }
    }else{
      this.#alertService.showAlert('error','El formulario es invalido.');

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

    public cancel(): void{

      //reseteamos el formulario
      this.maintenanceFormNew.reset();
      //setear las imagenes
      this.resetImages();
      //navegamos a la lista de mantenimientos
      this.router.navigate(['./home/mantenimientos/lista-mantenimientos']);
    }
    private resetImages(): void {
      this.previewImage1 = '../../../../../../assets/images/noImage.png';
      this.previewImage2 = '../../../../../../assets/images/noImage.png';
      this.previewImage3 = '../../../../../../assets/images/noImage.png';
      this.previewImage4 = '../../../../../../assets/images/noImage.png';
      this.image1 = null;
      this.image2 = null;
      this.image3 = null;
      this.image4 = null;
    }

}
