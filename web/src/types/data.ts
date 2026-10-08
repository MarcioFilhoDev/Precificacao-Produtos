export type User = {
  id?: string;
  name: string;
  email: string;
  photo?: string;
  created_at: string;
};

export type Products = {
  id?: string;
  id_user: string;
  name: string;
  sale_price: number;
  ingredients: Ingredients[];
  created_at: string;
  last_updated: string;
};

export type Sales = {
  id?: string;
  id_user: string;
  id_product: string;
  quantity: number;
  total_sale_price: number;
  sale_date: string;
};

export type Ingredients = {
  id?: string;
  name: string;
  unity: string;
  quantity: number;
  purchase_price: number;
  brand: string;
  created_at: string;
  last_updated: string;
};
