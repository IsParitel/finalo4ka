import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Card } from "react-bootstrap";
import FilterBar from "../components/filterBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "../components/Job_listing";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchOtrasls, fetchJob_pages } from "../http/job_pageAPI";
import { getUserDetails } from "../http/userAPI";
import JobPageItem from "../components/Job_pageItem";

const JobList = observer(() => {
    const { job_page } = useContext(Context);
    const [recommendedJobPages, setRecommendedJobPages] = useState([]);

    useEffect(() => {
        fetchOtrasls().then(data => job_page.setOtrasls(data));
    }, []);

    useEffect(() => {
        fetchJob_pages().then((data) => {
            console.log('Fetched job pages:', data);
            job_page.setJob_pages(data.rows);

            // Фильтрация рекомендаций
            try {
                const { otraslId, specialId } = getUserDetails();
                const filteredJobPages = data.rows.filter(job_page =>
                    job_page.otraslId === otraslId && job_page.specialId === specialId
                );

                // Выборка трех случайных вакансий
                const shuffled = filteredJobPages.sort(() => 0.5 - Math.random());
                setRecommendedJobPages(shuffled.slice(0, 3));
            } catch (error) {
                console.error('Ошибка получения рекомендаций:', error.message);
            }
        });
    }, []);

    return (
        <Container>
            <Row className="mt-2">
                {/* Левая колонка с фильтрами */}
                <Col md={3}>
                    <FilterBar />
                </Col>

                {/* Основной контент */}
                <Col md={6}>
                    <Row className="d-flex flex-column">
                        <JobListing />
                    </Row>
                </Col>

                {/* Правая колонка с рекомендациями */}
                <Col md={3}>
                    <Card
                        style={{
                            padding: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            borderRadius: '15px',
                            background: 'rgba(255,255,255,0.1)',
                            width: '100%',
                            transition: 'height 0.3s ease',
                        }}
                    >
                        <h5 style={{ textAlign: 'center', marginBottom: '15px' }}>Рекомендуемые вакансии</h5>
                        {recommendedJobPages.length > 0 ? (
                            recommendedJobPages.map(job_page => (
                                <JobPageItem key={job_page.id} job_page={job_page} />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>Нет рекомендаций</p>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default JobList;
