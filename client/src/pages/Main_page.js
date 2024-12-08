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
        <Container>
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
                    flexDirection: "row", // Горизонтальная компоновка по умолчанию
                    flexWrap: "wrap",     // Разрешить перенос элементов на новую строку
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "30px",
                }}
            >
                <div className="cards_flex" style={{ flex: "1 1 100%", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">
                        Легкий способ <br />
                        найти стажировку{" "}
                        <p className="name_dlc_cards_flex">Большое количество актуальных стажировок</p>
                    </h1>
                </div>
                <div className="cards_flex" style={{ flex: "1 1 100%", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">
                        Стажировка <br />
                        по профессии{" "}
                        <p className="name_dlc_cards_flex">Вы с легкостью сможете найти стажировку по своей профессии</p>
                    </h1>
                </div>
                <div className="cards_flex" style={{ flex: "1 1 100%", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">
                        Компании заинтересованы<br />
                        в стажерах{" "}
                        <p className="name_dlc_cards_flex">Организации в поисках потенциальных сотрудников</p>
                    </h1>
                </div>
            </div>


            {/* Блок для учебного заведения */}
            <Card style={{ 
                border: "none", 
                padding: "50px 100px", 
                margin: "150px 0", 
                boxShadow:"0px 14px 14px #66666620", 
                borderRadius:"30px"
                }}>
                <Row
                    style={{
                        padding: "20px 0",
                        textAlign: "left", // Выравнивание текста по левому краю
                    }}
                >
                    <Col>
                        <h1 style={{ 
                            fontSize: "32px", 
                            fontWeight: "900", 
                            }}>
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
                        </h1>
                        <p style={{
                            fontWeight: "600",
                            fontSize: "14px", 
                            margin: "36px 0" 
                            }}>
                            Зарегистрируйте ваше учебное заведение, чтобы предложить стажировки студентам!
                        </p>
                        <Form onSubmit={(e) => handleSubmit(e, "school")} className="mt-3">
                            <Form.Group controlId="schoolEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Введите email"
                                    value={schoolEmail}
                                    onChange={(e) => setSchoolEmail(e.target.value)}
                                    isInvalid={!!error}
                                    style={{ maxWidth: "400px", margin: "38px 0" }}
                                />
                                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="success" style={{
                                fontFamily:"Kumbh Sans",
                                fontWeight:"800",
                                borderRadius:"4px",
                                border: "1px",
                                background:"#60de5e",
                                color:"#303030",
                                width: "268px",
                                height:"48px",
                                boxShadow:"0px 14px 14px #66666620",
                                }}>
                                Отправить заявку
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
                        
             {/* Блок для учебного заведения */}
             <Card style={{ 
                border: "none", 
                padding: "50px 100px", 
                margin: "150px 0", 
                boxShadow:"0px 14px 14px #66666620", 
                borderRadius:"30px"
                }}>
                <Row
                    style={{
                        padding: "20px 0",
                        textAlign: "left", // Выравнивание текста по левому краю
                    }}
                >
                    <Col>
                        <h1 style={{ 
                            fontSize: "32px", 
                            fontWeight: "900", 
                            }}>
                            Представляете организацию?{" "}
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
                        </h1>
                        <p style={{
                            fontWeight: "600",
                            fontSize: "14px", 
                            margin: "36px 0" 
                            }}>
                            Мы предлагаем платформу для поиска стажеров. Загрузите детали стажировки и найдите подходящих кандидатов.
                        </p>
                        <Form onSubmit={(e) => handleSubmit(e, "school")} className="mt-3">
                            <Form.Group controlId="schoolEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Введите email"
                                    value={schoolEmail}
                                    onChange={(e) => setSchoolEmail(e.target.value)}
                                    isInvalid={!!error}
                                    style={{ maxWidth: "400px", margin: "38px 0" }}
                                />
                                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="success" style={{
                                fontFamily:"Kumbh Sans",
                                fontWeight:"800",
                                borderRadius:"4px",
                                border: "1px",
                                background:"#60de5e",
                                color:"#303030",
                                width: "268px",
                                height:"48px",
                                boxShadow:"0px 14px 14px #66666620",
                                }}>
                                Отправить заявку
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default MainPage;
