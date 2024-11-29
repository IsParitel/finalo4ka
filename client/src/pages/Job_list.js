import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import FilterBar from "../components/filterBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "../components/Job_listing";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {fetchOtrasls, fetchJob_pages} from "../http/job_pageAPI";

const JobList = observer(() => {
    const { job_page } = useContext(Context);


    useEffect(() => {
        fetchOtrasls().then(data => job_page.setOtrasls(data));
    }, []);

    useEffect(() => {
        fetchJob_pages().then((data) => {
            console.log('Fetched job pages:', data);
            job_page.setJob_pages(data.rows);
        });
    }, []);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <FilterBar />
                </Col>
                <Col md={9}>
                    <Row className="d-flex flex-column">
                        <JobListing />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default JobList;
