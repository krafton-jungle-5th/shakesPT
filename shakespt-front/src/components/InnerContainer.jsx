import React, { useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import "../css/InnerContainer.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FaFilter } from "react-icons/fa";
import VerticallyCenteredModal from "./Modal";

export const Inner = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartStoryClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="Inner">
      <StartStory onClick={handleStartStoryClick} />
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} />
    </div>
  );
};

export const StartStory = ({ onClick }) => {
  return (
    <button className="append-card-container" onClick={onClick}>
      <h3 className="content-text">
        당신의 이야기를 시작해주세요
        <FaCameraRetro className="FaCameraRetro" />
      </h3>
    </button>
  );
};

export const Modal = ({ show, onHide }) => {
  return <VerticallyCenteredModal show={show} onHide={onHide} />;
};

export const DropFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("latest");

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
