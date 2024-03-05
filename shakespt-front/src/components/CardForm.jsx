import React from 'react';
import {Card} from "react-bootstrap";

function CardForm(props) {
    return (
        <div className="card-container">
            <div className="card-style">
                <Card>
                    <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                    <Card.Body>
                        <Card.Text style={{wordWrap: "normal"}}>
                            귀여운 강아지 한마리가 앉아있습니다
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CardForm;