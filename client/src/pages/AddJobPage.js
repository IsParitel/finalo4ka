import React, { useState, useEffect } from 'react';
import {Button, Card, Dropdown, Form} from "react-bootstrap";
import { createJob_page, fetchOtrasls, fetchSpecials } from "../http/job_pageAPI";
import { useNavigate } from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../utils/consts"; // Используем useNavigate для перенаправления

const CreateJobPage = () => {
    const navigate = useNavigate(); // Хук для перенаправления на другую страницу
    const [name, setName] = useState(''); // Название вакансии
    const [file, setFile] = useState(null); // Файл для загрузки
    const [description, setDescription] = useState(''); // Описание вакансии
    const [selectedOtraslId, setSelectedOtraslId] = useState(null); // ID выбранной отрасли
    const [selectedSpecialId, setSelectedSpecialId] = useState(null); // ID выбранной специальности
    const [otrasls, setOtrasls] = useState([]); // Список отраслей
    const [specialties, setSpecialties] = useState([]); // Список специальностей

    // Загружаем отрасли при монтировании компонента
    useEffect(() => {
        fetchOtrasls().then(data => setOtrasls(data)); // Загружаем отрасли
    }, []);

    // Загружаем специальности, когда выбранная отрасль меняется
    useEffect(() => {
        if (selectedOtraslId) {
            fetchSpecials(selectedOtraslId).then(data => setSpecialties(data)); // Загружаем специальности по отрасли
        }
    }, [selectedOtraslId]);

    // Функция для выбора файла
    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };
    // Функция для добавления вакансии
    const addJobPage = () => {
        if (name && selectedOtraslId && selectedSpecialId && description) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('img', file); // Отправляем файл
            formData.append('otraslId', selectedOtraslId);
            formData.append('specialId', selectedSpecialId);
            formData.append('description', description); // Описание вакансии

            createJob_page(formData).then((data) => {
                alert("Вакансия добавлена!");
                // Перенаправляем на страницу созданной вакансии
                navigate(MAIN_PAGE_ROUTE); // Предположим, что в ответе есть id вакансии
            }).catch((error) => {
                console.error("Ошибка при добавлении вакансии:", error);
                alert("Произошла ошибка при добавлении вакансии.");
            });
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    return (

        <Card
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height: '80%'
            }}>
        <div style={{ padding: '20px' }}>
            <h3>Добавить вакансию</h3>
            <Form>
                {/* Выбор отрасли */}
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{selectedOtraslId ? `Отрасль: ${otrasls.find(o => o.id === selectedOtraslId)?.name}` : "Выберите отрасль"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {otrasls.map(otrasl => (
                            <Dropdown.Item
                                key={otrasl.id}
                                onClick={() => setSelectedOtraslId(otrasl.id)}
                            >
                                {otrasl.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {/* Выбор специальности */}
                {selectedOtraslId && (
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedSpecialId ? `Специальность: ${specialties.find(s => s.id === selectedSpecialId)?.name}` : "Выберите специальность"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {specialties.map(special => (
                                <Dropdown.Item
                                    key={special.id}
                                    onClick={() => setSelectedSpecialId(special.id)}
                                >
                                    {special.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                )}

                {/* Поле для ввода названия стажировки */}
                <Form.Control
                    className="mt-3"
                    placeholder="Введите название стажировки"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Поле для загрузки файла */}
                <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                />

                {/* Поле для описания */}
                <Form.Group controlId="formDescription" className="mt-4">
                    <Form.Label>Описание вакансии</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={17}
                        placeholder="Введите подробное описание вакансии"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <Button variant="primary" onClick={addJobPage} className="mt-3">
                Добавить
            </Button>
        </div>
        </Card>
    );
};

export default CreateJobPage;
