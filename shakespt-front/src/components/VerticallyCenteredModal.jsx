import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { FaCameraRetro } from 'react-icons/fa';
import { CiSquarePlus } from 'react-icons/ci';

function VerticallyCenteredModal(props) {
    const [prompt, setPrompt] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgSrc, setImgSrc] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 통신 중임을 나타내는 상태 추가

    const fileChange = (fileBlob) => {
        setImgFile(fileBlob);
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onload = () => {
            setImgSrc(reader.result);
        };
    };

    const handleChange = (event) => {
        setPrompt(event.target.value); // 입력된 값으로 상태를 업데이트
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true); // 통신 시작 시 isLoading 상태를 true로 설정
            const formData = new FormData();
            formData.append('image', imgFile);
            formData.append('prompt', prompt);
            console.log(imgFile, prompt)
            const response = await axios.post('YOUR_SERVER_ENDPOINT_URL', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('서버 응답:', response.data);
            props.onHide(); // 통신이 성공적으로 완료되면 모달을 닫음
        } catch (error) {
            console.error('서버 전송 중 오류 발생:', error);
            props.onHide(); // 통신이 성공적으로 완료되면 모달을 닫음
        } finally {
            setIsLoading(false); // 통신 종료 후 isLoading 상태를 false로 설정
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className={'modal-container'}>
                <input
                    id="inputFile"
                    type="file"
                    name="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        fileChange(e.target.files[0]);
                    }}
                />
                {imgSrc ? (
                    <img src={imgSrc} alt="preview" />
                ) : (
                    <div className={'default-image'}>
                        <CiSquarePlus className={'plus'} />
                    </div>
                )}
                <div
                    className={'modal-photo'}
                    onClick={() => {
                        document.getElementById('inputFile').click();
                    }}
                >
                    사진 추가하기<FaCameraRetro />
                </div>
                <InputGroup className="search">
                    <Form.Control
                        className="search-box"
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder={'GPT한테 귀띔하기'}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? '전송 중...' : 'submit'}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VerticallyCenteredModal;
