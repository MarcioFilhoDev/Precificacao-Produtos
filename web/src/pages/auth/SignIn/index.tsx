import {
  ArrowRightIcon,
  ChartLineUpIcon,
  GoogleLogoIcon,
  LockKeyIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <main className="min-h-screen bg-[#f6f7f4] p-4 font-sans text-[#17241d] sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-360 overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_-36px_rgba(23,36,29,0.24)] lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[#183b2b] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 -top-36 h-110 w-110 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-16 h-70 w-70 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -left-28 h-107.5 w-107.5 rounded-full bg-[#a8d5a2]/10 blur-3xl" />

          <a
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#d6f2ca] text-[#183b2b]">
              <ChartLineUpIcon size={23} weight="bold" />
            </span>
            <span className="text-sm font-bold tracking-[0.16em]">
              PRECIFICA
            </span>
          </a>

          <div className="relative z-10 max-w-xl py-12">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-[#d6f2ca]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a6df91]" />
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
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d6f2ca]/10 text-[#c6f0b4]">
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
                      className={`flex-1 rounded-t-md ${index === 11 ? "bg-[#c6f0b4]" : "bg-white/20"}`}
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-white/45">
                <span>ÚLTIMOS 12 MESES</span>
                <span className="text-[#c6f0b4]">+12,4%</span>
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
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f4e5] text-[#24583b]">
                <ChartLineUpIcon size={21} weight="bold" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em]">
                PRECIFICA
              </span>
            </a>

            <div>
              <p className="text-sm font-medium text-[#6b776f]">
                Bem-vindo de volta
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-[34px]">
                Entre na sua conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#78827b]">
                Acesse seu painel e continue cuidando do seu negócio.
              </p>
            </div>

            <button
              type="button"
              className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#e4e9e4] bg-white text-sm font-medium text-[#27352d] transition-colors hover:bg-[#f8faf7]"
            >
              <GoogleLogoIcon size={18} weight="bold" />
              Continuar com Google
            </button>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#e9ece8]" />
              <span className="text-xs text-[#99a19b]">
                ou entre com seu e-mail
              </span>
              <span className="h-px flex-1 bg-[#e9ece8]" />
            </div>

            <form className="space-y-5">
              <Input
                label="E-mail"
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="email"
              />

              <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />

              <div className="-mt-1 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs text-[#68746c]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#cdd6ce] accent-[#285a3c]"
                  />
                  Manter conectado
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-[#285a3c] hover:text-[#183b2b]"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#24583b] text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(36,88,59,0.8)] transition hover:bg-[#1b472f]"
              >
                Entrar
                <ArrowRightIcon size={17} weight="bold" />
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-1.5 text-sm text-[#78827b]">
              Ainda não tem uma conta?
              <Link
                to={"/signup"}
                className="font-semibold text-[#285a3c] hover:text-[#183b2b]"
              >
                Criar conta
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-xs text-[#a0a8a2]">
              <LockKeyIcon size={14} />
              Seus dados estão protegidos
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
