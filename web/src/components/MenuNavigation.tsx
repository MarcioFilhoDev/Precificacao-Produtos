import { NavLink } from "react-router-dom";

import { type Icon } from "@phosphor-icons/react";

interface MenuNavigationProps {
  to: string;
  icon: Icon;
  label: string;
}

export default function MenuNavigation({
  label,
  to,
  icon: IconComponent,
}: MenuNavigationProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center gap-3 rounded-xl p-3 text-sm font-medium transition-colors md:justify-start ${
          isActive
            ? "bg-[#d6f2ca] text-[#183b2b] shadow-[0_8px_18px_-10px_rgba(0,0,0,0.35)]"
            : "text-white/65 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <IconComponent size={20} weight="duotone" />
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  );
}
