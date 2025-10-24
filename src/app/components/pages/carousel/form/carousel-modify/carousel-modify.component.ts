import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { AlertsService } from '@services/alerts/alerts.service';
import { BannerService } from '@services/banner/banner.service';
import { ProductsService } from '@services/product/product/products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel-modify',
  imports: [
    ReactiveFormsModule,
    NgClass,
    SpinerPagesComponent,
  ],
  templateUrl: './carousel-modify.component.html',
  styleUrl: './carousel-modify.component.scss'
})
export class CarouselModifyComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;

  #bannerService = inject(BannerService);
  #productService = inject(ProductsService);
  #unsubscribe!: Subscription;
  #router = inject(ActivatedRoute);
  #alertService = inject(AlertsService);
  #routers = inject(Router);
  #cookiesService = inject(CookieService);

  public id = signal<any>('');
  public urlImage = environment.domainimage;
  public banner = signal<any>([]);
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
    this.getBanner();
    this.formProduct();
    this.getProducts();

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

  public formProduct(){
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



  public idSale(){
    this.id.set(
      Number(this.#router.snapshot.queryParams['id'])
    );
  }

  getBanner():void{
    this.idSale();
    this.#unsubscribe = this.#bannerService.getBanner(this.id()).subscribe({
      next: (response:any) => {
        this.banner.set(response.data);
        //asignar los valores al formulario
        this.bannerForm.patchValue({
          order: this.banner()?.order,
          product_id: this.banner()?.product_id,
          carousel: this.banner()?.carousel,
        });
      },
      error: (error:any) => {
        console.log(error);
        this.#alertService.showAlert('error', 'Comuniquese con el administrador');
      },
      complete:()=>{
        //asignar las imagenes existentes a las señales correspondientes
        this.existsImage.set(this.banner()?.image?.replace('public', 'storage'));
        this.previewImage = this.urlImg + this.existsImage();
        this.existsImage2.set(this.banner()?.image2?.replace('public', 'storage'));
        this.previewImage2 = this.urlImg + this.existsImage2();
      }
    });
  }

  modifyBanner():void{
    //validar si el formulario es valido
    if(this.bannerForm.valid){
        const data = new FormData();
        data.append('_method','PUT');
        Object.keys(this.bannerForm.value).forEach(key => {
          data.append(key, this.bannerForm.get(key)?.value);
        });
        
        if (this.image) {
          data.append('image', this.image);
        } else if (this.banner().image) {
          // Si no hay nueva imagen pero existe una anterior
          data.append('keep_image', 'true'); // Envía un flag al backend
        }
        if (this.image2) {
          data.append('image2', this.image2);
        } else if (this.banner().image2) {
          // Si no hay nueva imagen pero existe una anterior
          data.append('keep_image2', 'true'); // Envía un flag al backend
        }
      //validarmos si hay un token en las cookies
      if(this.#cookiesService.check('token')){
        this.#unsubscribe = this.#bannerService.modifyBanner(this.id(), data).subscribe({
          next: (response:any) => {
            this.#alertService.showAlert('success', 'Carrusel modificado con éxito.');
          },
          error: (error:any) => {
            console.log(error);
            if(error.message.message === 'El orden del carrusel ya está en uso.'){
              this.#alertService.showAlert('error', error.message.message);
              return;
            }
            this.#alertService.showAlert('error', 'Comuniquese con el administrador');
          }
        });
      }else{
        this.#alertService.showAlert('error', 'Su sesión ha expirado, inicie sesión nuevamente.');
        this.#routers.navigate(['/login']);
        return;
      }

    }
  }

  back():void{
    this.#routers.navigate(['home/Banner/lista-banner']);
  }

}
