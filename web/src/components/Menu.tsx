import {
  CameraIcon,
  CurrencyDollarIcon,
  SignOutIcon,
  SquaresFourIcon,
  TagIcon,
} from "@phosphor-icons/react";
import MenuNavigation from "./MenuNavigation";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Menu() {
  const { signOutUser, userInfo } = useContext(AuthContext);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  return (
    <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col overflow-hidden bg-[#183b2b] px-3 py-6 text-white md:w-64 md:px-5 md:py-8">
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

      <div className="flex flex-col items-center gap-2 justify-center">
        <label
          title="Alterar foto"
          onMouseEnter={() => setIsCameraVisible(true)}
          onMouseLeave={() => setIsCameraVisible(false)}
          className="group relative size-12 overflow-hidden rounded-full transition-transform duration-300 hover:scale-105 md:size-36"
        >
          <input
            type="file"
            accept="image/*"
            aria-label="Atualizar foto do perfil"
            className="sr-only"
            onFocus={() => setIsCameraVisible(true)}
            onBlur={() => setIsCameraVisible(false)}
            onClick={() => {
              window.addEventListener(
                "focus",
                () => setIsCameraVisible(false),
                { once: true },
              );
            }}
          />

          {userInfo?.photo?.length === 2 ? (
            <div className="bg-[#d6f2ca] w-full h-full flex justify-center items-center">
              <h1 className="text-[#183b2b] text-5xl font-bold tracking-[2px]">
                {userInfo?.photo}
              </h1>
            </div>
          ) : (
            <img
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
              src={userInfo?.photo}
              alt="Foto do perfil"
            />
          )}

          <span
            className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
              isCameraVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <CameraIcon size={24} weight="duotone" aria-hidden="true" />
          </span>
        </label>

        <h1 className="text-[#d6f2ca] selection:text-[#183b2b]">
          {userInfo?.name}
        </h1>
      </div>

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
