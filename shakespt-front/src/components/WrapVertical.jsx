import React from 'react';
import CardForm from "./CardForm";

function WrapVertical({topicId, story}) {
    return (
        <>
            <div className="content-container">
                <div className="wrap-vertical">

                    {/*이곳에 props에서 받아온 image와 story map으로 돌리며 나타내야 함*/}
                    {story.map((props, index) => {
                        const { image, story } = props
                        return (
                            <CardForm key={index} image={image} story={story}/>
                        )
                    })}
                </div>
                <div className="card-info">
                    <div className="border-tag">tag</div>
                    <div className="border-tag">5/10</div>
                </div>
            </div>
        </>
    );
}

export default WrapVertical;