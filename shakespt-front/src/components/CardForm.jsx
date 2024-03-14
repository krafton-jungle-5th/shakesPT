import React from 'react';
import {Card} from "react-bootstrap";

function CardForm({imageData, story}) {
    return (
        <div className="card-container">
            <div className="card-style">
                <Card>
                    <Card.Img className="card-image" variant="top" src={`data:image/jpeg;base64,${imageData}`}/>
                    <Card.Body>
                        <Card.Text style={{wordWrap: "normal"}}>
                            {story}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CardForm;