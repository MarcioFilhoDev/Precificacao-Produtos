import {
  ArrowRightIcon,
  ChartLineUpIcon,
  CheckSquareIcon,
  GoogleLogoIcon,
  LockKeyIcon,
  SquareIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import Input from "../../../components/Input";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useSignIn";
import { Controller } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function SignIn() {
  const { control, errors, handleLoginUser, handleSubmit, isSubmitting } =
    useLogin();

  const { signed, setStayConnected, authenticateWithGoogle, stayConnected } =
    useContext(AuthContext);

  if (signed) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen bg-canvas p-4 font-sans text-content sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-360 overflow-hidden rounded-[28px] bg-surface shadow-2xl shadow-content/10 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-brand-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 -top-36 h-110 w-110 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-16 h-70 w-70 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -left-28 h-107.5 w-107.5 rounded-full bg-brand-400/10 blur-3xl" />

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
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              MAIS CLAREZA PARA CRESCER
            </span>
            <h1 className="max-w-lg text-4xl font-semibold leading-[1.12] tracking-[-0.04em] xl:text-[54px]">
              O preço certo muda tudo.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">
              Tenha seus números na mão e tome decisões com a confiança de quem
              conhece o próprio negócio.
            </p>

            <div className="mt-12 max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/60">Margem média</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    32,8%
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-200/10 text-brand-300">
                  <TrendUpIcon size={20} weight="bold" />
                </span>
              </div>
              <div
                className="mt-6 flex h-16 items-end gap-2"
                aria-hidden="true"
              >
                {[34, 52, 43, 67, 57, 78, 64, 94, 73, 100, 84, 100].map(
                  (height, index) => (
                    <span
                      key={index}
                      className={`flex-1 rounded-t-md ${index === 11 ? "bg-brand-300" : "bg-white/20"}`}
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-white/45">
                <span>ÚLTIMOS 12 MESES</span>
                <span className="text-brand-300">+12,4%</span>
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
              className="mb-12 inline-flex items-center gap-2.5 lg:hidden"
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
                Bem-vindo de volta
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-[34px]">
                Entre na sua conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-content-muted">
                Acesse seu painel e continue cuidando do seu negócio.
              </p>
            </div>

            <button
              onClick={async () => await authenticateWithGoogle()}
              type="button"
              className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-line bg-surface text-sm font-medium text-content-strong transition-colors hover:bg-surface-muted"
            >
              <GoogleLogoIcon size={18} weight="bold" />
              Continuar com Google
            </button>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-line-muted" />
              <span className="text-xs text-content-subtle">
                ou entre com seu e-mail
              </span>
              <span className="h-px flex-1 bg-line-muted" />
            </div>

            <form
              onSubmit={handleSubmit(
                async (data) =>
                  await handleLoginUser(data.email, data.password),
              )}
              className="space-y-5"
            >
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
                      placeholder="Digite seu e-mail"
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
                      placeholder="Digite sua senha"
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

              <div className="-mt-1 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStayConnected(!stayConnected)}
                  className="flex flex-row items-center gap-2"
                >
                  {stayConnected ? (
                    <CheckSquareIcon size={20} />
                  ) : (
                    <SquareIcon size={20} />
                  )}

                  <span className="text-xs text-content-secondary">
                    Manter conectado
                  </span>
                </button>

                <a
                  href="#"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-950"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-800 text-sm font-semibold text-white shadow-lg shadow-brand-800/30 transition hover:bg-brand-900"
              >
                {isSubmitting ? (
                  <span>carregando...</span>
                ) : (
                  <>
                    Entrar
                    <ArrowRightIcon size={17} weight="bold" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-1.5 text-sm text-content-muted">
              Ainda não tem uma conta?
              <Link
                to={"/signup"}
                className="font-semibold text-brand-700 hover:text-brand-950"
              >
                Criar conta
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-xs text-content-subtle">
              <LockKeyIcon size={14} />
              Seus dados estão protegidos
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
