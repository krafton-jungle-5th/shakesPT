import React from 'react';
import CardForm from "./CardForm";
import CardAddForm from "./CardAddForm";

function WrapVertical({updateContentArray, topicId, story, length}) {
    return (
        <>
            <div className="content-container">
                <div className="wrap-vertical">
                    {/*이곳에 props에서 받아온 image와 story map으로 돌리며 나타내야 함*/}
                    {story.map((props, index) => {
                        const {imageData, summary} = props
                        return (
                            <CardForm key={index} imageData={imageData} story={summary}/>
                        )
                    })}
                    {length < 10 &&
                        <CardAddForm updateContentArray={updateContentArray} topicId={topicId}/>
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