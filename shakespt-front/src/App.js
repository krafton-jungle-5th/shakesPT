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
            {"image" : "/cursor.png", "story" : "사진이 깨집니다"},
            {"image" : "/img/img_test.png", "story" : "다시봐도 귀엽습니다."},
            {"image" : "/img/img_test.png", "story" : "대머리 소신발언"},
            {"image" : "/img/img_test.png", "story" : "나도 마감이 싫다."},
            {"image" : "/img/img_test.png", "story" : "여러분들 보시기엔 셰익스 피어가"},
            {"image" : "/img/img_test.png", "story" : "M자 탈모인가요?"},
            {"image" : "/img/img_test.png", "story" : "아니면 o자 탈모?"},
            {"image" : "/img/img_test.png", "story" : "제가 보기엔 마감형 탈모입니다"},
        ]
    },
    {
        "topicId" : 2,
        "story" : [
            {"image" : "https://i.namu.wiki/i/jXUNS_sunHz8ee6njqQ8jvHVTR4SRjiI15NOReVMD3UFxnkymodV5BP7lsP06zEotMbVQypMuATockCAFSAcrw.svg", "story" : "오 URL도 익혀지네요?"},
            {"image" : "https://i.namu.wiki/i/jXUNS_sunHz8ee6njqQ8jvHVTR4SRjiI15NOReVMD3UFxnkymodV5BP7lsP06zEotMbVQypMuATockCAFSAcrw.svg", "story" : "저와 유주님만 모르는 연무대의 향내음이"},
            {"image" : "https://i.namu.wiki/i/jXUNS_sunHz8ee6njqQ8jvHVTR4SRjiI15NOReVMD3UFxnkymodV5BP7lsP06zEotMbVQypMuATockCAFSAcrw.svg", "story" : "4D로 전송이 잘 되는지요?"},
            {"image" : "https://i.namu.wiki/i/7p68RGELzsfzNrY6kGCisWic0K9EY-jgup4BPHQQZrPIfVzKqwVvvufNKfLNtJQCPhhye63ELXz1IIIpIRZHGA.svg", "story" : "오류를 이기자."},
            {"image" : "https://i.namu.wiki/i/GJC9WXiJQ6AoroqxXmKP93yvuE672PZxsJf-g2FHQYM-25FbJRlE66sbmqh_SrsBIxiT3GxPYzFF8yWFoWFDFw.svg", "story" : "귀여운 말 한마리가 앉아있습니다?."},
            {"image" : "https://i.namu.wiki/i/5nLaWPvp2A_-dOjH2aJYB4Oags8KDUTutoXI1aUkcGHiTI1Pv6Kl0uzcbRIWwtgA-BOK-CyFky8VfB3Iam6k2A.webp", "story" : "개 꿀보직이니 남들에게 꼭 소개시켜주세요💖"},
            {"image" : "https://i.namu.wiki/i/CoJ5tfeyNLBtDOccjRYUKvWoBc2lPMUFPrpSilcz8OY-is4pMQkrrtFc27QzGDsLb9pbIaDD3Pp035seJLZRIQ.webp", "story" : "전투기도 저를 비웃네요"},
            {"image" : "https://i.namu.wiki/i/fFL0H9s_G3ppS7vJdAlA-GFHUF0XfvvOzXa4P0-jz6FKyhVBz13-sg2xWMTJpj1K5zQhETy3o4MrwCswRJeulg.svg", "story" : "오류를 해결해주는 마법의 열쇠"},
            {"image" : "https://i.namu.wiki/i/fFL0H9s_G3ppS7vJdAlA-GFHUF0XfvvOzXa4P0-jz6FKyhVBz13-sg2xWMTJpj1K5zQhETy3o4MrwCswRJeulg.svg", "story" : "또 나만 없지? 마법의 열쇠?"},
            {"image" : "https://i.namu.wiki/i/eXy7b4LxYM6JzoSBWMp0RX4_CjRWucqibHQFy6bt1kdPaPeqWaVi9GJ3jFMl1GyxAhKQcwoKUtd-AQ2Dq58Vvw.svg", "story" : "뚜기 뚜바밥밥 오뚜기밥바바바바밥디라라 밥보다 맛있는 밥"},
        ]
    },
    {
        "topicId" : 3,
        "story" : [
            {"image" : "https://i.namu.wiki/i/rR0NhAzGPtOt1io3B19YJ-hcfUpj1h8PJR11ukPkNnbkWOTYKV1ozSAAsnvQCTE0xREdXrJshTw3J3zauiJ0Ig.svg", "story" : "북두칠성보다 유명한건 칠성부대 아닙니까?"},
            {"image" : "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3899849549/B.jpg?39000000", "story" : "개굴?개굴?"},
            {"image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKExXSVR2YBUxSvt6Q-19rBOG_5tzo0poR2pUN8_I82sfiBpzazosd0Opk2R14hkLRt0&usqp=CAU", "story" : "김연근 보고가세요"},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" :"/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
    },
    {
        "topicId" : 4,
        "story" : [
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
    },
    {
        "topicId" : 5,
        "story" : [
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
        ]
        
    },
    {"topicId" : 6,
        "story" : [
            {"image" : "/favi.png", "story" : "사진이 깨집니다"},
            {"image" : "/img/img_test.png", "story" : "다시봐도 귀엽습니다."},
            {"image" : "/img/img_test.png", "story" : "."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
            {"image" : "/img/img_test.png", "story" : "귀여운 강아지 한마리가 앉아있습니다."},
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
  