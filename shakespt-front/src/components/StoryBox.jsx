import React from "react";
import { Card } from "react-bootstrap";
import img_test from "../assets/img_test.png";

export function WrapVertical(props) {
  return (
    <div>
      <div className="content-container">
        <div className="wrap-vertical">
          {/*이곳에 props에서 받아온 image와 story map으로 돌리며 나타내야 함*/}
          <CardForm />
          <CardForm />
          <CardForm />
          <CardForm />
          <CardForm />
          <CardForm />
          <CardForm />
        </div>
        <div className="card-info">
          <div className="border-tag">tag</div>
          <div className="border-tag">5/10</div>
        </div>
      </div>
    </div>
  );
}
export function CardForm(props) {
  return (
    <div className="card-container">
      <div className="card-style">
        <Card>
          <Card.Img
            className="card-image"
            variant="top"
            src="https://cdn.pixabay.com/photo/2022/09/08/12/26/shakespeare-7440851_1280.png"
          />
          <Card.Body>
            <Card.Text style={{ wordWrap: "normal" }}>
              대머리 아저씨가 외칩니다.마감은 지옥이다.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CardForm;
