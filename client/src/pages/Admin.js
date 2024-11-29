import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateOtrasl from "../components/modals/CreateOtrasl";
import CreateSpecial from "../components/modals/CreateSpecial";

const Admin = () => {
    const [otraslVisible, setOtraslVisible] = useState(false)
    const [specialVisible, setSpecialVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-success"} className="mt-2" onClick={() => setOtraslVisible(true)}>Добавить отрасль</Button>
            <Button variant={"outline-success"} className="mt-2" onClick={() => setSpecialVisible(true)}>Добавить специальность</Button>
            <Button variant={"outline-warning"} className="mt-2" onClick={() => alert("Alpha 0.0.1.4! TESTING!")}>Удалить Вакансию (Not available during Alpha testing)</Button>
            <CreateOtrasl show={otraslVisible} onHide={() => setOtraslVisible(false)}/>
            <CreateSpecial show={specialVisible} onHide={() => setSpecialVisible(false)}/>
        </Container>
    );
};

export default Admin;