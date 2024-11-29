import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneJob_page } from "../http/job_pageAPI";
import { fetchJobReg } from "../http/userAPI";

const JobPage = () => {
    const [job_page, setJob_page] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        fetchOneJob_page(id)
            .then(data => setJob_page(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Загрузка...</span>
                </div>
            </div>
        );
    }

    const handleApply = async () => {
        try {
            setApplying(true);
            // Откликаемся на вакансию
            await fetchJobReg(job_page.id);
            alert('Вы успешно откликнулись на вакансию!');
            navigate('/profile');
        } catch (error) {
            alert('Произошла ошибка при отклике на вакансию');
        } finally {
            setApplying(false);
        }
    };

    return (
        <Container className="mt-5"> {/* Убрали класс theme-dark */}
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg rounded" style={{ border: 'none' }}>
                        <Row>
                            <Col md={4} className="d-flex justify-content-center align-items-center">
                                <Image
                                    width={300}
                                    height={300}
                                    src={job_page.img ? process.env.REACT_APP_API_URL + job_page.img : '/path/to/placeholder.jpg'}
                                    alt={job_page.name}
                                    className="rounded-circle border"
                                />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <h2 className="font-weight-bold text-center mb-3" style={{ fontSize: '2rem' }}>
                                        {job_page.name}
                                    </h2>
                                    <Button
                                        variant="primary"
                                        className="w-100 py-2"
                                        onClick={handleApply}
                                        disabled={applying}
                                        style={{
                                            backgroundColor: '#007bff',
                                            borderColor: '#007bff',
                                            borderRadius: '25px',
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        {applying ? 'Ожидание...' : 'Откликнуться'}
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="font-weight-bold mb-3">Описание вакансии:</h4>
                            <Row>
                                <Col>
                                    <p>{job_page.description}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default JobPage;
