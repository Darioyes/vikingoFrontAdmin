import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { CategoriesProductsService } from '@services/product/categoriesProducts/categories-products.service';
import { ProductsService } from '@services/product/product/products.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-new-product',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-new-product.component.html',
  styleUrl: './form-new-product.component.scss'
})
export class FormNewProductComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput3') fileInput3!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput4') fileInput4!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput5') fileInput5!: ElementRef<HTMLInputElement>;

  #productService = inject(ProductsService);
  #categoriesProductsService = inject(CategoriesProductsService);
  #alertService = inject(AlertsService);
  #cookiesService = inject(CookieService);
  #unsubscribe!: Subscription;
  #router = inject(Router);

  public formbuilder = inject(FormBuilder);

  public productsCategories = signal<any>([]);

  public productForm: any = new FormGroup({});

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

    this.categoriesProducts();
    this.formProduct();

  }

  ngOnDestroy(): void {
    if(this.#unsubscribe){
      this.#unsubscribe.unsubscribe();
    }
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

      get name(){ return this.productForm.get('name'); }
      get reference(){ return this.productForm.get('reference'); }
      get barcode(){ return this.productForm.get('barcode'); }
      get description(){ return this.productForm.get('description'); }
      get stock(){ return this.productForm.get('stock'); }
      get sale_price(){ return this.productForm.get('sale_price'); }
      get cost_price(){return this.productForm.get('cost_price');}
      get visible(){ return this.productForm.get('visible'); }
      get color(){ return this.productForm.get('color'); }
      get categories_products_id(){ return this.productForm.get('categories_products_id');

  }

  public newProductForm():void{

    //si el formulario es valido
    if(this.productForm.valid) {

      //declaramos la constante data y hay guardamos los datos del formulario
      const data = new FormData();
        Object.keys(this.productForm.value).forEach(key => {
          data.append(key, this.productForm.get(key)?.value);
        });

        if (this.image1) {
          data.append('image1', this.image1);
        }
        if(this.image2){
          data.append('image2', this.image2);
        }
        if(this.image3){
          data.append('image3', this.image3);
        }

        if(this.image4){
          data.append('image4', this.image4);
        }
        if(this.image5){
          data.append('image5', this.image5);
        }

      //validamos si hay un token en las cookies
      if(this.#cookiesService.check('token')){

        this.#unsubscribe = this.#productService.newProduct(data).subscribe({
          next:(response) =>{
            console.log(response);
            //reseteamos el formulario
            this.#alertService.showAlert('success','Producto registrado correctamente.');
            this.productForm.reset();
            this.resetImages();
          },
          error:(error) =>{
            console.log(error)
            this.#alertService.showAlert('alert','Error inesperado, por favor vuelva a intentar');
          },

        });

      }else{
        this.#alertService.showAlert('alert','Por favor inicie sesión')
      }


    }else{
      this.#alertService.showAlert('alert', 'El formulario no es válido. Por favor, revise los campos e intente nuevamente.');
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


  public categoriesProducts():void {
    this.#unsubscribe = this.#categoriesProductsService.getCategoriesProducts().subscribe({
      next:(response)=>{
        this.productsCategories.set(response.data.data)

      },
      error:(error)=>{
        console.log(error)
        this.#alertService.showAlert('alert', 'Error al cargar las categorias cargue nuevamente la página');
      }
    });
  }


  public cancel(): void{

    //reseteamos el formulario
    this.productForm.reset();
    //setear las imagenes
    this.resetImages();
    //navegamos a la lista de mantenimientos
    this.#router.navigate(['./home/productos/lista-productos']);
  }

  private resetImages(): void {
    this.previewImage1 = '../../../../../../assets/images/noImage.png';
    this.previewImage2 = '../../../../../../assets/images/noImage.png';
    this.previewImage3 = '../../../../../../assets/images/noImage.png';
    this.previewImage4 = '../../../../../../assets/images/noImage.png';
    this.previewImage5 = '../../../../../../assets/images/noImage.png';
    this.image1 = null;
    this.image2 = null;
    this.image3 = null;
    this.image4 = null;
    this.image5 = null;
  }

}
