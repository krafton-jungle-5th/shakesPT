import React from 'react';
import CardForm from "./CardForm";

function WrapVertical(props) {
    return (
        <div>
            <div className="content-container">
                <div className="wrap-vertical">

                    {/*이곳에 props에서 받아온 image와 story map으로 돌리며 나타내야 함*/}
                    <CardForm/>
                    <CardForm/>
                    <CardForm/>
                    <CardForm/>
                    <CardForm/>
                    <CardForm/>
                    <CardForm/>
                </div>
                <div className="card-info">
                    <div className="border-tag">tag</div>
                    <div className="border-tag">5/10</div>
                </div>
            </div>
        </div>
    );
}

export default WrapVertical;