import { Controller, type Control } from "react-hook-form";
import { ArrowsLeftRightIcon, TrashIcon } from "@phosphor-icons/react";
import type {
  IngredientFormValues,
  ProductFormValues,
} from "../hooks/useNewProduct";
import Input from "./Input";

interface IngredientProps {
  control: Control<ProductFormValues>;
  ingredientForm: IngredientFormValues;
  ingredientIndex: number;
  ingredientCost: number | null;
  updateIngredientUsage: () => void;
  removeIngredient: () => void;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-700">{message}</p>;
}

export default function Ingredient({
  control,
  ingredientForm,
  ingredientIndex,
  ingredientCost,
  updateIngredientUsage,
  removeIngredient,
}: IngredientProps) {
  const fieldPath = `ingredients.${ingredientIndex}` as const;

  return (
    <article className="w-full min-w-0 space-y-5 rounded-2xl border border-line bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-sm font-semibold text-brand-700">
            {ingredientIndex + 1}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-content-strong">
              {ingredientForm.name.trim() || `Ingrediente ${ingredientIndex + 1}`}
            </h3>
            <p className="mt-0.5 text-xs text-content-muted">
              {ingredientForm.usage === "complete" ? "Uso integral" : "Uso parcial"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={updateIngredientUsage}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-content-secondary transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <ArrowsLeftRightIcon size={15} aria-hidden="true" />
            Alterar tipo
          </button>
          <button
            type="button"
            onClick={removeIngredient}
            aria-label={`Excluir ${ingredientForm.name.trim() || `ingrediente ${ingredientIndex + 1}`}`}
            className="grid size-9 place-items-center rounded-lg border border-line text-content-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            <TrashIcon size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name={`${fieldPath}.name`}
          render={({ field, fieldState }) => (
            <div>
              <Input
                label="Nome do ingrediente"
                placeholder="Ex.: Farinha de trigo"
                {...field}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={`${fieldPath}.brand`}
          render={({ field, fieldState }) => (
            <div>
              <Input
                label="Marca"
                placeholder="Ex.: Marca do ingrediente"
                {...field}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name={`${fieldPath}.packageQuantity`}
          render={({ field, fieldState }) => (
            <div>
              <Input
                label={
                  ingredientForm.usage === "complete"
                    ? "Quantidade da embalagem"
                    : "Quantidade comprada"
                }
                type="number"
                min="0"
                step="any"
                placeholder="Ex.: 40"
                {...field}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={`${fieldPath}.packageUnit`}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor={`ingredient-${ingredientIndex}-unit`}
                className="mb-2 block text-sm font-medium text-content-label"
              >
                Unidade
              </label>
              <select
                id={`ingredient-${ingredientIndex}-unit`}
                {...field}
                className="h-12 w-full min-w-0 rounded-xl border border-line bg-surface px-4 text-sm text-content-strong outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
                <option value="ml">mL</option>
                <option value="un">unidade(s)</option>
              </select>
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />

        {ingredientForm.usage === "partial" && (
          <>
            <Controller
              control={control}
              name={`${fieldPath}.usedQuantity`}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    label="Quantidade usada"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Ex.: 200"
                    {...field}
                  />
                  <FieldError message={fieldState.error?.message} />
                </div>
              )}
            />
            <Controller
              control={control}
              name={`${fieldPath}.usedUnit`}
              render={({ field, fieldState }) => (
                <div className="min-w-0">
                  <label
                    htmlFor={`ingredient-${ingredientIndex}-used-unit`}
                    className="mb-2 block text-sm font-medium text-content-label"
                  >
                    Unidade usada
                  </label>
                  <select
                    id={`ingredient-${ingredientIndex}-used-unit`}
                    {...field}
                    className="h-12 w-full min-w-0 rounded-xl border border-line bg-surface px-4 text-sm text-content-strong outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-200/60"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="l">L</option>
                    <option value="ml">mL</option>
                    <option value="un">unidade(s)</option>
                  </select>
                  <FieldError message={fieldState.error?.message} />
                </div>
              )}
            />
          </>
        )}

        <Controller
          control={control}
          name={`${fieldPath}.price`}
          render={({ field, fieldState }) => (
            <div>
              <Input
                label="Valor por unidade comprada (R$)"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex.: 2,49"
                {...field}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      <div
        aria-live="polite"
        className="flex items-center justify-between gap-4 border-t border-line pt-4"
      >
        <div>
          <p className="text-sm font-medium text-content-label">
            Custo do ingrediente
          </p>
          {ingredientCost === null && (
            <p className="mt-0.5 text-xs text-content-muted">
              Preencha os dados para calcular
            </p>
          )}
        </div>
        <p className="shrink-0 text-xl font-semibold tabular-nums tracking-tight text-content-strong">
          {ingredientCost === null
            ? "—"
            : ingredientCost.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
        </p>
      </div>
    </article>
  );
}
