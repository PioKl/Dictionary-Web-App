import { useRef, useState, useEffect } from "react";
import "../style/Header.scss";
import Logo from "../assets/images/logo.svg";
import Search from "./Search";

interface FontInterface {
  name: string;
  family: string;
}

export default function Header() {
  const btnChangeMode = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    //Stworzenie localStorage przy pierwszym uruchomieniu, gdzie wczytywane są dane
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "false");
    } else {
      //Jeśli istnieje już localStorage niech kółeczko w mode będzie odpowiednio ustawione
      localStorage.getItem("darkMode") === "true"
        ? (document.body.setAttribute("data-mode", "dark"),
          btnChangeMode.current &&
            btnChangeMode.current.setAttribute("aria-expanded", "true"))
        : (document.body.setAttribute("data-mode", "light"),
          btnChangeMode.current &&
            btnChangeMode.current.setAttribute("aria-expanded", "false"));
    }
  }, []);

  const fontsToChoose: FontInterface[] = [
    { name: "Sans Serif", family: "Inter, sans-serif" },
    { name: "Serif", family: "Lora, serif" },
    { name: "Mono", family: "Inconsolata, monospace" },
  ];
  const [fontName, setFontName] = useState(fontsToChoose[0].name);

  const fontDropDownMenuRef = useRef<HTMLUListElement>(null);

  const handleDropDownButton = () => {
    //Dodanie klasy show do dropdown listy
    if (fontDropDownMenuRef.current) {
      fontDropDownMenuRef.current.classList.toggle("--show");
    }
  };

  //Zmiana zmiennej dla w celu wyświetlenie odpowiedniej czcionki
  const handleChangeFont = (font: FontInterface) => {
    document.documentElement.style.setProperty("--f-family", font.family);
  };

  const handleChangeMode = () => {
    btnChangeMode.current &&
      btnChangeMode.current.setAttribute(
        "aria-expanded",
        btnChangeMode.current.getAttribute("aria-expanded") !== "true"
          ? "true"
          : "false"
      );

    //Zmiana data-mode na light/dark
    if (
      btnChangeMode.current &&
      btnChangeMode.current.getAttribute("aria-expanded") === "true"
    ) {
      document.body.setAttribute("data-mode", "dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.setAttribute("data-mode", "light");
      localStorage.setItem("darkMode", "false");
    }
  };

  //W celu wyłączenie focusa przy kliknięciu na button ze zmianą trybu light/dark mode, żeby nie trzeba było gdzieś klikać, żeby wyłączył się focus
  const handleChangeModeMouseDown = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <header className="header wrapper">
      <nav className="nav">
        <img className="nav__logo" src={Logo} width="32" height="36.5" alt="" />
        <div className="nav__fontsDropdownContainer">
          <button
            onClick={handleDropDownButton}
            className="nav__fontsDropdownButton"
          >
            {fontName}
          </button>
          <ul ref={fontDropDownMenuRef} className="nav__fontsOptionsList">
            {fontsToChoose.map((font, index) => (
              <li
                key={index}
                className={`nav__fontsOption ${
                  fontName === font.name ? "--active" : ""
                }`}
              >
                <button
                  onClick={() => {
                    setFontName(fontsToChoose[index].name);
                    handleDropDownButton();
                    handleChangeFont(font);
                  }}
                  type="button"
                  data-font={font.name}
                >
                  {font.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav__line"></div>
        <div className="nav__modeContainer">
          <button
            className="nav__modeButton"
            aria-expanded="false"
            type="button"
            onClick={handleChangeMode}
            onMouseDown={handleChangeModeMouseDown}
            ref={btnChangeMode}
          ></button>
          <div className="nav__modeIcon"></div>
        </div>
      </nav>
      <Search fontDropDownMenuRef={fontDropDownMenuRef} />
    </header>
  );
}
