import { PackageIcon } from "@phosphor-icons/react";
import type { Products } from "../types/data";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react/dist/icons/DotsThreeVertical";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  product: Products;
}

export default function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();

  return (
    <li className="h-full">
      <article className="h-full rounded-lg border border-line bg-surface p-5 transition hover:border-line-hover hover:shadow-md">
        <div className="flex flex-row justify-between">
          <h2 className="flex flex-row items-center gap-2 text-lg font-semibold text-content-strong">
            <PackageIcon size={20} weight="duotone" />
            {product.name}
          </h2>

          <button
            type="button"
            title="Editar produto"
            aria-label={`Editar ${product.name}`}
            onClick={() => {
              if (product.id) navigate(`/edit-product/${product.id}`);
            }}
            className="rounded-lg p-1 text-content-muted transition hover:bg-surface-muted hover:text-content-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <DotsThreeVerticalIcon size={20} weight="duotone" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 border-t border-line-muted pt-4">
          <div className="pr-4">
            <p className="text-xs text-content-secondary">
              Custo de fabricação
            </p>
            <p className="mt-1 text-base font-semibold text-content">
              {product.product_cost.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </p>
          </div>

          <div className="border-l border-line-muted pl-4">
            <p className="text-xs text-content-secondary">Preço de venda</p>
            <p className="mt-1 text-xl font-semibold text-brand-700">
              {product.sale_price.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </p>
          </div>
        </div>
      </article>
    </li>
  );
}
