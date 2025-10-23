import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@enviroments/environment.development';
import { IProductDetaill } from '@interfaces/poducts/IProductDetail.interface';
import { AlertsService } from '@services/alerts/alerts.service';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { ProductsService } from '@services/product/product/products.service';
import { SpinerPagesComponent } from '@shared/spiners/spiner-pages/spiner-pages.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-information-product',
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    ReactiveFormsModule,
    NgClass,
    SpinerPagesComponent,
  ],
  templateUrl: './form-information-product.component.html',
  styleUrl: './form-information-product.component.scss'
})
export class FormInformationProductComponent implements OnInit, OnDestroy {

    @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput3') fileInput3!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput4') fileInput4!: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput5') fileInput5!: ElementRef<HTMLInputElement>;


  #router = inject(Router);
  #routeId = inject(ActivatedRoute);
  #productService = inject(ProductsService);
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);
  #unsubscribe!: Subscription;
  #categoriesProductsService = inject(CategoriesProductsService);

  public formbuilder = inject(FormBuilder);


  public productForm: any = new FormGroup({});

  public urlImg = environment.domainimage;
  public productId = signal<number>(0);
  public product = signal<IProductDetaill | any>(null);
  public modifyInput = signal<boolean>(false);
  public success = signal<string>('');
  public productsCategories = signal<any>([]);

  public existsImage1 = signal<string>('');
  public previewImage1: string | ArrayBuffer | null = null;
  public existsImage2 = signal<string>('');
  public previewImage2: string | ArrayBuffer | null = null;
  public existsImage3 = signal<string>('');
  public previewImage3: string | ArrayBuffer | null = null;
  public existsImage4 = signal<string>('');
  public previewImage4: string | ArrayBuffer | null = null;
  public existsImage5 = signal<string>('');
  public previewImage5: string | ArrayBuffer | null = null;

  public image1: File | null = null;
  public image2: File | null = null;
  public image3: File | null = null;
  public image4: File | null = null;
  public image5: File | null = null;




  ngOnInit(): void {
    this.idProduct()
    this.infoProduct(this.productId());
    this.categoriesProducts();
    this.formProduct();
    this.idProductModify();

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
        case 5:this.fileInput5.nativeElement.click();
          break;
      }
    }

  public idProduct(){
    this.productId.set(
      Number(this.#routeId.snapshot.queryParams['id'])
    )
  }

  public idProductModify(){
    this.productId.set(
      Number(this.#routeId.snapshot.queryParams['id'])
    )
  }

  public formProduct(){
      this.productForm = this.formbuilder.group({
        // users_id: [''],
        name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
        reference: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100)])],
        barcode: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
        stock: ['', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
        sale_price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
        cost_price:['', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
        visible: ['', Validators.compose([Validators.required])],
        color: ['', Validators.compose([ Validators.minLength(3), Validators.maxLength(50)])],
        categories_products_id: ['', Validators.compose([Validators.required,])],
      });
    }

    // get users_id(){ return this.productForm.get('users_id'); }
    get name(){ return this.productForm.get('name'); }
    get reference(){ return this.productForm.get('reference'); }
    get barcode(){ return this.productForm.get('barcode'); }
    get description(){ return this.productForm.get('description'); }
    get stock(){ return this.productForm.get('stock'); }
    get sale_price(){ return this.productForm.get('sale_price'); }
    get cost_price(){return this.productForm.get('cost_price');}
    get visible(){ return this.productForm.get('visible'); }
    get color(){ return this.productForm.get('color'); }
    get categories_products_id(){ return this.productForm.get('categories_products_id'); }


  //funcion para llenar los datos en el formulario
  public fillProductForm():void{
    setTimeout(() => {
      this.productForm.setValue({
        name: this.product().name,
        reference: this.product().reference,
        barcode: this.product().barcode,
        description: this.product().description,
        stock: this.product().stock,
        sale_price: this.product().sale_price,
        cost_price: this.product().cost_price,
        color: this.product().color,
        categories_products_id: this.product().categories_products_id,
        visible: this.product().visible,
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
              this.productForm.get('image1')?.markAsTouched();
              break;
            case 2:
              this.previewImage2 = reader.result;
              this.image2 = file;
              this.productForm.get('image2')?.markAsTouched();
              break;
            case 3:
              this.previewImage3 = reader.result;
              this.image3 = file;
              this.productForm.get('image3')?.markAsTouched();
              break;
            case 4:
              this.previewImage4 = reader.result;
              this.image4 = file;
              this.productForm.get('image4')?.markAsTouched();
              break;
              case 5:
                this.previewImage5 = reader.result;
                this.image5 = file;
                this.productForm.get('image5')?.markAsTouched();
                break;
          };

        };

        reader.readAsDataURL(file);
      } else {
        this.#alertService.showAlert('info','Solo se permite archivos de tipo imagen.');
      }
    }
  }

  public infoProduct(id:any):void {

    this.#unsubscribe = this.#productService.getProduct(id).subscribe({
      next:(response) =>{
        this.product.set(response.data)
        this.success.set(response.response);
        //console.log(this.product())
      },
      error:(error) => {
        console.log(error)
      },
      complete:()=>{
        //asignar las imagenes existentes a las señales correspondientes
        this.existsImage1.set(this.product()?.image1?.replace('public', 'storage'));
        this.previewImage1 = this.urlImg + this.existsImage1();
        this.existsImage2.set(this.product()?.image2?.replace('public', 'storage'));
        this.previewImage2 = this.urlImg + this.existsImage2();
        this.existsImage3.set(this.product()?.image3?.replace('public', 'storage'));
        this.previewImage3 = this.urlImg + this.existsImage3();
        this.existsImage4.set(this.product()?.image4?.replace('public', 'storage'));
        this.previewImage4 = this.urlImg + this.existsImage4();
        this.existsImage5.set(this.product()?.image5?.replace('public', 'storage'));
        this.previewImage5 = this.urlImg + this.existsImage5();

      }
    });

  }

  public categoriesProducts():void {
    this.#unsubscribe = this.#categoriesProductsService.getCategoriesProducts().subscribe({
      next:(response)=>{
        //console.log(response.data.data)
        this.productsCategories.set(response.data.data)
      },
      error:(error)=>{
        console.log(error)
        this.#alertService.showAlert('alert', 'Error al cargar las categorias vuelva a intentar cargar la página');
      }
    });
  }


 public modifyProductForm(id:number){

  //si el formulario es valido
  if(this.productForm.valid) {

    //declaramos la constante data y hay guardamos los datos del formulario
    const data = new FormData();
      data.append('_method','PUT');
      Object.keys(this.productForm.value).forEach(key => {
        data.append(key, this.productForm.get(key)?.value);
      });

      if (this.image1) {
        data.append('image1', this.image1);
      } else if (this.product().image1) {
        // Si no hay nueva imagen pero existe una anterior
        data.append('keep_image1', 'true'); // Envía un flag al backend
      }

      if(this.image2){
        data.append('image2', this.image2);
      }else if (this.product().image2) {
        // Si no hay nueva imagen pero existe una anterior
        data.append('keep_image2', 'true'); // Envía un flag al backend
      }

      if(this.image3){
        data.append('image3', this.image3);
      }else if (this.product().image3) {
        // Si no hay nueva imagen pero existe una anterior
        data.append('keep_image3', 'true'); // Envía un flag al backend
      }

      if(this.image4){
        data.append('image4', this.image4);
      }else if (this.product().image4) {
        // Si no hay nueva imagen pero existe una anterior
        data.append('keep_image4', 'true'); // Envía un flag al backend
      }
      if(this.image5){
        data.append('image5', this.image5);
      }else if (this.product().image5) {
        // Si no hay nueva imagen pero existe una anterior
        data.append('keep_image5', 'true'); // Envía un flag al backend
      }
    //validamos si hay un token en las cookies
    if(this.#cookiesService.check('token')){

      this.#unsubscribe = this.#productService.modifyProduct(id, data).subscribe({
        next:(response) =>{
          //console.log(response);
          this.infoProduct(this.product().id);
          this.#alertService.showAlert('success','Producto modificado correctamente');
          this.modifyInput.set(!this.modifyInput());
        },
        error:(error) =>{
          console.log(error)
          this.#alertService.showAlert('alert','Error inesperado, por favor vuelva a intentar la modificiación');
        },

      });

    }else{
      this.#alertService.showAlert('alert','Por favor inicie sesión')
    }


  }else{
    this.#alertService.showAlert('alert', 'El formulario no es válido. Por favor, revise los campos e intente nuevamente.');
  }

 }

 public productFormClose(){
  this.#router.navigate(['./home/productos/lista-productos']);
 }

 public modifyProductDetail():void{
  this.modifyInput.set(!this.modifyInput());
  this.previewImage1 = this.urlImg + this.existsImage1();
  this.previewImage2 = this.urlImg + this.existsImage2();
  this.previewImage3 = this.urlImg + this.existsImage3();
  this.previewImage4 = this.urlImg + this.existsImage4();
  this.previewImage5 = this.urlImg + this.existsImage5();
  this.image1 = null;
  this.image2 = null;
  this.image3 = null;
  this.image4 = null;
  this.image5 = null;
  //resetear los inputs de los archivos
  this.fileInput1.nativeElement.value = '';
  this.fileInput2.nativeElement.value = '';
  this.fileInput3.nativeElement.value = '';
  this.fileInput4.nativeElement.value = '';
  this.fileInput5.nativeElement.value = '';

    if (this.modifyInput()) {
      // Inicializa y llena el formulario solo cuando se active el modo de edición
      this.fillProductForm();


    }

  }


}

