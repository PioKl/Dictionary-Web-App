import React from "react";
import { useRef } from "react";
import "../style/MainContext.scss";
import { Word, NoWordFound } from "../types/types";

//Problem z importem mimo modyfikacji w config vite, dlatego taki sposób
const IconPlay = () => (
  <svg
    width="75"
    height="75"
    viewBox="0 0 75 75"
    className="word__buttonAudioIcon"
  >
    <circle cx="37.5" cy="37.5" r="37.5" />
    <path d="M29 27v21l21-10.5z" />
  </svg>
);

interface MainContentProps {
  data: Word | NoWordFound | null;
}

const MainContent: React.FC<MainContentProps> = ({ data }) => {
  //Odtwarzanie audio
  const audioPlayRef = useRef<HTMLAudioElement>(null);
  const handlePlay = () => {
    audioPlayRef.current && audioPlayRef.current.play();
  };

  if (!data) {
    return;
  }

  // Jeśli data jest typu Word
  if ("word" in data) {
    //W celu wyłączenie focusa przy kliknięciu na button z ikoną play, żeby nie trzeba było gdzieś klikać, żeby wyłączył się focus
    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    //Znalezienie czy istnieje jakiś plik audio, czasem może istnieć w tablicy data.phonetics[4].audio dlatego find
    const audioSrc =
      data.phonetics.find((phonetic) => phonetic.audio)?.audio || null;
    return (
      <>
        <div className="word">
          <div className="wordContainer">
            <h1 className="wordContainer__word">{data.word}</h1>
            {data.phonetic && (
              <span className="wordContainer__phonetic">{data.phonetic}</span>
            )}
          </div>
          {audioSrc && (
            <button
              className="word__buttonAudio"
              onClick={handlePlay}
              onMouseDown={handleMouseDown}
            >
              <IconPlay />
              <audio id="audio" ref={audioPlayRef}>
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </button>
          )}
        </div>

        {data.meanings.map((meaning, meaningIndex) => (
          <React.Fragment key={meaningIndex}>
            <div className="nounVerbContainer">
              <span className="nounVerbContainer__span">
                {meaning.partOfSpeech}
              </span>
              <span className="nounVerbContainer__line"></span>
            </div>
            <div className="meaningContainer">
              <h2 className="meaningContainer__heading">Meaning</h2>
              <ul className="meaningContainer__meaningsItemList">
                {meaning.definitions.map((definition, definitionIndex) => (
                  <li
                    className="meaningContainer__meaningItem"
                    key={definitionIndex}
                  >
                    <span className="meaningContainer__definition">
                      {definition.definition}
                    </span>
                    {definition.example && (
                      <span className="meaningContainer__example">
                        “{definition.example}”
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {meaning.synonyms.length > 0 && (
                <div className="synonymusContainer">
                  <h2 className="synonymusContainer__heading">Synonymus</h2>
                  <ul className="synonymusContainer__synonymusItemList">
                    {meaning.synonyms.map((synonym, synonymIndex) => (
                      <li
                        key={synonymIndex}
                        className="synonymusContainer__synonymusItem"
                      >
                        <a
                          className="synonymusContainer__synonymusItemLink"
                          href={`/Dictionary-Web-App/#/${synonym}`}
                        >
                          {synonym}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
        <div className="sourceContainer">
          <div className="sourceContainer__linkContainer">
            <h2 className="sourceContainer__heading">Source</h2>
            <a
              className="sourceContainer__link"
              href={data.sourceUrls}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.sourceUrls[0]}
            </a>
          </div>
        </div>
      </>
    );
  } else if ("title" in data) {
    // Jeśli data jest typu NoWordFound
    return (
      <div className="noDefinitionContainer">
        <span className="noDefinitionContainer__emoji">😕</span>
        <h2 className="noDefinitionContainer__heading">{data.title}</h2>
        <span className="noDefinitionContainer__message">{data.message} </span>
        <span className="noDefinitionContainer__resolution">
          {data.resolution}
        </span>
      </div>
    );
  }
};

export default MainContent;
