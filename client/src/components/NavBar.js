import React, { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, PROFILE_ROUTE, ADD_JOB_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { ThemeContext } from "../index";

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
        <Navbar expand="lg" className="bg-dark navbar-dark">
            <Container fluid>
                <NavLink
                    style={{ color: "white", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}
                    to={MAIN_PAGE_ROUTE}
                >
                    211P01
                </NavLink>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center" style={{ gap: "10px" }}>
                        {user.isAuth ? (
                            <>
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
                                <Button variant="outline-light" onClick={() => navigate(PROFILE_ROUTE)}>
                                    Профиль
                                </Button>
                                <Button variant="outline-light" onClick={logOut}>
                                    Выйти
                                </Button>
                                {/* Кнопка для смены темы */}
                                <Button
                                    variant="outline-light"
                                    onClick={toggleTheme}
                                    style={{ marginLeft: "10px" }}
                                >
                                    {theme === "theme-light" ? "Тёмная тема" : "Светлая тема"}
                                </Button>
                            </>
                        ) : (
                            !isMainPage && (
                                <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                                    Авторизация
                                </Button>
                            )
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
