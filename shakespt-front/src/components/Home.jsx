import React from "react";
import Header from "./Header";
import Search_Bar from "./SeatchBar";
import { Inner } from "./InnerContainer"; // 올바른 방법
import Scroll from "./InfinityScroll";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Search_Bar />
      <Inner />
      <Scroll />
    </div>
  );
};

export default Home;
