import { PlusIcon } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Products } from "../../../types/data";
import { AuthContext } from "../../../contexts/AuthContext";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import ProductItem from "../../../components/ProductItem";

export default function Products() {
  const { userInfo } = useContext(AuthContext);

  const [products, setProducts] = useState<Products[] | []>([]);

  useEffect(() => {
    async function getAllProducts() {
      const userId = userInfo?.id;

      if (!userId) {
        return;
      }

      const q = query(collection(db, "products", userId, "products"));

      const snapshot = await getDocs(q);
      setProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Products[],
      );
    }

    getAllProducts();
  }, [userInfo]);

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
          {products.length} {products.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      <ul className="grid list-none grid-cols-1 gap-4 p-0 xl:grid-cols-2">
        {products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </ul>
    </section>
  );
}
