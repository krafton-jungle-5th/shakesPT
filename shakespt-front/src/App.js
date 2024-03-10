import './css/Main.css'
import './css/InnerContainer.css'
import React, {useEffect, useState} from "react";
import { WrapVertical } from './components/StoryBox';
import { Inner, Modal, StartStory,DropFilter } from './components/InnerContainer';
import { useInView } from 'react-intersection-observer';
import {useImmer} from "use-immer";
import Home from './components/Home';
const dummyData = [
    {
        "topicId" : 1,
        "story" : [
            {"image" : "/favi.png", "story" : "사진이 깨집니다"},
            {"image" : "/img/img_test.png", "story" : "다시봐도 귀엽습니다."},
            {"image" : "/assets/logo.png", "story" : "."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
    },
    {
        "topicId" : 2,
        "story" : [
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
    },
    {
        "topicId" : 3,
        "story" : [
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
    },
    {
        "topicId" : 4,
        "story" : [
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
    },
    {
        "topicId" : 5,
        "story" : [
            {"image" : "/assets/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/img.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
        
    },
    {"topicId" : 6,
        "story" : [
            {"image" : "/favi.png", "story" : "사진이 깨집니다"},
            {"image" : "/img/img_test.png", "story" : "다시봐도 귀엽습니다."},
            {"image" : "/assets/logo.png", "story" : "."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/assets/cola.jpg", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
      }
]


function App() {
    const [page, setPage] = useState(0);
    const [contentArray, updateContentArray] = useImmer(dummyData);
    const [ref, inView] = useInView();
  
    const productFetch = () => {
      updateContentArray([...contentArray, ...dummyData]);
    };
  
    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
      if (inView) {
        console.log(inView, "무한 스크롤 요청");
        productFetch();
      }
    }, [inView]);
  
    return (
      <>
        <Home />
        <Inner/>
        <Modal/>
        <DropFilter/>
        <div className='scroll'>
          {contentArray.map((props) => {
            const { topicId, story } = props;
            return <WrapVertical key={topicId} topicId={topicId} story={story} />;
          })}
        </div>
        <div ref={ref}></div>

      </>
    );
  }
  
  export default App;
  