import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./style/App.scss";
import { Word, NoWordFound } from "./types/types";
import Header from "./components/Header";
import Loader from "./components/Loader";
import MainContent from "./components/MainContent";
import ErrorPage from "./components/ErrorPage";

function SearchResult() {
  const { wordFromUrl } = useParams<{ wordFromUrl: string }>(); // Pobierze parametr z URL, dzięki (navigate/wpisane słowo)
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<Word | NoWordFound | null>(null);

  useEffect(() => {
    if (!wordFromUrl) {
      return; // Nie wykonuj fetcha, jeśli searchWord jest pusty
    }

    setLoader(true);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordFromUrl}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setData(data[0] as Word);
        } else if (data.title) {
          setData(data as NoWordFound);
        } else {
          setData(null); // Wyczyść poprzednie dane
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setData(null);
        setLoader(false);
      });
  }, [wordFromUrl]);

  return (
    <main className="wrapper">
      {loader ? <Loader /> : <MainContent data={data} />}
    </main>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        {/* Obsługa dynamicznych ścieżek */}
        <Route path="/" element={<SearchResult />} />
        <Route path="/:wordFromUrl" element={<SearchResult />} />
      </Routes>
      <footer></footer>
    </Router>
  );
}

export default App;
