import { PlusIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <section className="w-full max-w-6xl text-content">
      <header className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Seus produtos
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-content-muted sm:text-base">
            Organize suas receitas e acompanhe os preços dos produtos que você
            oferece.
          </p>
        </div>

        <Link
          to="/new-product"
          className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-950/20 transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <PlusIcon size={18} weight="bold" aria-hidden="true" />
          Registrar produto
        </Link>
      </header>

      <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
        <h2 className="text-sm font-semibold text-content-label">
          Produtos cadastrados
        </h2>
        <span className="rounded-full bg-surface-tint px-3 py-1 text-xs font-semibold text-accent-green">
          {/* {products.length} {products.length === 1 ? "produto" : "produtos"} */}
        </span>
      </div>

      <ul className="grid list-none grid-cols-1 gap-4 p-0 xl:grid-cols-2">
        {/* {products.map((product, index) => (
          <li key={product.id}>
            <article className="group h-full rounded-2xl border border-line bg-surface p-5 shadow-md shadow-content/10 transition duration-200 hover:-translate-y-0.5 hover:border-line-hover hover:shadow-lg hover:shadow-content/10 sm:p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${cardAccents[index % cardAccents.length]}`}
                  aria-hidden="true"
                >
                  <PackageIcon size={24} weight="duotone" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-content-strong sm:text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-content-faint">
                        Atualizado em{" "}
                        {dateFormatter.format(new Date(product.last_updated))}
                      </p>
                    </div>
                    <p className="shrink-0 text-lg font-semibold tracking-tight text-brand-700">
                      {currencyFormatter.format(product.sale_price)}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-line-muted pt-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-content-secondary">
                        Ingredientes
                      </p>
                      <span className="text-xs text-content-faint">
                        {product.ingredients.length} itens
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.slice(0, 4).map((ingredient) => (
                        <span
                          key={ingredient.id}
                          className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs text-content-secondary"
                        >
                          {ingredient.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))} */}
      </ul>
    </section>
  );
}
