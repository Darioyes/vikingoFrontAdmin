export interface SuccessResponse {
  response: 'success';   // Caso de éxito
  message: string;        // Mensaje de éxito
  data: [];         // Datos del usuario
  error: false;           // Indica que no hay error
}

export interface ErrorResponse {
  errorVikingo:{
    response: 'error';      // Caso de error
    message: string;        // Mensaje de error
    data: [];               // Arreglo vacío cuando hay error
    error: true;
    errors?:[]          // Indica que hubo un error
  };
}

// Unión de éxito o error
export type ApiResponse = SuccessResponse | ErrorResponse;
