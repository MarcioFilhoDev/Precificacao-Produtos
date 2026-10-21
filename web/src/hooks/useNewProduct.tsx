import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { db } from "../services/firebaseConnection";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const unitSchema = z.enum(["kg", "g", "l", "ml", "un"]);
const usageSchema = z.enum(["complete", "partial"]);

const positiveNumberString = z
  .string()
  .trim()
  .min(1, "Campo obrigatório")
  .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
    message: "Informe um valor maior que zero",
  });

const nonNegativeNumberString = z
  .string()
  .trim()
  .min(1, "Campo obrigatório")
  .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0, {
    message: "Informe um valor igual ou maior que zero",
  });

const IngredientSchema = z
  .object({
    usage: usageSchema,
    name: z.string().trim().min(1, "Informe o nome do ingrediente"),
    brand: z.string().trim(),
    packageQuantity: positiveNumberString,
    packageUnit: unitSchema,
    usedQuantity: z.string(),
    usedUnit: unitSchema,
    price: nonNegativeNumberString,
  })
  .superRefine((ingredient, context) => {
    if (ingredient.usage !== "partial") return;

    const quantity = ingredient.usedQuantity.trim();
    if (
      !quantity ||
      !Number.isFinite(Number(quantity)) ||
      Number(quantity) <= 0
    ) {
      context.addIssue({
        code: "custom",
        path: ["usedQuantity"],
        message: "Informe a quantidade usada",
      });
    }

    const unitsByCategory: Record<string, string> = {
      kg: "mass",
      g: "mass",
      l: "volume",
      ml: "volume",
      un: "count",
    };

    if (
      unitsByCategory[ingredient.packageUnit] !==
      unitsByCategory[ingredient.usedUnit]
    ) {
      context.addIssue({
        code: "custom",
        path: ["usedUnit"],
        message: "Use uma unidade compatível com a unidade comprada",
      });
    }
  });

const ProductSchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome do produto"),
    productionQuantity: positiveNumberString,
    profitPercentage: z.string().refine((value) => {
      const percentage = Number(value);
      return (
        Number.isFinite(percentage) && percentage >= 0 && percentage <= 300
      );
    }, "A porcentagem de lucro deve ficar entre 0% e 100%"),
    includeWorkHours: z.boolean(),
    workHours: z.string(),
    hourlyRate: z.string(),
    ingredients: z
      .array(IngredientSchema)
      .min(1, "Adicione ao menos um ingrediente"),
  })
  .superRefine((product, context) => {
    if (!product.includeWorkHours) return;

    for (const field of ["workHours", "hourlyRate"] as const) {
      const value = product[field].trim();
      if (!value || !Number.isFinite(Number(value)) || Number(value) <= 0) {
        context.addIssue({
          code: "custom",
          path: [field],
          message: "Informe um valor maior que zero",
        });
      }
    }
  });

export type ProductFormValues = z.infer<typeof ProductSchema>;
export type IngredientFormValues = ProductFormValues["ingredients"][number];
export type IngredientUsage = IngredientFormValues["usage"];

const unitConversions: Record<
  IngredientFormValues["packageUnit"],
  { category: string; factor: number }
> = {
  kg: { category: "mass", factor: 1000 },
  g: { category: "mass", factor: 1 },
  l: { category: "volume", factor: 1000 },
  ml: { category: "volume", factor: 1 },
  un: { category: "count", factor: 1 },
};

export function getIngredientCost(
  ingredient: IngredientFormValues,
): number | null {
  const price = Number(ingredient.price);
  if (ingredient.price.trim() === "" || !Number.isFinite(price) || price < 0) {
    return null;
  }

  const packageQuantity = Number(ingredient.packageQuantity);
  const packageUnit = unitConversions[ingredient.packageUnit];
  if (!Number.isFinite(packageQuantity) || packageQuantity <= 0) {
    return null;
  }

  if (ingredient.usage === "complete") return packageQuantity * price;

  const usedQuantity = Number(ingredient.usedQuantity);
  const usedUnit = unitConversions[ingredient.usedUnit];

  if (
    !Number.isFinite(usedQuantity) ||
    usedQuantity <= 0 ||
    packageUnit.category !== usedUnit.category
  ) {
    return null;
  }

  const usedQuantityInPackageUnits =
    (usedQuantity * usedUnit.factor) / packageUnit.factor;
  return usedQuantityInPackageUnits * price;
}

const defaultIngredient = (usage: IngredientUsage): IngredientFormValues => ({
  usage,
  name: "",
  brand: "",
  packageQuantity: "",
  packageUnit: "kg",
  usedQuantity: "",
  usedUnit: "g",
  price: "",
});

const useNewProduct = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      productionQuantity: "",
      profitPercentage: "30",
      includeWorkHours: false,
      workHours: "",
      hourlyRate: "",
      ingredients: [],
    },
  });

  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  });
  const watchedIngredients = useWatch({
    control,
    name: "ingredients",
    defaultValue: [],
  });
  const includeWorkHours = useWatch({
    control,
    name: "includeWorkHours",
    defaultValue: false,
  });
  const productionQuantity = useWatch({
    control,
    name: "productionQuantity",
    defaultValue: "",
  });
  const profitPercentage = useWatch({
    control,
    name: "profitPercentage",
    defaultValue: "30",
  });
  const workHours = useWatch({
    control,
    name: "workHours",
    defaultValue: "",
  });
  const hourlyRate = useWatch({
    control,
    name: "hourlyRate",
    defaultValue: "",
  });
  const ingredientValues = ingredients.fields.map(
    (_, index) =>
      watchedIngredients[index] ??
      getValues(`ingredients.${index}`) ??
      defaultIngredient("complete"),
  );

  function addIngredient(usage: IngredientUsage) {
    ingredients.append(defaultIngredient(usage));
  }

  function updateIngredientUsage(index: number) {
    const currentUsage = getValues(`ingredients.${index}.usage`);
    setValue(
      `ingredients.${index}.usage`,
      currentUsage === "complete" ? "partial" : "complete",
      { shouldDirty: true, shouldValidate: true },
    );
  }

  const ingredientCosts = ingredientValues.map((ingredient) =>
    getIngredientCost(ingredient),
  );
  const totalIngredientCost = ingredientCosts.reduce<number>(
    (total, cost) => total + (cost ?? 0),
    0,
  );
  const laborCost =
    includeWorkHours && Number(workHours) > 0 && Number(hourlyRate) >= 0
      ? Number(workHours) * Number(hourlyRate)
      : 0;
  const totalProductCost = totalIngredientCost + laborCost;
  const unitProductCost =
    Number(productionQuantity) > 0
      ? totalProductCost / Number(productionQuantity)
      : null;
  const profitAmountPerUnit =
    unitProductCost === null
      ? null
      : unitProductCost * (Number(profitPercentage) / 100);
  const salePricePerUnit =
    unitProductCost === null || profitAmountPerUnit === null
      ? null
      : unitProductCost + profitAmountPerUnit;

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleCreateProduct(product: ProductFormValues) {
    const userId = userInfo?.id;
    if (!userId) {
      toast.error("Não foi possível identificar o usuário.");
      return;
    }

    const submittedLaborCost = product.includeWorkHours
      ? Number(product.workHours) * Number(product.hourlyRate)
      : 0;
    const listOfIngredients = product.ingredients.map((ingredient, index) => {
      const ingredientCost = getIngredientCost(ingredient) ?? 0;
      const usedQuantity =
        ingredient.usage === "complete"
          ? Number(ingredient.packageQuantity)
          : Number(ingredient.usedQuantity);
      const usedUnit =
        ingredient.usage === "complete"
          ? ingredient.packageUnit
          : ingredient.usedUnit;

      return {
        ingredient_index: index,
        ingredient_name: ingredient.name.trim(),
        purchase_quantity: Number(ingredient.packageQuantity),
        purchase_unity: ingredient.packageUnit,
        used_quantity: usedQuantity,
        used_unity: usedUnit,
        purchase_price: Number(ingredient.price),
        brand: ingredient.brand.trim(),
        ingredient_cost: ingredientCost,
      };
    });

    const productCost = listOfIngredients.reduce(
      (total, ingredient) => total + ingredient.ingredient_cost,
      0,
    );
    const databasePayload = {
      name: product.name.trim(),
      sale_price:
        ((productCost + submittedLaborCost) /
          Number(product.productionQuantity)) *
        (1 + Number(product.profitPercentage) / 100),
      production_quantity: Number(product.productionQuantity),
      list_of_ingredients: listOfIngredients,
      product_cost: productCost,
      production_cost: productCost + submittedLaborCost,
      profit_percentage: Number(product.profitPercentage),
      profit_amount:
        ((productCost + submittedLaborCost) /
          Number(product.productionQuantity)) *
        (Number(product.profitPercentage) / 100),
      ...(product.includeWorkHours && {
        labor_hours: Number(product.workHours),
        hourly_rate: Number(product.hourlyRate),
        labor_cost: submittedLaborCost,
      }),
    };

    try {
      const productsRef = collection(db, "products", userId, "products");
      await addDoc(productsRef, databasePayload);
      toast.success("Produto salvo com sucesso!");
      navigate("/products");
    } catch (error) {
      toast.error("Erro ao registrar novo produto");
      console.log(error);
      throw error;
    }
  }

  return {
    control,
    errors,
    isSubmitting,
    fields: ingredients.fields,
    addIngredient,
    removeIngredient: ingredients.remove,
    updateIngredientUsage,
    handleSubmit,
    handleCreateProduct,
    values: { ingredients: ingredientValues, includeWorkHours },
    ingredientCosts,
    totalIngredientCost,
    hasIncompleteCosts: ingredientCosts.some((cost) => cost === null),
    totalProductCost,
    unitProductCost,
    profitAmountPerUnit,
    salePricePerUnit,
  };
};

export { useNewProduct };
