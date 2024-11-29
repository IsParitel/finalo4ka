import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { fetchProfile, deleteJobReg } from "../http/userAPI";
import { Context } from "../index";
import { fetchOneJob_page } from "../http/job_pageAPI";
import blankImage from '../assets/blank.png';

const ProfilePage = () => {
    const { user } = useContext(Context);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobPages, setJobPages] = useState([]);

    useEffect(() => {
        fetchProfile()
            .then((data) => {
                setProfile(data);
                return data.job_pages;
            })
            .then((jobPagesIds) =>
                Promise.all(jobPagesIds.map((job) => fetchOneJob_page(job.id)))
            )
            .then((jobData) => setJobPages(jobData))
            .catch((err) => console.error("Ошибка при загрузке профиля:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleDeleteJob = async (job_pageId) => {
        try {
            await deleteJobReg(job_pageId, profile.profile_page.id);
            setJobPages((prevJobPages) =>
                prevJobPages.filter((job) => job.id !== job_pageId)
            );
            alert("Вакансия успешно удалена!");
        } catch (error) {
            console.error("Ошибка при удалении вакансии:", error);
            alert("Не удалось удалить вакансию.");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                Загрузка...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                Профиль не найден.
            </div>
        );
    }

    const { familia, imya} = profile.user;

    return (
        <Container className="mt-5">
            {/* Верхняя часть профиля */}
            <Row className="justify-content-center mb-4">
                <Col md={4}>
                    <Card
                        style={{
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Image
                                src={blankImage}
                                roundedCircle
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    border: "4px solid #6c757d",
                                    objectFit: "cover",
                                    marginBottom: "15px",
                                }}
                            />
                            <Card.Title style={{ fontSize: "20px", fontWeight: "bold" }}>
                                {imya} {familia}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card
                        style={{
                            height: "100%",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Card.Body>
                            <Card.Text style={{ color: "#6c757d" }}>
                                Добро пожаловать, {imya}. Здесь вы можете управлять своими вакансиями и следить за их статусом.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Список вакансий */}
            <Row className="mt-4">
                <Col>
                    {jobPages.length > 0 ? (
                        <div>
                            <h4>Ваши вакансии:</h4>
                            {jobPages.map((job, index) => (
                                <Card key={index} className="mb-3 shadow-sm">
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Card.Title>{job.name}</Card.Title>
                                            <Card.Text>{job.description}</Card.Text>
                                            <Image
                                                src={process.env.REACT_APP_API_URL + job.img}
                                                alt={job.name}
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteJob(job.id)}
                                        >
                                            Отозвать заявление
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p>У вас пока нет вакансий.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
