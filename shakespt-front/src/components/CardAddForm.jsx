import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import VerticallyCenteredModal from "./VerticallyCenteredModal";

function CardAddForm({updateContentArray, topicId}) {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="card-container">
            <div className="card-style">
                <Card>
                    <Card.Img
                        onClick={() => setModalOpen(true)}
                        className="card-image"
                        variant="top"
                        src="https://media.istockphoto.com/id/688550958/vector/black-plus-sign-positive-symbol.jpg?s=612x612&w=0&k=20&c=0tymWBTSEqsnYYXWeWmJPxMotTGUwaGMGs6BMJvr7X4="/>
                    <VerticallyCenteredModal
                        show = {modalOpen}
                        onHide = {() => setModalOpen(false)}
                        topicId = {topicId}
                        updateContentArray={updateContentArray}
                    />
                    <Card.Body>
                        <Card.Text style={{wordWrap: "normal", textAlign: "center"}}>
                            스토리를 추가해주세요.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CardAddForm;