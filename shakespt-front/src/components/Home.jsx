import React from "react";
import Header from "./Header";
import Search_Bar from "./SeatchBar";
// SomeOtherFile.js
import { Inner, StartStory } from "./InnerContainer"; // 올바른 방법

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Search_Bar />
      <Inner />
    </div>
  );
};

export default Home;
