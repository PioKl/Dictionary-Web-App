import { useState } from "react";
import "../style/Search.scss";
import IconSearch from "../assets/images/icon-search.svg";

interface SearchProps {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  fontDropDownMenuRef: React.RefObject<HTMLUListElement>;
}

const Search: React.FC<SearchProps> = ({
  setSearchWord,
  fontDropDownMenuRef,
}) => {
  const [errorEmptySearch, setErrorEmptySearch] = useState(false);

  const [inputText, setInputText] = useState("");

  const handleDropDownRemoveShow = () => {
    if (fontDropDownMenuRef.current) {
      fontDropDownMenuRef.current.classList.remove("--show");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSearch = () => {
    inputText === "" ? setErrorEmptySearch(true) : setErrorEmptySearch(false),
      setSearchWord(inputText);
  };

  return (
    <div className="search">
      <div className="searchInputContainer">
        <input
          className={`searchInputContainer__input ${
            errorEmptySearch ? "--empty" : ""
          }`}
          type="text"
          placeholder="Search for any word..."
          onFocus={handleDropDownRemoveShow}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="searchInputContainer__button"
          type="button"
          onClick={handleSearch}
        >
          <img src={IconSearch} width="15.55" height="15.55" alt="" />
        </button>
      </div>
      {errorEmptySearch && (
        <span className="search__errorSpan">Whoops, can’t be empty…</span>
      )}
    </div>
  );
};

export default Search;
