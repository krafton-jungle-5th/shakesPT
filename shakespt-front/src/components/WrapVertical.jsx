import React from 'react';
import CardForm from "./CardForm";
import CardAddForm from "./CardAddForm";

function WrapVertical({topicId, story, length}) {
    return (
        <>
            <div className="content-container">
                <div className="wrap-vertical">
                    {/*이곳에 props에서 받아온 image와 story map으로 돌리며 나타내야 함*/}
                    {story.map((props, index) => {
                        const {image, summary} = props
                        return (
                            <CardForm key={index} image={image} story={summary}/>
                        )
                    })}
                    {length < 10 &&
                        <CardAddForm/>
                    }
                </div>

                <div className="card-info">
                    <div className="border-tag">tag</div>
                    <div className="border-tag">{length}/10</div>
                </div>
            </div>
        </>
    );
}

export default WrapVertical;