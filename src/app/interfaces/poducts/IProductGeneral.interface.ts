import { IProductDetaillPage } from '../poducts/IProductDetail.interface';

export interface SuccessProductDetaillResponse {
  response: 'success';   // Caso de éxito
  message: string;        // Mensaje de éxito
  data?: IProductDetaillPage;
  error: false;           // Indica que no hay error
};

export interface ErrorProductDetaillResponse {
  errorVikingo:{
    response: 'error';      // Caso de error
    message: string;        // Mensaje de error
    data?: [];               // Arreglo vacío cuando hay error
    error: true;
    errors?:[]          // Indica que hubo un error
  };
}

// Unión de éxito o error
export type ApiProductDetaillResponse = SuccessProductDetaillResponse;
