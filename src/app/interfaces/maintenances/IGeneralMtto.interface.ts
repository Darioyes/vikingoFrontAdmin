import { IProgress } from '../maintenances/IProgress.interfaces';

export interface SuccessMaintenanceResponse {
  response: 'success';   // Caso de éxito
  message: string;        // Mensaje de éxito
  data?: IProgress[];
  error: false;           // Indica que no hay error
};

export interface ErrorMaintenanceResponse {
  errorVikingo:{
    response: 'error';      // Caso de error
    message: string;        // Mensaje de error
    data?: [];               // Arreglo vacío cuando hay error
    error: true;
    errors?:[]          // Indica que hubo un error
  };
}

// Unión de éxito o error
export type ApiMaintenanceResponse = SuccessMaintenanceResponse;
