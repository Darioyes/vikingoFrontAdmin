import { IUser } from '../users/IUser.interface';

export interface IMaintenanceDetail {
  current_page?: number;
  data?: IMaintenanceDetail[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: Link[];
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
}

export interface IMaintenanceDetail {
  id: number;
  product?: string;
  description?: string;
  reference?: string;
  price?: string;
  delivery_date?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  advance?: string;
  created_at?: string;
  updated_at?: string;
  repaired?: string;
  warranty?: string;
  users_id?: number;
  users: IUser[];
}

interface Link {
  url?:string;
  label?: string;
  active?: boolean;
}
