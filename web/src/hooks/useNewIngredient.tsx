import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const IngredientFieldsSchema = z.object({
  ingredient_name: z.string().trim().min(1, "O nome é obrigatório"),
  purchase_quantity: z.number().positive("A quantidade comprada deve ser maior que zero"),
  purchase_unity: z.string().trim().min(1, "A unidade deve ser informada"),
  used_quantity: z.number().positive("A quantidade deve ser maior que zero"),
  used_unity: z.string().trim().min(1, "A unidade deve ser informada"),
  purchase_unit_price: z.number().nonnegative("O valor não pode ser negativo"),
  brand: z.string().trim().min(1, "A marca é obrigatória"),
});

const IngredientSchema = IngredientFieldsSchema.extend({
  ingredient_index: z.number().int().nonnegative(),
});

export type IngredientFormValues = z.infer<typeof IngredientFieldsSchema>;
export type IngredientValues = z.infer<typeof IngredientSchema>;

const useNewIngredient = () => {
  const {
    control,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IngredientFormValues>({
    resolver: zodResolver(IngredientFieldsSchema),
    mode: "onTouched",
    defaultValues: {
      ingredient_name: "",
      purchase_quantity: 0,
      purchase_unity: "",
      used_quantity: 0,
      used_unity: "",
      purchase_unit_price: 0,
      brand: "",
    },
  });

  async function validateIngredient(ingredientIndex: number) {
    const isValid = await trigger();

    return isValid
      ? { ...getValues(), ingredient_index: ingredientIndex }
      : undefined;
  }

  return { control, errors, validateIngredient, watch };
};

export { useNewIngredient, IngredientSchema };
