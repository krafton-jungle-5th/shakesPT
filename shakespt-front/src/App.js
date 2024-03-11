import './App.css';
import axios from 'axios';
import {Button, Dropdown, DropdownButton, Form, InputGroup} from 'react-bootstrap'
import React, {useEffect, useState} from "react";
import WrapVertical from "./components/WrapVertical";
import {FaCameraRetro} from "react-icons/fa";
import VerticallyCenteredModal from "./components/VerticallyCenteredModal";
import { useInView } from 'react-intersection-observer';
import {useImmer} from "use-immer";

function App() {

    const [page, setPage] = useState(0);
    const [inProgress, setInProgress] = useState(true);
    const [contentArray, updateContentArray] = useImmer([]);
    const [ref, inView] = useInView();

    const productFetch = () => {
        axios.get(`http://localhost:8080/topic?page=${page}&status=&tag=`)
            .then((result)=>{
                updateContentArray(draft => [...draft, ...result.data.content]); // 이전 상태를 변경하는 방식으로 업데이트
                console.log(result.data.content)
                if(result.data.content.length === 0) {
                    setInProgress(false)
                }
            }) // 요청 성공시 실행코드
            .catch((error)=>{ console.log(error) }) // 요청 실패시 실행코드
        console.log(page)
        setPage(page + 1)
    }

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (inView && inProgress) {
            console.log(inView, "무한 스크롤 요청")
            productFetch()
        }
    }, [inView]);

    return (
        <div className="mainContainer">
            <div>
                <div className="header">
                    <img className="logo" src="/assets/img.png" alt="logo"/>
                    <InputGroup className="search">
                        <Form.Control
                            className="search-box"
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        />
                        <Button variant="outline-secondary" className="search-button" id="button-addon1">
                            search
                        </Button>
                    </InputGroup>
                </div>
                <div className="content">
                    <button className="append-card-container" onClick={() => setModalOpen(true)}>
                        <h3 className="content-text">당신의 이야기를 시작해주세요<FaCameraRetro/></h3>
                    </button>

                    <VerticallyCenteredModal
                        show = {modalOpen}
                        onHide = {() => setModalOpen(false)}
                    />
                    <DropdownButton className="dropdown-custom" id="dropdown-basic-button" title="최신순">
                        <Dropdown.Item href="#/action-1">최신순</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">완료된 글</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">미완료된 글</Dropdown.Item>
                    </DropdownButton>

                    {/*이곳에 무한 스크롤 관련 옵션을 넣어야함*/}
                    {/*서버에서 요청한 값을 map으로 돌리며 해당 component를 생성*/}
                        {contentArray.map((props) => {
                            const {topicId, length, story} = props
                            return (
                                <WrapVertical key={topicId} topicId={topicId} story={story} length={length}/>
                            )
                        })}
                    <div ref={ref}></div>
                </div>
            </div>
        </div>
  );

}

export default App;
