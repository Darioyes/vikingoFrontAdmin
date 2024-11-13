import { IProgress } from '../maintenances/IProgress.interfaces';
import { ISummaryBasic } from '../summary/ISummaryBasic.interface';

export interface SuccessResponse {
  response: 'success';   // Caso de éxito
  message: string;        // Mensaje de éxito
  data?: ISummaryBasic;
  dataProgress?: IProgress[];
  error: false;           // Indica que no hay error
};

export interface ErrorResponse {
  errorVikingo:{
    response: 'error';      // Caso de error
    message: string;        // Mensaje de error
    data?: [];               // Arreglo vacío cuando hay error
    error: true;
    errors?:[]          // Indica que hubo un error
  };
}

// Unión de éxito o error
export type ApiResponse = SuccessResponse;
