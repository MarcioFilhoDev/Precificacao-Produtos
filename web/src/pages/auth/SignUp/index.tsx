import {
  ArrowRightIcon,
  ChartLineUpIcon,
  CheckIcon,
  GoogleLogoIcon,
  PackageIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

import { Link, Navigate } from "react-router-dom";

import Input from "../../../components/Input";

import { useSignUp } from "../../../hooks/useSignUp";
import { Controller } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function SignUp() {
  const { control, errors, handleSubmit, isSubmitting, handleRegisterNewUser } =
    useSignUp();

  const { signed, authenticateWithGoogle } = useContext(AuthContext);

  if (signed) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen bg-canvas p-4 font-sans text-content sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-360 overflow-hidden rounded-[28px] bg-surface shadow-2xl shadow-content/10 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-brand-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -left-32 -top-40 h-110 w-110 rounded-full border border-white/10" />
          <div className="absolute -left-12 -top-16 h-70 w-70 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -right-28 h-107.5 w-107.5 rounded-full bg-brand-400/10 blur-3xl" />

          <a
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-200 text-brand-950">
              <ChartLineUpIcon size={23} weight="bold" />
            </span>
            <span className="text-sm font-bold tracking-[0.16em]">
              PRECIFICA
            </span>
          </a>

          <div className="relative z-10 max-w-xl py-12">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-brand-200">
              <SparkleIcon size={14} weight="fill" />
              UM NOVO JEITO DE PRECIFICAR
            </span>
            <h1 className="max-w-lg text-4xl font-semibold leading-[1.12] tracking-[-0.04em] xl:text-[54px]">
              Seu negócio merece crescer com segurança.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">
              Organize seus produtos, entenda seus custos e encontre o preço
              ideal para cada venda.
            </p>

            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-200/10 text-brand-300">
                  <PackageIcon size={21} weight="duotone" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Produtos organizados</p>
                  <p className="mt-1 text-xs text-white/50">
                    Custos e preços em um só lugar
                  </p>
                </div>
                <CheckIcon size={18} className="text-brand-300" weight="bold" />
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-200/10 text-brand-300">
                  <ChartLineUpIcon size={21} weight="duotone" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    Decisões mais confiantes
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Veja o impacto de cada escolha
                  </p>
                </div>
                <CheckIcon size={18} className="text-brand-300" weight="bold" />
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/40">
            Precifique com confiança. Cresça com propósito.
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <div className="w-full max-w-105">
            <a
              href="/"
              className="mb-9 inline-flex items-center gap-2.5 lg:hidden"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-800">
                <ChartLineUpIcon size={21} weight="bold" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em]">
                PRECIFICA
              </span>
            </a>

            <div>
              <p className="text-sm font-medium text-content-secondary">
                Comece por aqui
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-[34px]">
                Crie sua conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-content-muted">
                Leva só um instante para dar o próximo passo no seu negócio.
              </p>
            </div>

            <button
              onClick={async () => await authenticateWithGoogle()}
              type="button"
              className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-line bg-surface text-sm font-medium text-content-strong transition-colors hover:bg-surface-muted"
            >
              <GoogleLogoIcon size={18} weight="bold" />
              Cadastrar com Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-line-muted" />
              <span className="text-xs text-content-subtle">
                ou preencha seus dados
              </span>
              <span className="h-px flex-1 bg-line-muted" />
            </div>

            <form
              onSubmit={handleSubmit(
                async (data) =>
                  await handleRegisterNewUser(
                    data.email,
                    data.password,
                    data.first_name,
                    data.second_name,
                  ),
              )}
              className="space-y-4"
            >
              {/* Fisrt name */}
              <Controller
                control={control}
                name="first_name"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      value={value}
                      onChange={onChange}
                      label="Nome"
                      type="text"
                      placeholder="Primeiro nome"
                      autoComplete="username"
                    />

                    {errors.first_name && (
                      <span className="ml-1 block text-xs text-red-600">
                        {errors.first_name.message}
                      </span>
                    )}
                  </div>
                )}
              />

              {/* Second name */}
              <Controller
                control={control}
                name="second_name"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      value={value}
                      onChange={onChange}
                      label="Sobrenome"
                      type="text"
                      placeholder="Segundo ou último nome"
                    />

                    {errors.second_name && (
                      <span className="ml-1 block text-xs text-red-600">
                        {errors.second_name.message}
                      </span>
                    )}
                  </div>
                )}
              />

              {/* E-mail */}
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      value={value}
                      onChange={onChange}
                      label="E-mail"
                      type="email"
                      placeholder="sua@empresa.com"
                      autoComplete="email"
                    />

                    {errors.email && (
                      <span className="ml-1 block text-xs text-red-600">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                )}
              />

              {/* Password */}
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Input
                      value={value}
                      onChange={onChange}
                      label="Senha"
                      type="password"
                      placeholder="Crie uma senha segura"
                      autoComplete="current-password"
                    />

                    {errors.password && (
                      <span className="ml-1 block text-xs text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-800 text-sm font-semibold text-white shadow-lg shadow-brand-800/30 transition hover:bg-brand-900"
              >
                {isSubmitting ? (
                  <span>carregando...</span>
                ) : (
                  <>
                    Criar minha conta
                    <ArrowRightIcon size={17} weight="bold" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-content-muted">
              Já tem uma conta?
              <Link
                to={"/"}
                className="font-semibold text-brand-700 hover:text-brand-950"
              >
                Entrar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
