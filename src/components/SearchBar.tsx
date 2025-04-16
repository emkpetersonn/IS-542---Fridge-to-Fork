import { useState } from "react";

interface SearchBarProps {
  onSearch: (ingredients: string[]) => void;
}

// create react search bar
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  // search logic 
  const handleSearch = () => {
    // don't move on if its empty
    if (input.trim()) {
      // split by commas
      const ingredients = input.split(",").map((ing) => ing.trim()); 
      // use ingredients array 
      onSearch(ingredients);
      // clear after search
      setInput(""); 
    }
  };

  //Enter key (https://chatgpt.com/c/67ffddf3-cf78-8005-a335-60652013de64)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", width: "100%", marginBottom: "20px" }}>
      <label htmlFor="ingredient-input" style={{ fontSize: "18px", marginBottom: "8px" }}>
        Enter ingredients (comma separated):
      </label>
      <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "600px", position: "relative" }}>
        <input
          id="ingredient-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter ingredients..."
          style={{
            flexGrow: 1,
            minWidth: "300px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            background: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
