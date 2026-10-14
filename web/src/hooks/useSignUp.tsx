import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    defaultValues: {
      first_name: "",
      second_name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { registerNewUser } = useContext(AuthContext);

  //    Rules
  async function handleRegisterNewUser(
    email: string,
    password: string,
    first_name: string,
    second_name: string,
  ) {
    await registerNewUser(email, password, first_name, second_name).then(() => {
      navigate("/dashboard");
      reset();
    });
  }

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit,
    handleRegisterNewUser,
  };
};

export { useSignUp };
