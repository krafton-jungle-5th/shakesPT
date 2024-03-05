import './App.css';
import {Button, Form, InputGroup} from 'react-bootstrap'
import React from "react";
import WrapVertical from "./components/WrapVertical";

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
                        <h3 className="content-text">이야기를 시작해주세요</h3>
                    </button>
                    <div>
                        필터
                    </div>

                    {/*이곳에 무한 스크롤 관련 옵션을 넣어야함*/}
                    {/*서버에서 요청한 값을 map으로 돌리며 해당 component를 생성*/}
                    <WrapVertical/>
                    <WrapVertical/>
                </div>
            </div>
        </div>
  );

}

export default App;
