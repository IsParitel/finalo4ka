import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Container, Row, Col, Card} from "react-bootstrap";
import { Context } from "../index";
import lupa from "../assets/lupa.png";
import hat from "../assets/hat.png";
import V1 from "../assets/V1.png";
import V2 from "../assets/V2.png";
import V3 from "../assets/V3.png";
import V4 from "../assets/V4.png";
import { REGISTER_ROUTE, JOB_LIST_ROUTE } from "../utils/consts";

const MainPage = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

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
            {/* Верхняя часть с приветствием
            <Row className="text-center mb-4" style={{ position: "relative", top: "-210px" }}>
                <Col>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
                        Найди свою стажировку
                    </h1>
                    <p style={{ fontSize: "1.2rem", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
                        Найдите стажировку своей мечты или добавьте свой профиль прямо сейчас.
                    </p>
                </Col>
            </Row>
            */}

                <Row className="text-center mb-4" style={{position: "relative", top: "-210px"}}>
                    <Col>
                        <img
                            src={lupa}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                top: "300",
                                left: "70%",
                                transform: "translate(-50%, -27%)",
                                zIndex: "1",
                                opacity: "0.5", // Прозрачность (опционально)
                                width: "750px", // Ширина изображения (настройте по необходимости)
                                height: "auto"
                            }}
                        />

                        <img
                            src={hat}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                top: "300",
                                left: "70%",
                                transform: "translate(-70%, -25%)",
                                zIndex: "1",
                                opacity: "0.05", // Прозрачность (опционально)
                                width: "400px", // Ширина изображения (настройте по необходимости)
                                height: "auto"
                            }}
                        />

                        <img
                            src={V1}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                top: "300",
                                left: "70%",
                                transform: "translate(-90%, 120%) rotate(320deg)",
                                zIndex: "1",
                                opacity: "0.05", // Прозрачность (опционально)
                                width: "200px", // Ширина изображения (настройте по необходимости)
                                height: "auto"
                            }}
                        />

                        <img
                            src={V2}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                top: "300",
                                left: "70%",
                                transform: "translate(-230%, 60%)",
                                zIndex: "1",
                                opacity: "0.05", // Прозрачность (опционально)
                                width: "200px", // Ширина изображения (настройте по необходимости)
                                height: "auto"
                            }}
                        />


                        <img
                            src={V3}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                top: "300",
                                left: "70%",
                                transform: "translate(-200%, -90%)",
                                zIndex: "1",
                                opacity: "0.05", // Прозрачность (опционально)
                                width: "200px", // Ширина изображения (настройте по необходимости)
                                height: "auto"
                            }}
                        />


                        <img
                            src={V4}
                            alt="Overlay"
                            style={{
                                position: "absolute",
                                top: "300",
                                left: "70%",
                                transform: "translate(30%, -50%)",
                                zIndex: "1",
                                opacity: "0.05", // Прозрачность (опционально)
                                width: "200px", // Ширина изображения (настройте по необходимости)
                                height: "auto"
                            }}
                        />


                        <h1 style={{fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.7)"}}>
                            Найди свою стажировку
                        </h1>
                        <p style={{fontSize: "1.2rem", textShadow: "1px 1px 3px rgba(0,0,0,0.6)"}}>
                            Найдите стажировку своей мечты или добавьте свой профиль прямо сейчас.
                        </p>
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


            {/* Кнопка */}
            <Row>
                <Col>
                    <Button
                        size="lg"
                        style={{
                            transform: "translate(-0%, 150%)",
                            padding: "15px 30px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            borderRadius: "30px",
                            background: "rgba(255, 255, 255, 0.8)",
                            color: "black",
                            border: "2px solid white",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                                }}
                                onClick={() =>
                                    navigate(user.isAuth ? JOB_LIST_ROUTE : REGISTER_ROUTE)
                                }
                            >
                                {user.isAuth ? "Найти СВОю стажироVку" : "Регистрация"}
                            </Button>
                        </Col>
                    </Row>
        </Container>
);
};

export default MainPage;
