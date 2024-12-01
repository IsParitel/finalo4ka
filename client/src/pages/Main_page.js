import React from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import lupa from "../assets/main.png";
import hat from "../assets/hat.png";

const MainPage = () => {

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                height: "100vh",
                backgroundImage: "url('https://source.unsplash.com/1600x900/?students,office')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
            }}
        >

                <Row className="text-center mb-4" style={{position: "relative", top: "-210px"}}>
                    <Col>
                        <h1 style={{fontSize: "64px", fontWeight: "bold", color: "#000"}}>
                            Найди свою стажировку
                        </h1>
                        <img
                            src={lupa}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                transform: "translate(-40%, -43%)",
                                zIndex: 0,
                                width: "750px", // Ширина изображения (настройте по необходимости)
                            }}
                        />
                    </Col>
                </Row>

            <Row>

                <Card
                    style={{
                        transform: "translate(-470%, 410%)",
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '15%',
                        height: '20%',
                        background: 'rgba(255,255,255,0.68)',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(255,255,255,0.68)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <div
                        style={{
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.65)',
                            textAlign: 'center',
                        }}
                    >
                        Здесь будет дополнительная информация о вакансии.
                    </div>
                </Card>


                <Card
                    style={{
                        transform: "translate(-280%, 410%)",
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '15%',
                        height: '20%',
                        background: 'rgba(255,255,255,0.68)',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0,37,174,0.68)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <div
                        style={{
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.65)',
                            textAlign: 'center',
                        }}
                    >
                        Здесь будет дополнительная информация о вакансии.
                    </div>
                </Card>



                <Card
                    style={{
                        transform: "translate(-90%, 410%)",
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '15%',
                        height: '20%',
                        background: 'rgba(255,255,255,0.68)',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(255,0,0,0.68)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        transition: 'all 0.1s ease',
                    }}
                >
                    <div
                        style={{
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.65)',
                            textAlign: 'center',
                        }}
                    >
                        Здесь будет дополнительная информация о вакансии.
                    </div>
                </Card>

            </Row>
        </Container>
);
};

export default MainPage;
