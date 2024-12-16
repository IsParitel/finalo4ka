import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { fetchProfile, deleteJobReg, fetchJobCreates } from "../http/userAPI";
import { Context } from "../index";
import { fetchOneJob_page, deleteJobPage } from "../http/job_pageAPI";
import blankImage from "../assets/blank.png";
import { useNavigate } from "react-router-dom";
import { JOB_LIST_ROUTE } from "../utils/consts";

const ProfilePage = () => {
    const { user } = useContext(Context); // Получаем данные пользователя
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobPages, setJobPages] = useState([]);
    const [createdJobs, setCreatedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Загрузка профиля
                const profileData = await fetchProfile();
                setProfile(profileData);

                // Загрузка откликов пользователя
                const jobResponses = await Promise.all(
                    profileData.job_pages.map((job) => fetchOneJob_page(job.id))
                );
                setJobPages(jobResponses);

                // Получаем вакансии, созданные пользователем
                const createdJobsData = await fetchJobCreates(profileData.profile_page.id);

                // Для каждой созданной вакансии получаем детализированные данные
                const jobDetails = await Promise.all(
                    createdJobsData.map((job_create) => fetchOneJob_page(job_create.job_pageId))
                );

                // Убираем дубли перед обновлением состояния
                const uniqueJobs = Array.from(
                    new Map(jobDetails.map((job) => [job.id, job])).values()
                );

                setCreatedJobs(uniqueJobs);
            } catch (err) {
                console.error("Ошибка при загрузке профиля:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRevokeJob = async (job_pageId) => {
        try {
            // Запрос для отзыва вакансии (удаляет только связь job_reg)
            await deleteJobReg(job_pageId, profile.profile_page.id);

            // Обновляем список вакансий
            setJobPages((prevJobPages) =>
                prevJobPages.filter((job) => job.id !== job_pageId)
            );

            alert("Вакансия успешно отозвана!");
        } catch (error) {
            console.error("Ошибка при отзыве вакансии:", error);
            alert("Не удалось отозвать вакансию.");
        }
    };

    const handleDeleteJob = async (job_pageId) => {
        try {
            // Запрос для удаления вакансии (включая все связи и саму вакансию)
            await deleteJobPage(job_pageId);

            // Обновляем список вакансий
            setCreatedJobs((prevCreatedJobs) =>
                prevCreatedJobs.filter((job) => job.id !== job_pageId)
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
                Профиль не найден
            </div>
        );
    }

    const { familia, imya, gorod } = profile.user;

    return (
        <Container>
            {/* Верхняя часть профиля */}
            <Row>
                <Col style={{
                    marginTop:"120px",
                    }}>
                        <Card
                            style={{
                                width:"267px",
                                height:"341px",
                                border:"none",
                                borderRadius: "15px",
                                boxShadow: "0 15px 15px #66666615",
                            }}
                        >
                            <Image
                                src={profile.user.avatar ? `${process.env.REACT_APP_API_URL}/${profile.user.avatar}` : blankImage}
                                style={{
                                    width: "221px",
                                    height: "221px",
                                    margin:"23px",
                                    borderRadius:"15px",
                                    objectFit: "cover",
                                    marginBottom: "15px",
                                }}
                                alt="Аватар пользователя"
                            />
                            <p 
                               style={{
                                   margin:"0 23px",
                                   fontFamily:"Kumbh Sans",
                                   fontSize:"20px",
                                   fontWeight:"700",
                               }}>
                                {`${imya} ${familia}`}
                            </p>
                            <p
                                style={{
                                   margin:"0 23px",
                                   fontFamily:"Kumbh Sans",
                                   fontSize:"12px",
                                   fontWeight:"600",
                                   color:"#666",
                               }}>
                                 {`${gorod}`}</p>
                        </Card>
                </Col>

                <Col 
                    style={{
                        marginTop:"120px"}}
                >
                    <Card
                        style={{
                            width:"997px",
                            paddingLeft:"40px",
                            paddingTop:"30px",
                            paddingBottom:"54px",
                            borderRadius: "26px",
                            border:"none",
                            boxShadow: "0 15px 15px #66666615",
                        }}
                    >
                            <p 
                               style={{
                                   fontFamily:"Kumbh Sans",
                                   fontSize:"20px",
                                   fontWeight:"700",
                               }}>
                                Проверка
                            </p>
                        {/* Список вакансий, на которые откликнулся пользователь */}
            
                        {(user.role === "ADMIN" || user.role === "USER") && (
                            <Row>
                                <Col>
                                    <h4 style={{
                                        fontFamily:"Kumbh Sans",
                                        fontSize:"20px",
                                        fontWeight:"700",
                                    }}>
                                        Ваши отклики
                                    </h4>
                                    {jobPages.length > 0 ? (
                                        jobPages.map((job, index) => (
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
                                                        onClick={() => handleRevokeJob(job.id)}
                                                    >
                                                        Отозвать заявление
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    ) : (
                                        <p style={{
                                            fontFamily:"Kumbh Sans",
                                            fontSize:"20px",
                                            fontWeight:"700",
                                        }}>
                                            У вас пока нет откликов
                                        </p>
                                    )}
                                </Col>
                            </Row>
                        )}

                        {/* Созданные вакансии */}
                        {(user.role === "ADMIN" || user.role === "RABOTA") && (
                            <Row className="mt-4">
                                <Col>
                                    {createdJobs.length > 0 ? (
                                        <div>
                                            <h4>Созданные вакансии:</h4>
                                            {createdJobs.map((job, index) => (
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
                                                        {(user.role === "ADMIN" || user.role === "USER") && (
                                                            <Button variant="danger" onClick={() => handleDeleteJob(job.id)}>
                                                                Удалить вакансию
                                                            </Button>
                                                        )}
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Вы еще не создали вакансии.</p>
                                    )}
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col>
                                <Button
                                    size="lg"
                                    style={{
                                        padding: "15px 30px",
                                        fontSize: "15px",
                                        fontWeight: "700",
                                        borderRadius: "6px",
                                        background: "#6DFF6A",
                                        backgroundSize: "cover",
                                        color: "#303030",
                                        border:"none",
                                        boxShadow: "0px 9px 15px #66666615",
                                    }}
                                    onClick={() => navigate(JOB_LIST_ROUTE)} // Исправленный navigate
                                >
                                    Найти свою стажировку!
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;