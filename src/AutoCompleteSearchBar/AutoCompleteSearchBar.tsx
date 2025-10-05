import { useEffect, useState } from "react";
import "./AutoCompleteSearchBar.css";

const apiUrl = "https://dummyjson.com/recipes/search?q=";

export function AutoCompleteSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[searchTerm]) {
      setSearchResults(cache[searchTerm]);
      return;
    }
    const data = await fetch(`${apiUrl}${searchTerm}`);
    const json = await data.json();
    const response = json?.recipes || [];
    setSearchResults(response);
    setCache((prev) => ({ ...prev, [searchTerm]: response }));
  };

  const onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleOnFocus = () => {
    setIsResultVisible(true);
  };

  const handleOnBlur = () => {
    setIsResultVisible(false);
  };

  return (
    <div className="App">
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={onChangeSearchTerm}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      {isResultVisible && searchResults.length > 0 && (
        <div className="results-container">
          {searchResults.map((item) => (
            <span className="result">{item.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}
