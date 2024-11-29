import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { createSpecial, fetchOtrasls } from "../../http/job_pageAPI";

const CreateSpecial = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const [selectedOtrasl, setSelectedOtrasl] = useState(null); // Состояние для выбранной отрасли
    const [otrasls, setOtrasls] = useState([]); // Состояние для списка отраслей

    // Загружаем список отраслей при монтировании компонента
    useEffect(() => {
        fetchOtrasls().then(data => {
            setOtrasls(data);
        });
    }, []);

    // Функция для обработки выбора отрасли
    const handleSelect = (eventKey) => {
        const selected = otrasls.find((otrasl) => otrasl.id === parseInt(eventKey));
        setSelectedOtrasl(selected); // Устанавливаем выбранную отрасль
    };

    const addSpecial = () => {
        if (selectedOtrasl && value) {
            const special = {
                name: value,
                otraslId: selectedOtrasl.id // передаем id выбранной отрасли
            };

            createSpecial(special).then(data => {
                setValue(''); // Очищаем поле ввода
                setSelectedOtrasl(null); // Сбрасываем выбранную отрасль
                onHide(); // Закрываем модальное окно
            });
        } else {
            alert('Пожалуйста, выберите отрасль и укажите название специальности.');
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить специальность</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Кнопка для выбора отрасли */}
                    <DropdownButton
                        id="dropdown-otrasli"
                        title={selectedOtrasl ? selectedOtrasl.name : "Выберите отрасль"} // Отображаем выбранную отрасль
                        onSelect={handleSelect}
                        className="mb-3"
                    >
                        {/* Рендерим список отраслей из базы данных */}
                        {otrasls.map((otrasl) => (
                            <Dropdown.Item key={otrasl.id} eventKey={otrasl.id}>
                                {otrasl.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>

                    {/* Поле ввода для названия специальности */}
                    <Form.Control
                        placeholder="Введите название специальности"
                        aria-label="Название специальности"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={addSpecial}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSpecial;
