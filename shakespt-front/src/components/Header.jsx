import React from "react";
import shakesIcon from "../assets/shakes_pt.png"; // 이미지 파일 경로 수정
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Shakes 로고" />
    </header>
  );
};
export default Header;
