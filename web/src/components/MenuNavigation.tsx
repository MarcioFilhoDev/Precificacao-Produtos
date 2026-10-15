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
            ? "bg-brand-200 text-brand-950 shadow-md shadow-black/15"
            : "text-white/65 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <IconComponent size={20} weight="duotone" />
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  );
}
