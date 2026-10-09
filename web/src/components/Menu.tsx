import {
  ChartLineUpIcon,
  CurrencyDollarIcon,
  SignOutIcon,
  SquaresFourIcon,
  TagIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import MenuNavigation from "./MenuNavigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Menu() {
  const { signOutUser } = useContext(AuthContext);

  return (
    <aside className="relative flex min-h-screen w-20 shrink-0 flex-col overflow-hidden bg-[#183b2b] px-3 py-6 text-white md:w-64 md:px-5 md:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-[#a8d5a2]/10 blur-3xl"
      />

      <Link
        to="/dashboard"
        aria-label="Precifica - Dashboard"
        className="relative z-10 flex items-center justify-center gap-3 md:justify-start"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#d6f2ca] text-[#183b2b]">
          <ChartLineUpIcon size={23} weight="bold" />
        </span>
        <span className="hidden text-sm font-bold tracking-[0.16em] md:inline">
          PRECIFICA
        </span>
      </Link>

      <div className="relative z-10 mt-12">
        <p className="mb-3 hidden px-3 text-[11px] font-semibold tracking-[0.16em] text-white/40 md:block">
          MENU PRINCIPAL
        </p>
        <nav aria-label="Menu principal" className="space-y-1.5">
          <MenuNavigation
            icon={SquaresFourIcon}
            label="Dashboard"
            to="/dashboard"
          />

          <MenuNavigation icon={TagIcon} label="Products" to="/products" />

          <MenuNavigation icon={CurrencyDollarIcon} label="Sales" to="/sales" />
        </nav>
      </div>

      <p className="relative z-10 mt-auto hidden px-2 pt-8 text-xs leading-5 text-white/40 md:block">
        Precifique com confiança
        <br />
        Cresça com propósito
      </p>

      <button
        onClick={() => signOutUser()}
        className="flex items-center mt-2 hover:bg-white/10 hover:text-white justify-center gap-3 rounded-xl p-3 text-sm font-medium transition-colors md:justify-start"
      >
        <SignOutIcon size={20} weight="duotone" />
        Sair da conta
      </button>
    </aside>
  );
}
