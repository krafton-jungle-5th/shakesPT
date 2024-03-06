import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import "../css/InnerContainer.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
export const Inner = () => {
  return (
    <div className="Inner">
      <StartStory />
      <DropFilter />
    </div>
  );
};

export const StartStory = ({ setModalOpen }) => {
  return (
    <button
      className="append-card-container"
      onClick={() => setModalOpen(true)}
    >
      <h3 className="content-text">
        당신의 이야기를 시작해주세요
        <FaCameraRetro className="FaCameraRetro" />
      </h3>
    </button>
  );
};

export const DropFilter = () => {
  return (
    <DropdownButton id="dropdown-basic-button" title="최신순">
      
      <Dropdown.Item style={{ backgroundColor: "white" }} href="#/action-1">
        최신순
      </Dropdown.Item>
      <Dropdown.Item style={{ backgroundColor: "white" }} href="#/action-2">
        완료된 글
      </Dropdown.Item>
      <Dropdown.Item style={{ backgroundColor: "white" }} href="#/action-3">
        미완료된 글
      </Dropdown.Item>
    </DropdownButton>
  );
};
