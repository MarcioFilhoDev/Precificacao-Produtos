import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../contexts/AuthContext";
import { db } from "../../../../services/firebaseConnection";
import type { Products as Product } from "../../../../types/data";
import { ProductForm } from "../NewProduct";

export default function EditProduct() {
  const { productId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!userInfo?.id || !productId) {
        toast.error("Não foi possível identificar o produto.");
        navigate("/products");
        return;
      }

      try {
        const productRef = doc(
          db,
          "products",
          userInfo.id,
          "products",
          productId,
        );
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
          toast.error("Produto não encontrado.");
          navigate("/products");
          return;
        }

        setProduct({ ...snapshot.data(), id: snapshot.id } as Product);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar o produto.");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [navigate, productId, userInfo?.id]);

  if (loading) {
    return (
      <div className="flex min-h-48 w-full items-center justify-center text-sm text-content-muted">
        Carregando produto...
      </div>
    );
  }

  if (!product || !productId) return null;

  return <ProductForm productId={productId} initialProduct={product} />;
}