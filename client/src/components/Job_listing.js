import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import JobPageItem from "./Job_pageItem";

const JobListing = observer(() => {
    const { job_page } = useContext(Context);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px',
                paddingBottom: '30px',
            }}
        >
            {/* Список вакансий */}
            {job_page.filteredJobPages.map(job_page => (
                <JobPageItem key={job_page.id} job_page={job_page} />
            ))}
        </div>
    );
});

export default JobListing;
