import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { IngredientValues } from "./useNewIngredient";
import { calculateIngredientCost } from "../utils/ingredientCost";

const ProductSchema = z.object({
  product_name: z.string().trim().min(1, "O nome é obrigatório"),
  production_quantity: z
    .number()
    .int("O rendimento deve ser informado em unidades inteiras")
    .positive("O rendimento deve ser maior que zero"),
  labor_hours: z.number().nonnegative("As horas não podem ser negativas"),
  hourly_rate: z.number().nonnegative("O valor da hora não pode ser negativo"),
  profit_percentage: z
    .number()
    .min(0, "O lucro não pode ser menor que 0%")
    .max(100, "O lucro não pode ser maior que 100%"),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;

export type ProductRegistrationPreview = ProductFormValues & {
  labor_cost: number;
  production_cost: number | null;
  product_cost: number | null;
  profit_amount: number | null;
  sale_price: number | null;
  list_of_ingredients: Array<IngredientValues & { ingredient_cost?: number }>;
};

const useNewProduct = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      product_name: "",
      production_quantity: 1,
      labor_hours: 0,
      hourly_rate: 0,
      profit_percentage: 30,
    },
  });

  function registerNewProduct(
    product: ProductFormValues,
    ingredients: IngredientValues[],
  ): ProductRegistrationPreview {
    const ingredientCosts = ingredients.map(calculateIngredientCost);
    const allIngredientCostsCalculated = ingredientCosts.every(
      (cost): cost is number => cost !== undefined,
    );
    const labor_cost = product.labor_hours * product.hourly_rate;
    const production_cost = allIngredientCostsCalculated
      ? ingredientCosts.reduce((total, cost) => total + cost, labor_cost)
      : null;
    const product_cost =
      production_cost === null
        ? null
        : production_cost / product.production_quantity;

    return {
      ...product,
      labor_cost,
      production_cost,
      product_cost,
      profit_amount:
        product_cost === null
          ? null
          : (product_cost * product.profit_percentage) / 100,
      sale_price:
        product_cost === null
          ? null
          : product_cost * (1 + product.profit_percentage / 100),
      list_of_ingredients: ingredients.map((ingredient, index) => {
        const ingredientCost = ingredientCosts[index];
        return ingredientCost === undefined
        ? ingredient
        : { ...ingredient, ingredient_cost: ingredientCost };
      }),
    };
  }

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit,
    registerNewProduct,
    reset,
    setValue,
    watch,
  };
};

export { useNewProduct };
