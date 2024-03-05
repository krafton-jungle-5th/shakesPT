import './App.css';
import {Button, InputGroup, Form, Card} from 'react-bootstrap'
import React from "react";

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
                  <button className="content-container">
                      <h3 className="content-text">이야기를 시작해주세요</h3>
                  </button>
                  <div>
                  필터
                  </div>

                  <div className="content-container">
                      <div className="wrap-vertical">

                          <div className="card-container">
                              <Card>
                                  <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                                  <Card.Body>
                                      <Card.Text style={{wordWrap: "normal"}}>
                                          귀여운 강아지 한마리가 앉아있습니다
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          </div>
                          <div className="card-container">
                              <Card>
                                  <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                                  <Card.Body>
                                      <Card.Text style={{wordWrap: "normal"}}>
                                          귀여운 강아지 한마리가 앉아있습니다
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          </div>
                          <div className="card-container">
                              <Card>
                                  <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                                  <Card.Body>
                                      <Card.Text style={{wordWrap: "normal"}}>
                                          귀여운 강아지 한마리가 앉아있습니다
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          </div>
                          <div className="card-container">
                              <Card>
                                  <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                                  <Card.Body>
                                      <Card.Text style={{wordWrap: "normal"}}>
                                          귀여운 강아지 한마리가 앉아있습니다
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          </div>
                          <div>
                              <p>5/10</p>
                          </div>
                      </div>
                  </div>

                  <div className="content-container">
                      <div className="wrap-vertical">
                          <div className="card-container">
                              <Card>
                                  <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                                  <Card.Body>
                                      <Card.Title>Card Title</Card.Title>
                                      <Card.Text style={{wordWrap: "normal"}}>
                                      Some quick example text to build on the card title and make up the
                                          bulk of the card's content.
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          </div>
                          <div className="card-container">
                              <Card>
                                  <Card.Img className="card-image" variant="top" src="/assets/cola.jpg"/>
                                  <Card.Body>
                                      <Card.Title>Card Title</Card.Title>
                                      <Card.Text style={{wordWrap: "normal"}}>
                                          Some quick example text to build on the card title and make up the
                                          bulk of the card's content.
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

}

export default App;
