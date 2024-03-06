import React, {useState} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {FaCameraRetro} from "react-icons/fa";
import {CiCirclePlus, CiSquarePlus} from "react-icons/ci";

function VerticallyCenteredModal(props) {
    const [imgSrc, setImgSrc] = useState('');
    const fileChange = (fileBlob) => {
        const reader = new FileReader(); // file, Blob 객체를 핸들링하는데 사용
        // File, Blob 객체를 사용해 특정 파일을 읽어들여
        // js에서 파일에 접근할 수 있게 도와줌
        reader.readAsDataURL(fileBlob); // File 혹은 Blob 을 읽은 뒤 base64로 인코딩한 문자열을
                                        //FileReader 인스턴스의 result라는 속성에 담아줌
        return new Promise((resolve) => {
            reader.onload = () => {       // FileReader가 성공적으로 파일을 읽어들였을 때 트리거 되는 이벤트 핸들러
                // 이 내부에 우리가 원하는 로직을 넣어주면 됨
                // 이번과 같은 경우는 setState로 img값 받기
                setImgSrc(reader.result);
                resolve();
            };
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={'modal-container'}>
                <input
                    id="inputFile"
                    type="file"
                    name="file"
                    accept='image/*'
                    style={{"display": "none"}}
                    onChange={(e) => {
                        fileChange(e.target.files[0])
                    }}/>
                {/* 조건부 렌더링을 통해 imgSrc가 비어있을 때 기본 이미지를 보여줍니다. */}
                {imgSrc ? (
                    <img src={imgSrc}/>
                ) : (
                    <div className={'default-image'}>
                        <CiSquarePlus className={'plus'}/>
                    </div>
                )}
                <div
                    className={'modal-photo'}
                    onClick={() => {
                        document.getElementById('inputFile').click()
                    }}>
                    사진 추가하기<FaCameraRetro/>
                </div>
                <InputGroup className="search">
                    <Form.Control
                        className="search-box"
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder={"GPT한테 귀띔하기"}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VerticallyCenteredModal;