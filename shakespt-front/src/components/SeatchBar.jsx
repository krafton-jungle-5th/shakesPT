import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Search_Bar = () => {
  let [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <input
      className={`Search_Box ${isInputClicked ? "clicked" : ""}`}
      onFocus={() => {
        setIsInputClicked(true);
      }}
      onBlur={() => {
        setIsInputClicked(false);
      }}
      placeholder={isInputClicked ? "" : "검색🎬"}
    />
  );
};

export default Search_Bar;
