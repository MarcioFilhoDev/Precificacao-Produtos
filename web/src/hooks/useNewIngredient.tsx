import { z } from "zod";

const usageSchema = z.enum(["complete", "partial"]);
const unitSchema = z.enum(["kg", "g", "l", "ml", "un"]);

const positiveNumberInput = z
  .string()
  .trim()
  .min(1, "Campo obrigatório")
  .refine((value) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0;
  }, "Informe um número maior que zero");

const nonNegativeNumberInput = z
  .string()
  .trim()
  .min(1, "Campo obrigatório")
  .refine((value) => {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0;
  }, "Informe um valor igual ou maior que zero");

const unitCategory: Record<z.infer<typeof unitSchema>, string> = {
  kg: "mass",
  g: "mass",
  l: "volume",
  ml: "volume",
  un: "count",
};

export const IngredientSchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome do ingrediente"),
    usage: usageSchema,
    packageQuantity: positiveNumberInput,
    packageUnit: unitSchema,
    usedQuantity: z.string(),
    usedUnit: unitSchema,
    price: nonNegativeNumberInput,
  })
  .superRefine((ingredient, ctx) => {
    if (ingredient.usage !== "partial") return;

    const usedQuantity = ingredient.usedQuantity.trim();
    const parsedQuantity = Number(usedQuantity);

    if (
      !usedQuantity ||
      !Number.isFinite(parsedQuantity) ||
      parsedQuantity <= 0
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["usedQuantity"],
        message: "Informe uma quantidade usada maior que zero",
      });
    }

    if (
      unitCategory[ingredient.packageUnit] !== unitCategory[ingredient.usedUnit]
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["usedUnit"],
        message: "A unidade usada deve ser compatível com a unidade comprada",
      });
    }
  });

export type IngredientFormData = z.infer<typeof IngredientSchema>;
