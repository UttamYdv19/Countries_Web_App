import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import {useTheme} from "../hooks/useTheme";

export default function Heaader() {
  const [IsDark, setIsDark] = useTheme();

  return (
    <>
      <header className={`header-container ${IsDark ? "dark" : ""}`}>
        <div className="header-content">
          <h2 className="title">
            <a href="/REST_COUNTRIES_API/">Where in the World?</a>
          </h2>
          <p
            className="theme-changer"
            onClick={() => {
              setIsDark(!IsDark);
              localStorage.setItem("IsDarkMode", !IsDark);
            }}
          >
            <i className={`fa-solid fa-${IsDark ? "sun" : "moon"}`}></i>
            &nbsp;&nbsp; {IsDark ? "Light mode" : "Dark Mode"}
          </p>
        </div>
      </header>
    </>
  );
}
