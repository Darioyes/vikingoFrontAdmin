import { SpinerPagesComponent } from './../../../../../shared/spiners/spiner-pages/spiner-pages.component';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { BannerService } from '@services/banner/banner.service';
import { ProductsService } from '@services/product/product/products.service';
import { SpinerButtonComponent } from '@shared/spiners/spiner-button/spiner-button.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel-new',
  imports: [
    ReactiveFormsModule,
    SpinerPagesComponent
  ],
  templateUrl: './carousel-new.component.html',
  styleUrl: './carousel-new.component.scss'
})
export class CarouselNewComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;

  #bannerService = inject(BannerService);
  #productService = inject(ProductsService);
  #unsubscribe!: Subscription;
  #alertService = inject(AlertsService);
  #router = inject(Router);
  #cookiesService = inject(CookieService);

  public urlImage = environment.domainimage;
  public products = signal<any>([]);

  public formbuilder = inject(FormBuilder);
  public bannerForm: any = new FormGroup({});
  public urlImg = environment.domainimage;

  public existsImage = signal<string>('');
  public previewImage: string | ArrayBuffer | null = null;
  public existsImage2 = signal<string>('');
  public previewImage2: string | ArrayBuffer | null = null;
  public modifyInput = signal<boolean>(false);

  public image: File | null = null;
  public image2: File | null = null;

  public image1Valid = signal<boolean>(false);
  public image2Valid = signal<boolean>(false);

  ngOnInit(): void {
    this.getProducts();
    this.formBanner();
  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
  }

  //lista de estados
  public carouselStates = [
    {value: 'active', viewValue: 'Activo'},
    {value: 'inactive', viewValue: 'Inactivo'},
  ]

  public formBanner(){
    this.bannerForm = this.formbuilder.group({
      order: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      product_id: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      carousel: ['', Validators.compose([Validators.required,Validators.pattern('^(active|inactive)$')])],
    });
  }

  get order() {return this.bannerForm.get('order');}
  get product_id() {return this.bannerForm.get('product_id');}
  get carousel() {return this.bannerForm.get('carousel');}

  getProducts():void{
    this.#unsubscribe = this.#productService.getTotalProducts().subscribe({
      next: (response:any) => {
        this.products.set(response.data);
      },
      error: (error:any) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      }
      });
  }

  //esta funcion es para abrir el input file
  public triggerFileInput(imageNumber:number): void {
    //this.fileInput1.nativeElement.click();
    switch(imageNumber) {
      case 1:this.fileInput1.nativeElement.click();
        break;
      case 2:this.fileInput2.nativeElement.click();
        break;
    }
  }

  //esta funcion es para manejar el archivo seleccionado
  public onFileSelected(event: Event, imageKey: number): void {
    // Obtener el archivo seleccionado
    const input = event.target as HTMLInputElement;
    // Verificar si se seleccionó un archivo
    if (input.files && input.files.length > 0) {
      // Obtener el primer archivo (en caso de que se permitan múltiples archivos)
      const file = input.files[0];
      // Validar que el archivo sea una imagen
      if (file && file.type.startsWith('image/')) {
        //constntruir un objeto de imagen para validar las dimensiones
        const img = new Image();
        // Leer el archivo como una URL de datos
        const reader = new FileReader();
        // Cuando la lectura se complete, establecer la fuente de la imagen
        reader.onload = (e) => {
          // Establecer la fuente de la imagen para que se cargue
          img.src = e.target?.result as string;
        };
        // Cuando la imagen se haya cargado, validar sus dimensiones
        img.onload = () => {
          // Obtener las dimensiones de la imagen
          const width = img.width;
          // Obtener las dimensiones de la imagen
          const height = img.height;
          // Validar las dimensiones según la imagen (1 o 2)
          let valid = false;
          //si la imagen es la 1 (escritorio) debe ser 1800x650
          if (imageKey === 1 && width === 1800 && height === 650) {
            valid = true;
            //si la imagen es la 2 (movil) debe ser 545x800
          } else if (imageKey === 2 && width === 545 && height === 800) {
            valid = true;
          }

          if (!valid) {
            this.#alertService.showAlert(
              'alert',
              imageKey === 1
                ? 'La imagen para pantallas de escritorio debe tener una resolución exacta de 1800x650 píxeles.'
                : 'La imagen para pantallas móviles debe tener una resolución exacta de 545x800 píxeles.'
            );

            // Marcar bandera como inválida
            if (imageKey === 1) this.image1Valid.set(false);
            if (imageKey === 2) this.image2Valid.set(false);
            return;
          }

          // Si pasa la validación, marcamos la bandera como válida
          if (imageKey === 1) this.image1Valid.set(true);
          if (imageKey === 2) this.image2Valid.set(true);
          // la constanta readerPreview es para mostrar la vista previa de la imagen seleccionada
          const readerPreview = new FileReader();
          // Cuando la lectura se complete, establecer la vista previa
          readerPreview.onload = () => {
            // Asignar la vista previa y el archivo correspondiente según la imagen
            if (imageKey === 1) {
              // Asignar la vista previa y el archivo correspondiente según la imagen
              this.previewImage = readerPreview.result;
              //  Asignar el archivo a la variable image
              this.image = file;
              // Marcar el control del formulario como tocado
              this.bannerForm.get('image')?.markAsTouched();
            } else {
              this.previewImage2 = readerPreview.result;
              this.image2 = file;
              this.bannerForm.get('image2')?.markAsTouched();
            }
          };
          // Iniciar la lectura del archivo para la vista previa
          readerPreview.readAsDataURL(file);
        };
        // Iniciar la lectura del archivo
        reader.readAsDataURL(file);
      } else {
        this.#alertService.showAlert('alert', 'Solo se permiten archivos de tipo imagen (png, jpg, jpeg, webp).');
      }
    }
  }

  public newBanner():void{
    if(this.bannerForm.valid){
      const data = new FormData();
      Object.keys(this.bannerForm.value).forEach(key => {
        data.append(key, this.bannerForm.get(key)?.value);
      });
      if (this.image) {
        data.append('image', this.image);
      }
      if(this.image2){
        data.append('image2', this.image2);
      }
      console.log([...((data as any).entries())]);
      if(this.#cookiesService.check('token')){
        this.#unsubscribe = this.#bannerService.createBanner(data).subscribe({
          next: (response:any) => {
            this.#alertService.showAlert('success', 'Carrusel creado con éxito');
            this.#router.navigate(['home/Banner/lista-banner']);
          },
          error: (error:any) => {
            console.log(error);
            console.log(error.message.message);
            if(error.message.message == 'El campo orden ya ha sido registrado.' ){
              this.#alertService.showAlert('alert', 'El campo orden ya ha sido registrado. Por favor, elija otro valor.');
              return;
            }
            this.#alertService.showAlert('error', 'Comuniquese con el administrador');
          }
        });
      }else{
        this.#alertService.showAlert('error', 'Su sesión ha expirado, inicie sesión nuevamente');
        return;
      }
      
    }else{
      this.#alertService.showAlert('alert', 'Complete correctamente el formulario');
      this.bannerForm.markAllAsTouched();
    }
  }

  back():void{
    this.#router.navigate(['home/Banner/lista-banner']);
  }

}
