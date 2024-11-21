
export interface IProductDetaillPage {
  current_page?: number;
  data?: IProductDetaill[];
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

export interface Link {
  url?: null | string;
  label?: string;
  active?: boolean;
}

export interface IProductDetaill{
  id?: number;
  name?: string;
  slug?: string;
  reference?: string;
  barcode?: null | string;
  description?: string;
  stock?: string;
  sale_price?: string;
  cost_price?: string;
  image1?: string;
  image2?: null | string;
  image3?: null | string;
  image4?: null | string;
  image5?: null | string;
  color?: null | string;
  created_at?: string;
  updated_at?: string;
  categories_products_id?: number;
  categories_products?: Categoriesproducts;
}

export interface Categoriesproducts {
  id?: number;
  name?: string;
}
