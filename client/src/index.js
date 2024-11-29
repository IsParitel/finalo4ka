import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import JobPageStore from "./store/JobPageStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const Context = createContext(null); // Контекст для UserStore и JobPageStore
export const ThemeContext = createContext(null); // Контекст для текущей темы

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('theme-light'); // Состояние для текущей темы (светлая по умолчанию)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'theme-light'; // Сохраненная тема или дефолтная
        setTheme(savedTheme); // Устанавливаем начальную тему
    }, [])

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}> {/* Применяем тему ко всему приложению */}
                {children}
            </div>
        </ThemeContext.Provider>
    );
};


root.render(
    <Context.Provider value={{
        user: new UserStore(),
        job_page: new JobPageStore(),
    }}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Context.Provider>
);