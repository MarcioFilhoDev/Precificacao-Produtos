import { TrashIcon } from "@phosphor-icons/react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Controller } from "react-hook-form";
import {
  useNewIngredient,
  type IngredientValues,
} from "../hooks/useNewIngredient";
import { calculateIngredientCost } from "../utils/ingredientCost";
import Input from "./Input";

const ingredientUnits = [
  { label: "Miligramas (mg)", value: "mg" },
  { label: "Gramas (g)", value: "g" },
  { label: "Quilogramas (kg)", value: "kg" },
  { label: "Toneladas (t)", value: "t" },
  { label: "Mililitros (ml)", value: "ml" },
  { label: "Centilitros (cl)", value: "cl" },
  { label: "Decilitros (dl)", value: "dl" },
  { label: "Litros (l)", value: "l" },
  { label: "Unidade", value: "unidade" },
  { label: "Pacote", value: "pacote" },
  { label: "Caixa", value: "caixa" },
  { label: "Saco", value: "saco" },
  { label: "Lata", value: "lata" },
  { label: "Frasco", value: "frasco" },
];

interface IngredientCardProps {
  index: number;
  onRemove: (index: number) => void;
  canRemove: boolean;
  ingredientId: number;
  onCostChange: (ingredientId: number, cost: number | undefined) => void;
}

export interface IngredientCardHandle {
  validate: (ingredientIndex: number) => Promise<IngredientValues | undefined>;
}

const IngredientCard = forwardRef<IngredientCardHandle, IngredientCardProps>(
  function IngredientCard(
    { index, onRemove, canRemove, ingredientId, onCostChange },
    ref,
  ) {
    const { control, errors, validateIngredient, watch } = useNewIngredient();
    const ingredient = watch();
    const cost = calculateIngredientCost(ingredient);
    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    useImperativeHandle(ref, () => ({
      validate: validateIngredient,
    }));

    useEffect(() => {
      onCostChange(ingredientId, cost);
    }, [cost, ingredientId, onCostChange]);

    return (
      <article className="rounded-xl border border-line-muted bg-surface-muted/60 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-content-label">
            Ingrediente {String(index + 1).padStart(2, "0")}
          </h3>
          <button
            type="button"
            onClick={() => onRemove(index)}
            disabled={!canRemove}
            className="inline-flex size-9 items-center justify-center rounded-lg text-content-faint transition hover:bg-accent-terracotta-soft hover:text-accent-terracotta disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label={`Remover ingrediente ${index + 1}`}
            title={
              !canRemove
                ? "Mantenha pelo menos um ingrediente"
                : "Remover ingrediente"
            }
          >
            <TrashIcon size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Controller
            control={control}
            name="ingredient_name"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Input
                  label="Nome do ingrediente"
                  placeholder="Ex.: Farinha de trigo"
                  value={value}
                  onChange={onChange}
                />

                {errors.ingredient_name?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.ingredient_name.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="brand"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Input
                  label="Marca"
                  placeholder="Ex.: Marca do produto"
                  value={value}
                  onChange={onChange}
                />

                {errors.brand?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.brand.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="purchase_unit_price"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  label="Preço por unidade de compra"
                  placeholder="Ex.: R$ 4,00 por litro"
                  value={value}
                  onChange={(event) => onChange(Number(event.target.value))}
                />
                {errors.purchase_unit_price?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.purchase_unit_price.message}
                  </span>
                )}
                <span className="ml-1 text-xs text-content-faint">
                  Informe o preço de 1{" "}
                  {ingredient.purchase_unity || "unidade"}.
                </span>
              </div>
            )}
          />

          <Controller
            control={control}
            name="purchase_quantity"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  min={0}
                  label="Quantidade comprada"
                  placeholder="Ex.: 1"
                  value={value}
                  onChange={(event) => onChange(Number(event.target.value))}
                />
                {errors.purchase_quantity?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.purchase_quantity.message}
                  </span>
                )}
                {ingredient.purchase_quantity > 0 && (
                  <span className="ml-1 text-xs text-content-faint">
                    Total comprado:{" "}
                    {currencyFormatter.format(
                      ingredient.purchase_unit_price *
                        ingredient.purchase_quantity,
                    )}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="purchase_unity"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-content-label">
                    Unidade de compra
                  </span>
                  <select
                    {...field}
                    className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-sm text-content-strong outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
                  >
                    <option value="">Selecione uma unidade</option>
                    {ingredientUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.purchase_unity?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.purchase_unity.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="used_quantity"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Input
                  label="Quantidade usada"
                  placeholder="Ex.: 250"
                  value={value}
                  onChange={(event) =>
                    onChange(Number(event.target.value.replace(",", ".")))
                  }
                />
                {errors.used_quantity?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.used_quantity.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="used_unity"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-content-label">
                    Unidade usada
                  </span>
                  <select
                    {...field}
                    className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-sm text-content-strong outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
                  >
                    <option value="">Selecione uma unidade</option>
                    {ingredientUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.used_unity?.message && (
                  <span className="ml-1 block text-xs text-red-600">
                    {errors.used_unity.message}
                  </span>
                )}
              </div>
            )}
          />

          <div>
            <span className="mb-2 block text-sm font-medium text-content-label">
              Custo do ingrediente
            </span>
            <output className="flex h-12 items-center rounded-xl border border-line bg-surface-tint px-3.5 text-sm font-semibold text-accent-green">
              {cost === undefined ? "—" : currencyFormatter.format(cost)}
            </output>
            <span className="mt-1.5 block text-xs leading-5 text-content-faint">
              {cost === undefined
                ? "Informe unidades iguais ou conversíveis (kg/g, L/ml)."
                : "Calculado com conversão automática das unidades."}
            </span>
          </div>
        </div>
      </article>
    );
  },
);

export default IngredientCard;
