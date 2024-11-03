export interface UserData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  gender: string;
  birthday?: string; // También podría ser Date si prefieres
  phone1: string;
  phone2?: string;
  address?: string;
  image?: string;
  email_verified_at?: string; // También podría ser Date
  created_at?: string; // También podría ser Date
  updated_at?: string; // También podría ser Date
  cities_id: number;
  vikingo_roles_id?: number;
}
