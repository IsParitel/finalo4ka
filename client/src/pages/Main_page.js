import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import magnifier from "../assets/main.png";

const MainPage = () => {
    // Состояния для email и ошибок
    const [schoolEmail, setSchoolEmail] = useState("");
    const [organizationEmail, setOrganizationEmail] = useState("");
    const [error, setError] = useState(null);

    // Обработчик отправки формы
    const handleSubmit = (e, type) => {
        e.preventDefault();
        const email = type === "school" ? schoolEmail : organizationEmail;
        if (!email) {
            setError("Введите email.");
            return;
        }
        setError(null);
        console.log(`Тип: ${type}, Email: ${email}`);
        // Дополнительная логика обработки
    };

    return (
        <Container >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 80px)",
                    width: "100%",
                    zIndex: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: `url(${magnifier})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "64px",
                            fontFamily: "Kumbh Sans",
                            fontWeight: "900",
                            transform: "translate(0, -40%)",
                        }}
                    >
                        Твоя стажировка — новый этап. <br />
                        Открой горизонты с нами!
                    </h1>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "30px",
                    transform: "translate(0, -50%)",
                }}
            >
                <div className="cards_flex" style={{ flex: "1", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">
                        Легкий способ <br />
                        найти стажировку{" "}
                        <p className="name_dlc_cards_flex">Большое количество актуальных стажировок</p>
                    </h1>
                </div>
                <div className="cards_flex" style={{ flex: "1", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">
                        Стажировка <br />
                        по профессии{" "}
                        <p className="name_dlc_cards_flex">Вы с легкостью сможете найти стажировку по своей профессии</p>
                    </h1>
                </div>
                <div className="cards_flex" style={{ flex: "1", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">
                        Компании заинтересованы<br />
                        в стажерах{" "}
                        <p className="name_dlc_cards_flex">Организации в поисках потенциальных сотрудников</p>
                    </h1>
                </div>
            </div>

            {/* Блок для учебного заведения */}
            <Card style={{ border: "none", marginBottom: "50px", padding: "20px 50px",margin: "50px"}}>
                <Row
                    className="w-100 m-0"
                    style={{
                        padding: "20px 0",
                        textAlign: "center",
                    }}
                >
                    <Col>
                        <h5 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "10px" }}>
                            Представляете учебное заведение?{" "}
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Свяжитесь с нами, чтобы добавить вашу стажировку или учебный курс.</Tooltip>}
                            >
                    <span
                        style={{
                            fontSize: "1.2rem",
                            marginLeft: "10px",
                            cursor: "pointer",
                        }}
                    >
                        &#9432; {/* Символ "i" в круге */}
                    </span>
                            </OverlayTrigger>
                        </h5>
                        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
                            Зарегистрируйте ваше учебное заведение, чтобы предложить стажировки студентам!
                        </p>
                        <Form onSubmit={(e) => handleSubmit(e, "school")} className="mt-3">
                            <Form.Group controlId="schoolEmail" style={{ marginBottom: "15px" }}>
                                <Form.Control
                                    type="email"
                                    placeholder="Введите email"
                                    value={schoolEmail}
                                    onChange={(e) => setSchoolEmail(e.target.value)}
                                    isInvalid={!!error}
                                    style={{ maxWidth: "400px", margin: "0 auto" }}
                                />
                                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="success">
                                Отправить заявку
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>

            {/* Блок для организации */}
            <Card style={{ border: "none", margin: "50px" }}>
                <Row
                    className="w-100 m-0"
                    style={{
                        padding: "20px 0",
                        textAlign: "center",
                    }}
                >
                    <Col>
                        <h5 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "10px" }}>
                            Представляете организацию?{" "}
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Добавьте стажировку для студентов или выпускников.</Tooltip>}
                            >
                    <span
                        style={{
                            fontSize: "1.2rem",
                            marginLeft: "10px",
                            cursor: "pointer",
                        }}
                    >
                        &#9432; {/* Символ "i" в круге */}
                    </span>
                            </OverlayTrigger>
                        </h5>
                        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
                            Мы предлагаем платформу для поиска стажеров. Загрузите детали стажировки и найдите подходящих кандидатов.
                        </p>
                        <Form onSubmit={(e) => handleSubmit(e, "organization")} className="mt-3">
                            <Form.Group controlId="organizationEmail" style={{ marginBottom: "15px" }}>
                                <Form.Control
                                    type="email"
                                    placeholder="Введите email"
                                    value={organizationEmail}
                                    onChange={(e) => setOrganizationEmail(e.target.value)}
                                    isInvalid={!!error}
                                    style={{ maxWidth: "400px", margin: "0 auto" }}
                                />
                                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="success">
                                Разместить стажировку
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
















        </Container>
    );
};

export default MainPage;
