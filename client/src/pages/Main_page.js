import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Context } from "../index";
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
            {/* Верхняя часть с приветствием */}
            <Row className="text-center mb-4">
                <Col>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
                        Добро пожаловать на платформу стажировок для студентов!
                    </h1>
                    <p style={{ fontSize: "1.2rem", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
                        Найдите стажировку своей мечты или добавьте свой профиль прямо сейчас.
                    </p>
                </Col>
            </Row>

            {/* Кнопка */}
            <Row>
                <Col>
                    <Button
                        size="lg"
                        style={{
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
                        {user.isAuth ? "Просмотр вакансий" : "Регистрация"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;
