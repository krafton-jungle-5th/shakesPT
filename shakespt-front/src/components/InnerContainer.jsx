import React from "react";
import { FaCameraRetro } from "react-icons/fa";

export const Inner = () => {
  return (
    <div className="Inner">
      <StartStory />
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
