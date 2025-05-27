import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
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
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    fetchOtrasls().then(data => job_page.setOtrasls(data));
  }, []);

  useEffect(() => {
    fetchJob_pages().then((data) => {
      console.log('Fetched job pages:', data);
      job_page.setJob_pages(data.rows);
      setJobCount(data.count || data.rows.length); // Установка количества вакансий

      try {
        const { otraslId, specialId } = getUserDetails();
        const filteredJobPages = data.rows.filter(job_page =>
          job_page.otraslId === otraslId && job_page.specialId === specialId
        );

        const shuffled = filteredJobPages.sort(() => 0.5 - Math.random());
        setRecommendedJobPages(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Ошибка получения рекомендаций:', error.message);
      }
    });
  }, []);

  return (
    <Container style={{ paddingTop: '120px' }}>
      <Row style={{ gap: '30px' }}>
        {/* Основной контент */}
        <Col
          style={{
            maxWidth: '760px',
            boxShadow: '0 15px 15px #66666615',
            borderRadius: '26px',
            padding: '45px',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)',
          }}
        >
          <h5 style={{ marginBottom: '10px', fontWeight: '900' }}>Стажировки</h5>
          <p style={{ marginBottom: '25px', fontWeight: '500' }}>
            Количество стажировок: {jobCount}
          </p>
          <JobListing />
        </Col>

        {/* Фильтр справа */}
        <Col
          style={{
            minWidth: '280px',
            maxWidth: '320px',
          }}
        >
          <FilterBar />
        </Col>
      </Row>

      {/* Отступ между блоками */}
      <div style={{ height: '20px' }} />

      <Row>
        {/* Рекомендации */}
        <Col
          style={{
            maxWidth: '760px',
            boxShadow: '0 15px 15px #66666615',
            borderRadius: '26px',
            padding: '45px',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)',
          }}
        >
          <h5 style={{ marginBottom: '25px', fontWeight: '900' }}>
            Рекомендуемые вакансии
          </h5>
          {recommendedJobPages.length > 0 ? (
            recommendedJobPages.map((job_page) => (
              <JobPageItem key={job_page.id} job_page={job_page} />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>Нет рекомендаций</p>
          )}
        </Col>
      </Row>
    </Container>
  );
});

export default JobList;
