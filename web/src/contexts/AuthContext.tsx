import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  signOut,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth, db } from "../services/firebaseConnection";
import { toast } from "react-toastify";
import type { User } from "../types/data";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextProps {
  signed: boolean;
  loading: boolean;
  userInfo: User | null;
  stayConnected: boolean;
  setStayConnected: React.Dispatch<React.SetStateAction<boolean>>;
  registerNewUser(
    email: string,
    password: string,
    first_name: string,
    second_name: string,
  ): Promise<void>;
  loginUser(email: string, password: string): Promise<void>;
  signOutUser(): Promise<void>;
  authenticateWithGoogle(): Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stayConnected, setStayConnected] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);

          //  Getting all data from user authenticated
          const userDocResponse = await getDoc(docRef);

          const user_data: User = {
            id: user.uid,
            created_at: userDocResponse.data()?.created_at,
            email: user.email!,
            name: userDocResponse.data()?.name,
            photo: userDocResponse.data()?.photo,
          };
          setUserInfo(user_data);
          localStorage.setItem("@user_details", JSON.stringify(user_data));
          setLoading(false);
        } catch (error) {
          toast.error("Erro ao buscar dados do usuário");
          console.log(error);
          throw error;
        }
      } else {
        setUserInfo(null);
        setLoading(false);
      }
    });

    //  cleanup function - increase performance
    return () => {
      unsub();
    };
  }, []);

  async function registerNewUser(
    email: string,
    password: string,
    first_name: string,
    second_name: string,
  ) {
    try {
      //  Calling function of Firebase Authentication for create new "user"
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (values) => {
          try {
            //  Creating temporary data of new user
            const user_data: User = {
              id: values.user.uid,
              name: `${first_name} ${second_name}`,
              email: values.user.email!,
              photo: `${first_name[0].toUpperCase()}${second_name[0].toUpperCase()}`,
              created_at: new Date().toLocaleString("pt-BR", {
                month: "2-digit",
                year: "numeric",
                day: "2-digit",
              }),
            };

            //  Creating path for the new document to new user
            const userRef = doc(db, "users", values.user.uid);

            //  Calling function of Firebase Firestore for create the new document
            await setDoc(userRef, user_data).then(() => {
              toast.success("Usuário registrado com sucesso.");
              localStorage.setItem("@user_details", JSON.stringify(user_data));
              setUserInfo(user_data);
            });
          } catch (error) {
            await deleteUser(values.user);
            throw error;
          }
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
      console.log(error);
    }
  }

  async function loginUser(email: string, password: string) {
    try {
      const typePersistence = stayConnected
        ? browserLocalPersistence
        : browserSessionPersistence;

      setPersistence(auth, typePersistence).then(async () => {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const docRef = doc(db, "users", user.uid);

        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          toast.error("Dados do usuário não encontrados.");
          return;
        }

        const snapshot_data: User = {
          id: user.uid,
          created_at: snapshot.data().created_at,
          email: user.email!,
          name: snapshot.data().name,
          photo: snapshot.data().photo,
        };

        setUserInfo(snapshot_data);
        localStorage.setItem("@user_details", JSON.stringify(snapshot_data));
      });
    } catch (error) {
      toast.error("Erro ao fazer login.");
      console.log(error);
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth).then(() => {
        toast.success("Usuário desconectado.");
        setUserInfo(null);
        localStorage.removeItem("@user_details");
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const GoogleProvider = new GoogleAuthProvider();

  async function authenticateWithGoogle() {
    try {
      const response = await signInWithPopup(auth, GoogleProvider);

      if (response) {
        const user_data: User = {
          id: response.user.uid,
          name: response.user.displayName!,
          email: response.user.email!,
          photo: response.user.photoURL!,
          created_at: new Date().toLocaleString("pt-BR", {
            month: "2-digit",
            year: "numeric",
            day: "2-digit",
          }),
        };

        //  Creating path for the new document to new user
        const userRef = doc(db, "users", response.user.uid);

        //  Calling function of Firebase Firestore for create the new document
        await setDoc(userRef, user_data).then(() => {
          toast.success("Usuário registrado com sucesso.");
          localStorage.setItem("@user_details", JSON.stringify(user_data));
          setUserInfo(user_data);
        });
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!userInfo,
        loading,
        userInfo,
        stayConnected,
        setStayConnected,
        registerNewUser,
        loginUser,
        signOutUser,
        authenticateWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
