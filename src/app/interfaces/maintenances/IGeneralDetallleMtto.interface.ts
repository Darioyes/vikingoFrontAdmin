import { IMaintenanceDetail } from "./IMaintenanceDetail.interface";


export interface SuccessMaintenanceDetalleResponse {
  response: 'success';   // Caso de éxito
  message: string;        // Mensaje de éxito
  data?: IMaintenanceDetail;
  error: false;           // Indica que no hay error
};

export interface ErrorMaintenanceDetalleResponse {
  errorVikingo:{
    response: 'error';      // Caso de error
    message: string;        // Mensaje de error
    data?: [];               // Arreglo vacío cuando hay error
    error: true;
    errors?:[]          // Indica que hubo un error
  };
}

// Unión de éxito o error
export type ApiMaintenanceDetalleResponse = SuccessMaintenanceDetalleResponse;
