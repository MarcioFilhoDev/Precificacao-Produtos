import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SignInSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Esse e-mail é inválido" })
      .nonempty("O e-mail deve ser preenchido"),

    password: z.string().min(6, "Essa senha é curta demais"),
  })
  .required();

const useLogin = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser } = useContext(AuthContext);

  async function handleLoginUser(email: string, password: string) {
    await loginUser(email, password);
  }

  return {
    control,
    errors,
    isSubmitting,
    handleLoginUser,
    handleSubmit,
    reset,
  };
};

export { useLogin };
