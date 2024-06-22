import { useState, useEffect } from "react";
import "./style/App.scss";
import { Word, NoWordFound } from "./types/types";
import Header from "./components/Header";
import Loader from "./components/Loader";
import MainContent from "./components/MainContent";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<Word | NoWordFound | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchWord) {
      return; // Nie wykonuj fetcha, jeśli searchWord jest pusty
    }

    setLoader(true);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setData(data[0] as Word);
        } else if (data.title) {
          setData(data as NoWordFound);
        } else {
          setData(null); // Wyczyść poprzednie dane
          setError("Unknown response from server");
        }
        setLoader(false);
      })
      .catch((error) => {
        setError(error);
        setData(null);
        setLoader(false);
      });
  }, [searchWord]);

  console.log(data);
  console.log(error);

  return (
    <>
      <Header searchWord={searchWord} setSearchWord={setSearchWord} />
      <main className="wrapper">
        {loader ? <Loader /> : <MainContent data={data} />}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
