import React, { useContext, useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE, REGISTER_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imya, setImya] = useState('');
    const [familia, setFamilia] = useState('');
    const [otchestvo, setOtchestvo] = useState('');
    const [gorod, setGorod] = useState('');
    const [sharaga, setSharaga] = useState('');
    const [kurs, setKurs] = useState('');
    const [birth, setBirth] = useState('');
    const [telefon, setTelefon] = useState('');

    const handlePhoneFocus = () => {
        if (!telefon.startsWith('+')) {
            setTelefon('+');
        }
    };

    const handlePhoneChange = (value) => {
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setTelefon(prev => (prev.startsWith('+') ? `+${sanitizedValue}` : sanitizedValue));
    };

    const click = async () => {
        try {
            let data;
            const cleanedPhone = telefon.replace(/\s/g, '');

            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(
                    email,
                    password,
                    imya,
                    familia,
                    otchestvo,
                    gorod,
                    sharaga,
                    kurs,
                    birth,
                    cleanedPhone
                );
            }
            console.log(data);
            user.setUser(user);
            user.setIsAuth(true);
            navigate(MAIN_PAGE_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <Card style={{ width: 700 }} className="p-4">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin && (
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите фамилию"
                                    className="mb-3"
                                    value={familia}
                                    onChange={e => setFamilia(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите имя"
                                    className="mb-3"
                                    value={imya}
                                    onChange={e => setImya(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите отчество"
                                    className="mb-3"
                                    value={otchestvo}
                                    onChange={e => setOtchestvo(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите город"
                                    className="mb-3"
                                    value={gorod}
                                    onChange={e => setGorod(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите университет"
                                    className="mb-3"
                                    value={sharaga}
                                    onChange={e => setSharaga(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите курс"
                                    className="mb-3"
                                    value={kurs}
                                    onChange={e => setKurs(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите дату рождения"
                                    type="date"
                                    className="mb-3"
                                    value={birth}
                                    onChange={e => setBirth(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Введите телефон"
                                    type="tel"
                                    className="mb-3"
                                    value={telefon}
                                    onFocus={handlePhoneFocus}
                                    onChange={e => handlePhoneChange(e.target.value)}
                                    maxLength="12"
                                    required
                                />
                            </Col>
                        </Row>
                    )}

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Row className="d-flex justify-content-between mt-3 px-3">
                        {isLogin ? (
                            <div>
                                Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрироваться</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                            </div>
                        )}
                    </Row>

                    <Button
                        variant="outline-success"
                        className="mt-3 align-self-end"
                        onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
