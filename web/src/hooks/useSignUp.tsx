import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

import { toast } from "react-toastify";

const SignUpSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "Primeiro nome deve ter 3 caracteres")
      .max(50, "Primeiro nome atingiu máximo de caracteres")
      .nonempty("Primeiro nome deve ser preenchido"),

    second_name: z
      .string()
      .min(3, "Sobrenome deve ter 3 caracteres")
      .max(50, "Sobrenome atingiu máximo de caracteres")
      .nonempty("Sobrenome deve ser preenchido"),

    email: z
      .string()
      .email({ message: "Esse e-mail é inválido" })
      .nonempty("O e-mail deve ser preenchido"),

    password: z.string().min(6, "Essa senha é curta demais"),
  })
  .required();

const useSignUp = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  //    Rules
  async function registerNewUser(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Usuário registrado com sucesso.");
        reset();
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar novo usuário!");
        console.log(error);
      });
  }

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit,
    registerNewUser,
  };
};

export { useSignUp };
