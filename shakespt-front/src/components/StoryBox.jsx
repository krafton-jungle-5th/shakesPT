import React from "react";
import { Card } from "react-bootstrap";

export function WrapVertical({ topicId, story }) {
  return (
    <>
      <div className="content-container">
        <div className="wrap-vertical">
          {/* 이곳에 props에서 받아온 image와 story map으로 돌리며 나타내야 함 */}
          {story.map((props, index) => {
            const { image, story } = props;
            return <CardForm key={index} image={image} story={story} />;
          })}
        </div>
        <div className="card-info">
          <div className="story-tag">tag</div>

          {story.length === 10 ? (
            <div>
              <button className="share">
                <span className="text">공유하기</span>
                <span className="shimmer"></span>
              </button>{" "}
            </div>
          ) : (
            <div className="border-tag">{story.length}/10</div>
          )}
        </div>
      </div>
    </>
  );
}

export function CardForm({ image, story }) {
  return (
    <div className="card-container">
      <div className="card-style">
        <Card>
          <Card.Img className="card-image" variant="top" src={image} />
          <Card.Body>
            <Card.Text style={{ wordWrap: "normal" }}>{story}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
