import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import JobPageItem from "./Job_pageItem";

const JobListing = observer(() => {
  const { job_page } = useContext(Context);

  const selectedSpecials = job_page.selectedSpecials || [];
  const allJobs = job_page.job_pages || [];

  // Если выбраны специализации — фильтруем
    const filteredJobs = job_page.filteredJobPages;

  return (
    <div>
      {filteredJobs.map(job => (
        <JobPageItem key={job.id} job_page={job} />
      ))}
    </div>
  );
});

export default JobListing;
