import React, {useState} from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import {createOtrasl} from "../../http/job_pageAPI";

const CreateOtrasl = ({ show, onHide }) => {
    const [value, setValue] = useState('')
    const addOtrasl = () => {
        createOtrasl({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered // Располагает модальное окно по центру экрана
            backdrop="static" // Не позволяет закрыть окно по клику на фон
            keyboard={false} // Отключает закрытие окна через клавишу Esc
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить отрасль</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название отрасли"
                        aria-label="Название отрасли"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={addOtrasl}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOtrasl;
