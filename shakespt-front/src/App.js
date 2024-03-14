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
    const [status, setStatus] = useState("최신순");
    const [searchValue, setSearchValue] = useState(""); // 입력한 값을 저장할 상태
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        console.log("Search value:", searchValue); // 입력한 값을 콘솔에 출력
        setInProgress(true);
        axiosRequest();
    };

    const handleSelect = (selectedStatus) => {
        setStatus(selectedStatus); // 선택된 항목의 값을 상태로 업데이트
        setInProgress(true);
        axiosRequest();
    };

    const axiosRequest = () => {
        axios.get(`http://localhost:8000/topic?page=0&status=&keyword=`)
            .then((result) => {
                updateContentArray(() => result.data.content); // 새로운 데이터로 업데이트
                console.log(result.data.content);
                if (result.data.content.length === 0) {
                    setInProgress(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPage(1); // 페이지를 업데이트하는 코드를 비동기 처리가 끝난 후에 실행
            });
    }

    const productFetch = () => {
        axios.get(`http://localhost:8000/topic?page=${page}&status=&keyword=`)
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
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            className="search-button"
                            id="button-addon1"
                            onClick={handleButtonClick} // 버튼 클릭시 handleButtonClick 함수 호출
                        >
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
                        topicId = {null}
                    />
                    <DropdownButton className="dropdown-custom" id="dropdown-basic-button" title={status} onSelect={handleSelect}>
                        <Dropdown.Item eventKey="최신순">최신순</Dropdown.Item>
                        <Dropdown.Item eventKey="완료된 글">완료된 글</Dropdown.Item>
                        <Dropdown.Item eventKey="미완료된 글">미완료된 글</Dropdown.Item>
                    </DropdownButton>

                    {/*이곳에 무한 스크롤 관련 옵션을 넣어야함*/}
                    {/*서버에서 요청한 값을 map으로 돌리며 해당 component를 생성*/}
                        {contentArray.map((props) => {
                            const {topicId, length, story} = props
                            return (
                                <WrapVertical updateContentArray={updateContentArray} key={topicId} topicId={topicId} story={story} length={length}/>
                            )
                        })}
                    <div ref={ref}></div>
                </div>
            </div>
        </div>
  );

}

export default App;
