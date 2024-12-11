import React, { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, PROFILE_ROUTE, ADD_JOB_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { ThemeContext } from "../index";
import LightLogo from '../assets/SkillHorizon.png'; // Светлая тема (на тёмном фоне)
import DarkLogo from '../assets/SkillHorizon_black.png'; // Тёмная тема (на светлом фоне)
import DarkAccount from '../assets/account_black.svg'; // Тёмная тема (на светлом фоне)
import Exit from '../assets/exit.svg';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setRole("");
        localStorage.removeItem("token");
        navigate(MAIN_PAGE_ROUTE);
    };

    const isMainPage = location.pathname === MAIN_PAGE_ROUTE;

    const canAddJob = ["ADMIN", "RABOTA"].includes(user.role);
    const isAdmin = user.role === "ADMIN";

    return (
        <div className={theme === "theme-light" ? "theme-light" : "theme-dark"}>
            <Navbar
                expand="lg"
                className={`navbar ${theme === "theme-light" ? "navbar-light" : "navbar-dark"}`}
                style={{
                    position: "fixed",
                    width: "100%",
                    zIndex:100,
                }}
            >
                <Container fluid>
                    <NavLink to={MAIN_PAGE_ROUTE}>
                        <img
                            className="logo"
                            src={theme === 'theme-light' ? LightLogo : DarkLogo} // Переключение логотипа
                            alt="logo"
                            style={{
                                marginLeft: "25px",
                            }}
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" style={{ gap: "15px" }}>
                            {isAdmin && (
                                <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>
                                    Админ панель
                                </Button>
                            )}
                            {canAddJob && (
                                <Button variant="outline-light" onClick={() => navigate(ADD_JOB_ROUTE)}>
                                    Добавить вакансию
                                </Button>
                            )}
                            {/* Кнопка для смены темы */}
                            <Button
                                variant="outline-light"
                                onClick={toggleTheme}
                            >
                                {theme === "theme-light" ? "Тёмная тема" : "Светлая тема"}
                            </Button>
                            {!user.isAuth && (
                                <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                                    Авторизация
                                </Button>
                            )}
                            {user.isAuth && (
                                <>
                                    <div variant="outline-light" onClick={() => navigate(PROFILE_ROUTE)} className="account">
                                        <img
                                            src={DarkAccount}
                                            alt="Account"
                                        />
                                    </div>
                                    <div variant="outline-light" onClick={logOut} className="account">
                                        <img
                                            src={Exit}
                                            alt="Exit"
                                        />
                                    </div>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;
