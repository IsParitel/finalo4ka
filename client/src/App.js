import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { ThemeContext } from './index';

const App = observer(() => {
    const { user } = useContext(Context);
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            check()
                .then(data => {
                    user.setUser(data);
                    user.setIsAuth(true);
                })
                .catch(error => {
                    console.error("Authorization failed:", error);
                    user.setUser(null);
                    user.setIsAuth(false);
                })
                .finally(() => setLoading(false));
        }, 1000);
    }, [user]);

    if (loading) {
        return <Spinner animation={"grow"} />;
    }

    return (
        <BrowserRouter>
            <div className={theme}> {/* Применяем текущую тему ко всем компонентам */}
                <NavBar />
                <AppRouter />
            </div>
        </BrowserRouter>
    );
});

export default App;
