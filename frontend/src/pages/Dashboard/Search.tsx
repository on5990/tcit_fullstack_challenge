import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPost } from "../../store/features/postSlice";

function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }
  function handleClick() {
    if (input.trim() === "") dispatch(searchPost(""));
    dispatch(searchPost(input));
  }
  return (
    <div className="search dashboard-section">
      <input
        type="text"
        className="input-search"
        placeholder="Filtrar por nombre"
        value={input}
        onChange={handleChange}
      />
      <button className="btn search-btn" onClick={handleClick}>
        Buscar
      </button>
    </div>
  );
}

export default Search;
