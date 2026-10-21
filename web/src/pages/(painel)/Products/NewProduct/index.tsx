import { PlusIcon } from "@phosphor-icons/react";
import { Controller } from "react-hook-form";
import Input from "../../../../components/Input";
import Ingredient from "../../../../components/Ingredient";
import { useNewProduct } from "../../../../hooks/useNewProduct";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-700">{message}</p>;
}

export default function NewProduct() {
  const {
    control,
    errors,
    fields,
    addIngredient,
    removeIngredient,
    updateIngredientUsage,
    handleSubmit,
    values,
    ingredientCosts,
    totalIngredientCost,
    hasIncompleteCosts,
    totalProductCost,
    unitProductCost,
    profitAmountPerUnit,
    salePricePerUnit,
  } = useNewProduct();
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <section className="w-full max-w-2xl min-w-0 text-content">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Novo produto
        </h1>
        <p className="mt-2 text-sm leading-6 text-content-muted sm:text-base">
          Informe os dados do produto e os ingredientes usados na produção.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <section className="mb-5 w-full rounded-2xl border border-brand-200 bg-brand-50 p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium text-content-muted">
            Custo dos ingredientes
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-brand-900">
            {currencyFormatter.format(totalIngredientCost)}
          </p>
          {hasIncompleteCosts && (
            <p className="mt-2 text-xs text-content-muted">
              O total considera os ingredientes com custo calculado. Preencha os
              dados dos demais ingredientes para incluí-los.
            </p>
          )}
          <div className="mt-5 grid grid-cols-1 gap-4 border-t border-brand-200 pt-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-content-muted">
                Custo total do lote
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-content-strong">
                {currencyFormatter.format(totalProductCost)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-content-muted">
                Custo por unidade
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-content-strong">
                {unitProductCost === null
                  ? "Informe as unidades produzidas"
                  : currencyFormatter.format(unitProductCost)}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full min-w-0 space-y-6 rounded-2xl border border-line bg-surface p-5 shadow-md shadow-content/10 sm:p-6">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <div>
                <Input
                  label="Nome do produto"
                  type="text"
                  placeholder="Digite o nome do produto"
                  {...field}
                />
                <FieldError message={fieldState.error?.message} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="productionQuantity"
            render={({ field, fieldState }) => (
              <div>
                <Input
                  label="Unidades produzidas"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Ex.: 10"
                  {...field}
                />
                <FieldError message={fieldState.error?.message} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="profitPercentage"
            render={({ field, fieldState }) => (
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="profit-percentage"
                    className="text-sm font-medium text-content-label"
                  >
                    Lucro por unidade
                  </label>
                  <span className="rounded-lg bg-brand-50 px-3 py-1 text-sm font-semibold tabular-nums text-brand-800">
                    {field.value}%
                  </span>
                </div>
                <input
                  id="profit-percentage"
                  type="range"
                  min="0"
                  max="300"
                  step="1"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Number(field.value)}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-200 accent-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
                />
                <div className="mt-1 flex justify-between text-xs text-content-muted">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                <FieldError message={fieldState.error?.message} />
                <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl bg-surface-muted p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-content-muted">
                      Lucro por unidade
                    </p>
                    <p className="mt-1 font-semibold tabular-nums text-content-strong">
                      {profitAmountPerUnit === null
                        ? "—"
                        : currencyFormatter.format(profitAmountPerUnit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-content-muted">
                      Preço sugerido por unidade
                    </p>
                    <p className="mt-1 font-semibold tabular-nums text-brand-800">
                      {salePricePerUnit === null
                        ? "—"
                        : currencyFormatter.format(salePricePerUnit)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />

          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-content-label">
                  Adicionar horas trabalhadas
                </p>
                <p className="mt-1 text-xs text-content-muted">
                  Inclua o tempo de produção e o valor da sua hora.
                </p>
              </div>
              <Controller
                control={control}
                name="includeWorkHours"
                render={({ field }) => (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={field.value}
                    aria-label="Adicionar horas trabalhadas"
                    onClick={() => field.onChange(!field.value)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
                      field.value ? "bg-brand-700" : "bg-line-hover"
                    }`}
                  >
                    <span
                      className={`inline-block size-5 translate-y-0.5 rounded-full bg-white shadow transition-transform ${
                        field.value ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                )}
              />
            </div>

            {values.includeWorkHours && (
              <div className="mt-5 space-y-5">
                <Controller
                  control={control}
                  name="workHours"
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        label="Horas trabalhadas"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Ex.: 2,5"
                        {...field}
                      />
                      <FieldError message={fieldState.error?.message} />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="hourlyRate"
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        label="Valor por hora (R$)"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Ex.: 25,00"
                        {...field}
                      />
                      <FieldError message={fieldState.error?.message} />
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        </section>

        <section className="mt-5 w-full min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-md shadow-content/10 sm:p-6">
          <header className="mb-6 border-b border-line pb-5">
            <h2 className="text-xl font-semibold tracking-tight text-content-strong">
              Ingredientes
            </h2>
            <p className="mt-1 text-sm leading-6 text-content-muted">
              Informe os ingredientes usados para produzir este produto.
            </p>
          </header>

          <div className="space-y-4">
            {fields.map((ingredient, index) => (
              <Ingredient
                key={ingredient.id}
                control={control}
                ingredientForm={values.ingredients[index]}
                ingredientIndex={index}
                ingredientCost={ingredientCosts[index] ?? null}
                updateIngredientUsage={() => updateIngredientUsage(index)}
                removeIngredient={() => removeIngredient(index)}
              />
            ))}
          </div>

          {(errors.ingredients?.root?.message ??
            errors.ingredients?.message) && (
            <FieldError
              message={
                errors.ingredients.root?.message ?? errors.ingredients.message
              }
            />
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                addIngredient("complete");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-content-strong transition hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              <PlusIcon size={17} weight="bold" aria-hidden="true" />
              Ingrediente integral
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                addIngredient("partial");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              <PlusIcon size={17} weight="bold" aria-hidden="true" />
              Ingrediente parcial
            </button>
          </div>
        </section>

        <button
          id="show-product-payload"
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-950/20 transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Mostrar dados para salvar
        </button>
      </form>
    </section>
  );
}
