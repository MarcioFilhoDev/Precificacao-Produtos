import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";
import type { Products } from "../types/data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface ProductContextProps {
  products: Products[] | [];
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext({} as ProductContextProps);

interface ProductProviderProps {
  children: ReactNode;
}

export default function ProductProvider({ children }: ProductProviderProps) {
  const { userInfo } = useContext(AuthContext);

  const [products, setProducts] = useState<Products[] | []>([]);

  useEffect(() => {
    async function getAllProducts() {
      const userId = userInfo?.id;

      if (!userId) return;

      try {
        const productsRef = collection(db, "products", userId, "products");
        const snapshot = await getDocs(productsRef);

        setProducts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Products[],
        );
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    getAllProducts();
  }, [userInfo?.id]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
