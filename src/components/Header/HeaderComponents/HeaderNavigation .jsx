import { NavLink } from "react-router-dom";

export const HeaderNavigation = () => {
  const navigation = [
    { href: '/', label: "Головна" },
    { href: '/menu', label: "Меню" },
    { href: '/about-us', label: "Про нас" },
    { href: '/contact', label: "Контакти" },
  ]

  return (
    <nav className="header__navigation">
      {navigation.map(({ href, label }) => (
        <NavLink key={label} to={href} exact={label === "Головна"} className={({ isActive }) => isActive ? "navLink-active" : "navLink"}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}