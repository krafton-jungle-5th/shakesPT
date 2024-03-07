import React, { useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import "../css/InnerContainer.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FaFilter } from "react-icons/fa";
import { WrapVertical } from "./StoryBox";

export const Inner = () => {
  return (
    <div className="Inner">
      <StartStory />
      <DropFilter />
      {/*이곳에 무한 스크롤 관련 옵션을 넣어야함*/}
      {/*서버에서 요청한 값을 map으로 돌리며 해당 component를 생성*/}
      <div>
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
        <WrapVertical />
      </div>
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

const DropFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("latest"); // 초기값은 "latest"로 설정

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="d-flex align-items-center">
      <DropdownButton
        id="dropdown-basic-button"
        title={
          selectedFilter === "latest"
            ? "최신순"
            : selectedFilter === "completed"
            ? "완료된 글"
            : "미완료된 글"
        }
      >
        <Dropdown.Item
          style={{
            backgroundColor: selectedFilter === "latest" ? "#cce5ff" : "white",
          }}
          onClick={() => handleFilterChange("latest")}
        >
          최신순
        </Dropdown.Item>
        <Dropdown.Item
          style={{
            backgroundColor:
              selectedFilter === "completed" ? "#cce5ff" : "white",
          }}
          onClick={() => handleFilterChange("completed")}
        >
          완료된 글
        </Dropdown.Item>
        <Dropdown.Item
          style={{
            backgroundColor:
              selectedFilter === "incomplete" ? "#cce5ff" : "white",
          }}
          onClick={() => handleFilterChange("incomplete")}
        >
          미완료된 글
        </Dropdown.Item>
      </DropdownButton>
      <FaFilter className="Filter" />
    </div>
  );
};

export default DropFilter;
