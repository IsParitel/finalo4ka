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
        <Container>
            <Row>
                <Col style={{
                    marginTop: "120px"
                    }}>
                        <Card
                            style={{
                                display: 'flex',          
                                flexDirection: 'column',  
                                justifyContent: 'space-between',
                                width: "268px",
                                height: "473px",
                                border: "none",
                                borderRadius: "26px",
                                boxShadow: "0 15px 15px #66666615",
                                margin: "0 auto",
                                padding: "24px"
                            }}
                        >
                            <Image
                                src={job_page.img ? process.env.REACT_APP_API_URL + job_page.img : '/path/to/placeholder.jpg'}
                                alt={job_page.name}
                                style={{
                                    width: "221px",
                                    height: "221px",
                                    borderRadius: "15px",
                                    objectFit: "cover",
                                    marginBottom: "15px",
                                }}
                            />
                            <p style={{
                                
                                fontWeight:"600",
                                fontSize: "20px",
                                fontWeight: "700", 
                            }}>
                                {job_page.name}
                            </p>
                            <p style={{
                                
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#666",
                            }}>
                                {job_page.city || 'Город не указан'}
                            </p>
                            <Button
                                variant="primary"
                                onClick={handleApply}
                                disabled={applying}
                                style={{
                                    displey:'flex',
                                    backgroundColor: '#6DFF6A',
                                    borderColor: '#6DFF6A',
                                    color: '#303030',
                                    
                                    fontWeight: '900',
                                    fontSize: '10px',
                                    borderRadius: '6px',
                                    boxShadow: '0px 9px 15px #66666615',
                                    width:"185px",
                                    height: "32px"
                                }}
                            >
                                {applying ? 'Ожидание...' : 'Откликнуться'}
                            </Button>
                        </Card>
                        </Col>

                        {/* Правая колонка — описание + кнопка */}
                        <Col
                            style={{
                                marginTop:"120px"}}
                        >
                            <Card
                                style={{
                                    border: 'none',
                                    borderRadius: "26px",
                                    boxShadow: "0 15px 15px #66666615",
                                    width:"997px",
                                    paddingLeft:"40px",
                                    paddingTop:"30px",
                                    paddingBottom:"54px",
                                    borderRadius: "26px", // чтобы выровнять с левой частью
                                }}
                            >
                                <h4 style={{
                                    
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    marginBottom: "20px"
                                }}>
                                    Описание вакансии:
                                </h4>
                                <p style={{
                                    
                                    fontSize: "16px",
                                    color: "#303030"
                                }}>
                                    {job_page.description}
                                </p>
                            </Card>
                        </Col>
                    </Row>
        </Container>
    );
};

export default JobPage;
