import React, { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, PROFILE_ROUTE, ADD_JOB_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { ThemeContext } from "../index";
import LightLogo from '../assets/SkillHorizon.png'; // Светлая тема (на тёмном фоне)
import DarkLogo from '../assets/SkillHorizon_black.png'; // Тёмная тема (на светлом фоне)

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
                                margin: "25px",
                                width: "150px", // Пример размеров
                                height: "auto"
                            }}
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center" style={{ gap: "10px" }}>
                            {!user.isAuth && (
                                <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                                    Авторизация
                                </Button>
                            )}
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
                            {user.isAuth && (
                                <>
                                    <Button variant="outline-light" onClick={() => navigate(PROFILE_ROUTE)}>
                                        Профиль
                                    </Button>
                                    <Button variant="outline-light" onClick={logOut}>
                                        Выйти
                                    </Button>
                                </>
                            )}
                            {/* Кнопка для смены темы */}
                            <Button
                                variant="outline-light"
                                onClick={toggleTheme}
                                style={{ marginLeft: "10px", transform: "translate(-7%, 0%)" }}
                            >
                                {theme === "theme-light" ? "Тёмная тема" : "Светлая тема"}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;
