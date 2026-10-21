export type User = {
  id?: string;
  name: string;
  email: string;
  photo?: string;
  created_at: string;
};

export type Products = {
  id?: string;
  name: string;
  sale_price: number;
  list_of_ingredients: Ingredients[];
  production_quantity: number;
  product_cost: number;
  labor_hours?: number;
  hourly_rate?: number;
  labor_cost?: number;
  production_cost: number;
  profit_percentage?: number;
  profit_amount?: number;
  created_at: string;
  last_updated: string;
};

export type Sales = {
  id?: string;
  user_id: string;
  product_name: string;
  quantity: number;
  total_sale_price: number;
  sale_date: string;
};

export type Ingredients = {
  ingredient_index: number;
  ingredient_name: string;
  purchase_quantity?: number;
  purchase_unity?: string;
  used_quantity: number;
  used_unity: string;
  purchase_price: number;
  brand: string;
  ingredient_cost?: number;
};
