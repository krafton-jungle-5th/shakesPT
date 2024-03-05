import './App.css';
import {Button, Dropdown, DropdownButton, Form, InputGroup} from 'react-bootstrap'
import React from "react";
import WrapVertical from "./components/WrapVertical";
import { FaCameraRetro } from "react-icons/fa";

function App() {
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
                    <button className="append-card-container">
                        <h3 className="content-text">당신의 이야기를 시작해주세요<FaCameraRetro/></h3>
                    </button>
                    <DropdownButton className="dropdown-custom" id="dropdown-basic-button" title="최신순">
                        <Dropdown.Item href="#/action-1">최신순</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">완료된 글</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">미완료된 글</Dropdown.Item>
                    </DropdownButton>

                    {/*이곳에 무한 스크롤 관련 옵션을 넣어야함*/}
                    {/*서버에서 요청한 값을 map으로 돌리며 해당 component를 생성*/}
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                    <WrapVertical/>
                </div>
            </div>
        </div>
  );

}

export default App;
