import { ArrowLeftIcon, ClockIcon, PlusIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useNewProduct } from "../../../../hooks/useNewProduct";
import { Controller } from "react-hook-form";
import { useCallback, useMemo, useRef, useState } from "react";
import Input from "../../../../components/Input";
import IngredientCard, {
  type IngredientCardHandle,
} from "../../../../components/IngredientCard";
import type { IngredientValues } from "../../../../hooks/useNewIngredient";
import type { ProductRegistrationPreview } from "../../../../hooks/useNewProduct";

export default function NewProduct() {
  const {
    control,
    errors,
    handleSubmit,
    registerNewProduct,
    setValue,
    watch,
    isSubmitting,
  } = useNewProduct();
  const [ingredientIds, setIngredientIds] = useState<number[]>([]);
  const [ingredientCosts, setIngredientCosts] = useState<
    Record<number, number | undefined>
  >({});
  const [ingredientListError, setIngredientListError] = useState("");
  const [registrationPreview, setRegistrationPreview] =
    useState<ProductRegistrationPreview | null>(null);
  const ingredientRefs = useRef(new Map<number, IngredientCardHandle>());
  const nextIngredientId = useRef(0);
  const productValues = watch();
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    [],
  );
  const ingredientsCost =
    ingredientIds.length > 0 &&
    ingredientIds.every((id) => ingredientCosts[id] !== undefined)
      ? ingredientIds.reduce((total, id) => total + ingredientCosts[id]!, 0)
      : undefined;
  const laborCost = productValues.labor_hours * productValues.hourly_rate;
  const productionCost =
    ingredientsCost === undefined ? undefined : ingredientsCost + laborCost;
  const productCost =
    productionCost === undefined || productValues.production_quantity <= 0
      ? undefined
      : productionCost / productValues.production_quantity;
  const salePrice =
    productCost === undefined
      ? undefined
      : productCost * (1 + productValues.profit_percentage / 100);

  const updateIngredientCost = useCallback(
    (ingredientId: number, cost: number | undefined) => {
      setIngredientCosts((currentCosts) => {
        if (currentCosts[ingredientId] === cost) {
          return currentCosts;
        }
        return { ...currentCosts, [ingredientId]: cost };
      });
    },
    [],
  );

  function addIngredient() {
    const ingredientId = nextIngredientId.current++;
    setIngredientIds((ids) => [...ids, ingredientId]);
    setIngredientListError("");
    setRegistrationPreview(null);
  }

  function removeIngredient(index: number) {
    const removedId = ingredientIds[index];
    setIngredientIds((ids) =>
      ids.filter((_, itemIndex) => itemIndex !== index),
    );
    setIngredientCosts((costs) => {
      const remainingCosts = { ...costs };
      delete remainingCosts[removedId];
      return remainingCosts;
    });
    setRegistrationPreview(null);
    if (ingredientListError) {
      setIngredientListError("");
    }
  }

  async function submitProduct(
    product: Parameters<typeof registerNewProduct>[0],
  ) {
    setRegistrationPreview(null);

    if (ingredientIds.length === 0) {
      setIngredientListError("Adicione pelo menos um ingrediente.");
      return;
    }

    const validationResults = await Promise.all(
      ingredientIds.map((id, index) =>
        ingredientRefs.current.get(id)?.validate(index),
      ),
    );
    const ingredients = validationResults.filter(
      (ingredient): ingredient is IngredientValues => ingredient !== undefined,
    );
    if (ingredients.length !== ingredientIds.length) {
      return;
    }

    setRegistrationPreview(registerNewProduct(product, ingredients));
  }

  return (
    <section className="w-full max-w-7xl text-content">
      <Link
        to="/products"
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-content-secondary transition hover:text-brand-700"
      >
        <ArrowLeftIcon size={18} aria-hidden="true" />
        Voltar para produtos
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-content-heading sm:text-4xl">
          Registrando novo produto
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-content-muted sm:text-base">
          Informe os dados de produção e os ingredientes para calcular o custo
          da sua receita.
        </p>
      </header>

      <form
        onSubmit={(event) => {
          void handleSubmit(submitProduct)(event);
        }}
        className="space-y-6"
      >
        <section className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-content/5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex shadow size-10 shrink-0 items-center justify-center rounded-xl bg-accent-green-soft text-accent-green">
              <ClockIcon size={21} weight="duotone" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-content-heading">
                Dados do produto
              </h2>
              <p className="mt-1 text-sm text-content-muted">
                Defina o nome, o custo da mão de obra e a margem de lucro.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
            <Controller
              control={control}
              name="product_name"
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <Input
                    label="Nome do produto"
                    placeholder="Ex.: Bolo de chocolate"
                    value={value}
                    onChange={onChange}
                  />

                  {errors.product_name && (
                    <span className="ml-1 block text-xs text-red-600">
                      {errors.product_name.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="production_quantity"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    label="Unidades produzidas por receita"
                    placeholder="Ex.: 24 doces"
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                  {errors.production_quantity?.message && (
                    <span className="ml-1 block text-xs text-red-600">
                      {errors.production_quantity.message}
                    </span>
                  )}
                  <span className="ml-1 text-xs text-content-faint">
                    Quantos doces ou unidades essa receita rende.
                  </span>
                </div>
              )}
            />

            <Controller
              control={control}
              name="labor_hours"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Input
                    type="number"
                    min={0}
                    step={0.5}
                    label="Horas de trabalho"
                    placeholder="Ex.: 2"
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(
                        Number(event.target.value.replace(",", ".")),
                      )
                    }
                  />
                  {errors.labor_hours?.message && (
                    <span className="ml-1 block text-xs text-red-600">
                      {errors.labor_hours.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="hourly_rate"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    label="Valor da sua hora"
                    placeholder="R$ 0,00"
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(
                        Number(event.target.value.replace(",", ".")),
                      )
                    }
                  />
                  {errors.hourly_rate?.message && (
                    <span className="ml-1 block text-xs text-red-600">
                      {errors.hourly_rate.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="profit_percentage"
              render={({ field: { value } }) => (
                <div className="space-y-3">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={value}
                    onChange={(event) =>
                      setValue(
                        "profit_percentage",
                        Math.min(100, Math.max(0, Number(event.target.value))),
                        { shouldValidate: true },
                      )
                    }
                    label="Porcentagem de lucro"
                  />

                  <div className="rounded-xl border border-line-muted bg-surface-muted px-3.5 py-3">
                    <div className="mb-2 flex items-center justify-between text-xs font-medium text-content-secondary">
                      <span>0%</span>
                      <span className="rounded-full bg-accent-green-soft px-2 py-0.5 font-semibold text-accent-green">
                        {value}%
                      </span>
                      <span>100%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={value}
                      onChange={(event) =>
                        setValue(
                          "profit_percentage",
                          Number(event.target.value),
                          {
                            shouldValidate: true,
                          },
                        )
                      }
                      aria-label="Ajustar porcentagem de lucro"
                      className="h-2 w-full cursor-pointer accent-brand-700 focus-visible:ring-4 focus-visible:ring-brand-200/60"
                    />
                  </div>
                </div>
              )}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-2 block text-sm font-medium text-content-label">
                Custo de fabricação por unidade
              </span>
              <output className="flex h-12 items-center rounded-xl border border-line bg-surface-tint px-3.5 text-sm font-semibold text-accent-green">
                {productCost === undefined
                  ? "—"
                  : currencyFormatter.format(productCost)}
              </output>
              <span className="mt-1.5 block text-xs leading-5 text-content-faint">
                Custo do lote (ingredientes + mão de obra) dividido pelo
                rendimento de {productValues.production_quantity} unidade(s).
              </span>
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-content-label">
                Valor de venda ideal
              </span>
              <output className="flex h-12 items-center rounded-xl border border-line bg-surface-tint px-3.5 text-sm font-semibold text-accent-green">
                {salePrice === undefined
                  ? "—"
                  : currencyFormatter.format(salePrice)}
              </output>
              <span className="mt-1.5 block text-xs leading-5 text-content-faint">
                Custo unitário acrescido da porcentagem de lucro escolhida.
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-content/5 sm:p-7">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-content-heading">
                  Ingredientes
                </h2>
                <span className="rounded-full bg-surface-tint px-2.5 py-1 text-xs font-semibold text-accent-green">
                  {ingredientIds.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-content-muted">
                Informe quanto você compra e quanto usa em cada receita.
              </p>
            </div>
            <button
              onClick={addIngredient}
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-line-brand bg-white px-4 text-sm font-semibold text-brand-700 transition hover:bg-surface-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 sm:self-auto"
            >
              <PlusIcon size={18} weight="bold" aria-hidden="true" />
              Adicionar ingrediente
            </button>
          </div>

          {ingredientListError && (
            <p className="mb-4 text-sm text-red-600" role="alert">
              {ingredientListError}
            </p>
          )}

          <div className="space-y-4">
            {ingredientIds.map((ingredientId, index) => (
              <IngredientCard
                key={ingredientId}
                index={index}
                ingredientId={ingredientId}
                onCostChange={updateIngredientCost}
                onRemove={removeIngredient}
                canRemove={ingredientIds.length > 1}
                ref={(card) => {
                  if (card) {
                    ingredientRefs.current.set(ingredientId, card);
                  } else {
                    ingredientRefs.current.delete(ingredientId);
                  }
                }}
              />
            ))}
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
          <Link
            to="/products"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-5 text-sm font-semibold text-content-secondary transition hover:bg-surface-muted"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-700 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-950/15 transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Salvar produto
          </button>
        </div>
      </form>

      {registrationPreview && (
        <section
          aria-labelledby="registration-preview-title"
          className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-sm shadow-content/5 sm:p-7"
        >
          <h2
            id="registration-preview-title"
            className="text-lg font-semibold text-content-heading"
          >
            Prévia dos dados do produto
          </h2>
          <p className="mt-1 text-sm text-content-muted">
            Esta é a estrutura validada que será preparada para o cadastro. Ela
            ainda não foi enviada ao banco de dados.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-muted p-4 text-sm text-content-strong">
            {JSON.stringify(registrationPreview, null, 2)}
          </pre>
        </section>
      )}
    </section>
  );
}
