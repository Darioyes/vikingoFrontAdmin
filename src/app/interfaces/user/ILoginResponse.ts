
import { UserData } from "@interfaces/user/IUserData";


export interface LoginSuccessResponse {
  response: 'success';   // Caso de éxito
  message: string;        // Mensaje de éxito
  token: string;          // Token de autenticación
  data: UserData;         // Datos del usuario
  error: false;           // Indica que no hay error
}

export interface LoginErrorResponse {
  errorVikingo:{
    response: 'error';      // Caso de error
    message: string;        // Mensaje de error
    data: [];               // Arreglo vacío cuando hay error
    error: true;
    errors?:[]          // Indica que hubo un error
  };
}

// Unión de éxito o error
export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
