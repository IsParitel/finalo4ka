import React from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import magnifier from "../assets/main.png";
import hat from "../assets/hat.png";

const MainPage = () => {



    return (
        <Container>
            <div
                style={{
                    display: "flex", // Используем Flexbox
                    justifyContent: "center", // Центрируем по горизонтали
                    alignItems: "center", // Центрируем по вертикали
                    height: "calc(100vh - 80px)", // Высота с учетом header
                    width: "100%", // Ширина по всему контейнеру
                    zIndex:0
            }}>
                    <div
                        style={{
                            display: "flex", // Используем Flexbox внутри div
                            justifyContent: "center", // Центрируем по горизонтали
                            alignItems: "center", // Центрируем по вертикали
                            backgroundImage: `url(${magnifier})`, // Устанавливаем картинку как фон
                            backgroundSize: "cover", // Картинка будет покрывать весь div
                            backgroundPosition: "center", // Центрируем картинку по div
                            backgroundRepeat: "no-repeat", // Картинка не будет повторяться
                            height: "100%", // Высота div в процентах или фиксированная
                            width: "100%", // Ширина div в процентах или фиксированная
                    }}
                    >
                    <h1
                        style={{
                            fontSize: "64px",
                            fontFamily: "Kumbh Sans",
                            fontWeight: "900",
                            transform: "translate(0, -40%)"
                        }}
                    >
                        Твоя стажировка — новый этап. <br />Открой горизонты с нами!
                    </h1>
                </div>
            </div>

            <div
                style={{
                    display: "flex", // Flexbox для создания колонок
                    justifyContent: "space-between", // Равномерное распределение между колонками
                    alignItems: "flex-start", // Выравнивание по верхнему краю
                    gap: "30px", // Промежуток между колонками
                    transform: "translate(0, -50%)"
                }}
            >
                <div className="cards_flex" style={{ flex: "1", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">Легкий способ <br></br> найти стажировку  <p className="name_dlc_cards_flex">Большое количество актуальных стажировок</p></h1>
                </div>
                <div className="cards_flex" style={{ flex: "1", textAlign: "center", transform: "translate(0, 150px)" }}>
                    <h1 className="name_main_cards_flex">Стажировка <br></br> по профессии <p className="name_dlc_cards_flex">Вы с легкостью сможете найти стажировку по своей профессии</p></h1>
                </div>
                <div className="cards_flex" style={{ flex: "1", textAlign: "center", transform: "translate(0, 150px)"}}>
                    <h1 className="name_main_cards_flex">Компании заинтересованы<br></br> в стажерах <p className="name_dlc_cards_flex">Организации в поисках потенциальных сотрудников</p></h1>
                </div>
            </div>







            















        </Container>
    );
};

export default MainPage;
